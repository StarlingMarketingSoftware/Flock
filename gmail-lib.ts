import { google } from 'googleapis';
import { prisma } from './prisma';

export const GMAIL_SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify'
];

type ParsedEmail = {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: {
    headers: { name: string; value: string }[];
    body?: { data?: string };
    parts?: {
      mimeType: string;
      body?: { data?: string };
    }[];
  };
  internalDate: string;
};

/**
 * Get Gmail API client for a user
 */
export async function getGmailClient(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.gmailRefreshToken) {
    throw new Error('User Gmail refresh token not found');
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXTAUTH_URL + '/api/auth/callback/google'
  );

  oauth2Client.setCredentials({
    refresh_token: user.gmailRefreshToken,
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

/**
 * Get messages from Gmail inbox
 */
export async function getInboxMessages(userId: string, maxResults = 20, query = '') {
  const gmail = await getGmailClient(userId);
  
  try {
    // List messages from inbox
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults,
      q: query,
      labelIds: ['INBOX'],
    });

    const messages = response.data.messages || [];
    
    // Get details for each message
    const messageDetails = await Promise.all(
      messages.map(async (message) => {
        const msgResponse = await gmail.users.messages.get({
          userId: 'me',
          id: message.id!,
          format: 'full',
        });
        
        return msgResponse.data;
      })
    );
    
    return messageDetails.map(parseGmailMessage);
  } catch (error) {
    console.error('Error fetching Gmail messages:', error);
    throw error;
  }
}

/**
 * Parse Gmail message into a more usable format
 */
function parseGmailMessage(message: any) {
  const { id, threadId, labelIds, snippet, payload, internalDate } = message;
  
  // Parse headers
  const headers: Record<string, string> = {};
  payload.headers.forEach((header: any) => {
    headers[header.name.toLowerCase()] = header.value;
  });
  
  // Get message body
  let body = '';
  
  if (payload.mimeType === 'text/plain' && payload.body.data) {
    body = Buffer.from(payload.body.data, 'base64').toString();
  } else if (payload.parts) {
    // Try to find text/plain or text/html part
    const textPart = payload.parts.find((part: any) => 
      part.mimeType === 'text/plain' || part.mimeType === 'text/html'
    );
    
    if (textPart?.body?.data) {
      body = Buffer.from(textPart.body.data, 'base64').toString();
    }
  }
  
  // Check for attachments
  const attachments = [];
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.filename && part.body && part.body.attachmentId) {
        attachments.push({
          filename: part.filename,
          mimeType: part.mimeType,
          attachmentId: part.body.attachmentId,
        });
      }
    }
  }
  
  return {
    id,
    threadId,
    isUnread: labelIds.includes('UNREAD'),
    isStarred: labelIds.includes('STARRED'),
    snippet,
    subject: headers.subject || '(No Subject)',
    from: headers.from || '',
    to: headers.to || '',
    date: new Date(parseInt(internalDate)).toISOString(),
    body,
    attachments,
  };
}

/**
 * Send email using Gmail API
 */
export async function sendEmail(userId: string, options: { to: string; subject: string; body: string; cc?: string; bcc?: string }) {
  const gmail = await getGmailClient(userId);
  
  try {
    // Create MIME message
    const message = [
      `To: ${options.to}`,
      options.cc ? `Cc: ${options.cc}` : '',
      options.bcc ? `Bcc: ${options.bcc}` : '',
      `Subject: ${options.subject}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      '',
      options.body,
    ].filter(Boolean).join('\r\n');
    
    // Encode the message
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    // Send the message
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    
    return res.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Create a draft email
 */
export async function createDraft(userId: string, options: { to: string; subject: string; body: string; cc?: string; bcc?: string }) {
  const gmail = await getGmailClient(userId);
  
  try {
    // Create MIME message
    const message = [
      `To: ${options.to}`,
      options.cc ? `Cc: ${options.cc}` : '',
      options.bcc ? `Bcc: ${options.bcc}` : '',
      `Subject: ${options.subject}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      '',
      options.body,
    ].filter(Boolean).join('\r\n');
    
    // Encode the message
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    // Create the draft
    const res = await gmail.users.drafts.create({
      userId: 'me',
      requestBody: {
        message: {
          raw: encodedMessage,
        },
      },
    });
    
    return res.data;
  } catch (error) {
    console.error('Error creating draft:', error);
    throw error;
  }
}

/**
 * Get all drafts
 */
export async function getDrafts(userId: string) {
  const gmail = await getGmailClient(userId);
  
  try {
    const response = await gmail.users.drafts.list({
      userId: 'me',
    });
    
    const drafts = response.data.drafts || [];
    
    // Get details for each draft
    const draftDetails = await Promise.all(
      drafts.map(async (draft) => {
        const draftResponse = await gmail.users.drafts.get({
          userId: 'me',
          id: draft.id!,
          format: 'full',
        });
        
        return {
          id: draft.id,
          message: parseGmailMessage(draftResponse.data.message),
        };
      })
    );
    
    return draftDetails;
  } catch (error) {
    console.error('Error fetching drafts:', error);
    throw error;
  }
}
