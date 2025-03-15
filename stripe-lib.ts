import Stripe from 'stripe';
import { prisma } from './prisma';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export async function createStripeCustomer(userId: string, email: string) {
  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer;
}

export async function getOrCreateStripeCustomer(userId: string, email: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user?.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await createStripeCustomer(userId, email);
  return customer.id;
}

export async function createCheckoutSession({
  userId,
  email,
  priceId,
  returnUrl,
}: {
  userId: string;
  email: string;
  priceId: string;
  returnUrl: string;
}) {
  const customerId = await getOrCreateStripeCustomer(userId, email);

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    client_reference_id: userId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${returnUrl}?canceled=true`,
    subscription_data: {
      metadata: {
        userId,
      },
    },
  });

  return checkoutSession;
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

export async function manageSubscriptionStatusChange(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  const customer = await stripe.customers.retrieve(customerId);

  // Get the user ID from the customer metadata
  const userId = customer.metadata.userId;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method'],
  });

  // Update or create the subscription in the database
  const data = {
    userId,
    stripeSubscriptionId: subscription.id,
    stripePriceId: subscription.items.data[0].price.id,
    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
  };

  if (createAction) {
    // Create a new subscription
    await prisma.subscription.create({
      data,
    });
  } else {
    // Update the existing subscription
    await prisma.subscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data,
    });
  }

  console.log(`Subscription ${createAction ? 'created' : 'updated'}: ${subscription.id}`);
}
