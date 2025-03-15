import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';
import prisma from './prisma';
import { Prisma } from '@prisma/client';

// Re-export the ActivityType enum
export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: sessionData.user.id,
      deletedAt: null,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}

export async function getTeamByStripeCustomerId(customerId: string) {
  return await prisma.team.findUnique({
    where: {
      stripeCustomerId: customerId,
    },
  });
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await prisma.team.update({
    where: {
      id: teamId,
    },
    data: {
      ...subscriptionData,
      updatedAt: new Date(),
    },
  });
}

export async function getUserWithTeam(userId: number) {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      teamMembers: {
        select: {
          teamId: true,
        },
        take: 1,
      },
    },
  });

  if (!result) return null;

  return {
    user: result,
    teamId: result.teamMembers[0]?.teamId || null,
  };
}

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await prisma.activityLog.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      action: true,
      timestamp: true,
      ipAddress: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      timestamp: 'desc',
    },
    take: 10,
  });
}

export async function getTeamForUser(userId: number) {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      teamMembers: {
        include: {
          team: {
            include: {
              teamMembers: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return result?.teamMembers[0]?.team || null;
}
