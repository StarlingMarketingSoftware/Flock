import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
	const user = await currentUser();

	if (!user) {
		redirect('/sign-in');
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-4">
						Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}
					</h2>
					<p className="text-gray-600">
						This is your dashboard. You can manage your account and subscriptions here.
					</p>
				</div>
			</main>
		</div>
	);
}
