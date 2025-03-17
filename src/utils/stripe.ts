import { stripe } from '@/lib/stripe/client';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
type StripeSubscription = Stripe.Subscription;
export async function fulfillCheckout(
	subscription: StripeSubscription,
	sessionId: string
) {
	console.log('🚀 ~ fulfillCheckout ~ sessionId:', sessionId);

	try {
		const existingSubscription = await prisma.subscription.findUnique({
			where: {
				stripeCheckoutSessionId: sessionId,
			},
		});

		if (existingSubscription) {
			console.log(`Checkout Session ${sessionId} has already been fulfilled. Skipping.`);
			return;
		}

		console.log('🚀 ~ !!!!! ~ subscription:', subscription);

		// Retrieve the Checkout Session from the API with line_items expanded
		const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['line_items', 'subscription'],
		});

		if (!checkoutSession) {
			throw Error('Checkout session could not be retrieved.');
		}
		console.log('🚀 ~ fulfillCheckout @@@@@@ ~ checkoutSession:', checkoutSession);

		if (checkoutSession.payment_status !== 'unpaid') {
			const customerId = checkoutSession.customer as string;

			await prisma.$transaction(async (tx) => {
				const customer = await tx.user.update({
					where: {
						clerkId: checkoutSession?.metadata?.userId,
					},
					data: {
						stripeCustomerId: customerId,
					},
				});

				await tx.subscription.create({
					data: {
						userId: customer.id,
						stripeSubscriptionId: subscription.id,
						stripePriceId: subscription.items.data[0].price.id,
						stripeCustomerId: customerId,
						stripeCheckoutSessionId: sessionId,
						status: subscription.status || 'active',
						currentPeriodStart: new Date(subscription.current_period_start * 1000),
						currentPeriodEnd: new Date(subscription.current_period_end * 1000),
						cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
					},
				});
			});

			console.log(`Successfully fulfilled checkout session ${sessionId}`);
		} else {
			console.log(
				`Payment for session ${sessionId} is still unpaid. Skipping fulfillment.`
			);
		}
	} catch (error) {
		console.error(`Error fulfilling checkout session ${sessionId}:`, error);
		throw error;
	}
}
