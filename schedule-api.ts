import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validate the schedule request
const scheduleSchema = z.object({
  draftId: z.string().optional(),
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  sendAt: z.string().datetime(), // ISO datetime string
});

export async function POST(req: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await req.json();
    const parsedBody = scheduleSchema.safeParse(body);
    
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsedBody.error },
        { status: 400 }
      );
    }
    
    const { draftId, to, subject, body: emailBody, cc, bcc, sendAt } = parsedBody.data;
    
    // Check if the scheduled time is in the future
    const scheduledDate = new Date(sendAt);
    if (scheduledDate <= new Date()) {
      return NextResponse.json(
        { error: 'Scheduled time must be in the future' },
        { status: 400 }
      );
    }
    
    // Create or update a draft with scheduled status
    let draft;
    
    if (draftId) {
      // Update existing draft
      draft = await prisma.draft.update({
        where: {
          id: draftId,
          userId: session.user.id,
        },
        data: {
          to,
          subject,
          body: emailBody,
          cc: cc || null,
          bcc: bcc || null,
          scheduled: true,
          sendAt: scheduledDate,
          status: 'scheduled',
        },
      });
    } else {
      // Create new draft
      draft = await prisma.draft.create({
        data: {
          userId: session.user.id,
          to,
          subject,
          body: emailBody,
          cc: cc || null,
          bcc: bcc || null,
          scheduled: true,
          sendAt: scheduledDate,
          status: 'scheduled',
        },
      });
    }
    
    // Return the scheduled draft
    return NextResponse.json({
      success: true,
      draft,
    });
  } catch (error: any) {
    console.error('Error scheduling email:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Get all scheduled emails for the current user
export async function GET() {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get scheduled emails
    const scheduledEmails = await prisma.draft.findMany({
      where: {
        userId: session.user.id,
        scheduled: true,
        status: 'scheduled',
      },
      orderBy: {
        sendAt: 'asc',
      },
    });
    
    return NextResponse.json({
      scheduledEmails,
    });
  } catch (error: any) {
    console.error('Error getting scheduled emails:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
