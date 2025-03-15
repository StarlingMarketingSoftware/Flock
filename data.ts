// In-memory data storage for the simplified version

export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export type Email = {
  id: string;
  from: {
    name: string;
    email: string;
  };
  to: string;
  subject: string;
  body: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  hasAttachments: boolean;
  threadId: string;
  labels: string[];
};

export type Draft = {
  id: string;
  subject: string;
  to: string;
  cc?: string;
  bcc?: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  scheduled: boolean;
  sendAt?: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
};

export type Template = {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'personal' | 'work' | 'marketing';
  lastUsed?: string;
};

// Mock user
export const currentUser: User = {
  id: "user-1",
  name: "Demo User",
  email: "demo@example.com",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
};

// Mock inbox emails
export const inboxEmails: Email[] = [
  {
    id: '1',
    threadId: 'thread-1',
    from: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    to: 'demo@example.com',
    subject: 'Meeting tomorrow',
    body: `<p>Hi there,</p>
    <p>I wanted to confirm our meeting tomorrow at 2 PM. Please let me know if that still works for you.</p>
    <p>Best regards,<br>John</p>`,
    preview: 'Hi, I wanted to confirm our meeting tomorrow at 2 PM. Please let me know if that still works for you.',
    date: '2024-03-14T10:30:00Z',
    read: false,
    starred: true,
    hasAttachments: false,
    labels: ['INBOX', 'IMPORTANT']
  },
  {
    id: '2',
    threadId: 'thread-2',
    from: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    to: 'demo@example.com',
    subject: 'Project proposal',
    body: `<p>Hello,</p>
    <p>I've attached the project proposal we discussed. Let me know your thoughts when you get a chance.</p>
    <p>Thanks,<br>Jane</p>`,
    preview: 'I've attached the project proposal we discussed. Let me know your thoughts when you get a chance.',
    date: '2024-03-14T08:15:00Z',
    read: true,
    starred: false,
    hasAttachments: true,
    labels: ['INBOX']
  },
  {
    id: '3',
    threadId: 'thread-3',
    from: {
      name: 'Marketing Team',
      email: 'marketing@company.com',
    },
    to: 'demo@example.com',
    subject: 'Q2 Marketing Plan Review',
    body: `<p>Dear Team,</p>
    <p>Here's the Q2 marketing plan for your review. We've made some changes based on the feedback from last quarter.</p>
    <p>Please review by Friday.</p>
    <p>Thanks,<br>Marketing Team</p>`,
    preview: 'Here's the Q2 marketing plan for your review. We've made some changes based on the feedback from last quarter.',
    date: '2024-03-13T16:45:00Z',
    read: true,
    starred: false,
    hasAttachments: true,
    labels: ['INBOX', 'CATEGORY_PROMOTIONS']
  },
  {
    id: '4',
    threadId: 'thread-4',
    from: {
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
    },
    to: 'demo@example.com',
    subject: 'Quick question about the presentation',
    body: `<p>Hey there,</p>
    <p>I had a quick question about slide 15 in your presentation. Could you clarify what you meant by "iterative approach"? Is this referring to the design sprints we discussed?</p>
    <p>Thanks in advance!</p>
    <p>Alex</p>`,
    preview: 'Hey there, I had a quick question about slide 15 in your presentation. Could you clarify what you meant by...',
    date: '2024-03-13T14:20:00Z',
    read: false,
    starred: false,
    hasAttachments: false,
    labels: ['INBOX', 'CATEGORY_PERSONAL']
  },
  {
    id: '5',
    threadId: 'thread-5',
    from: {
      name: 'HR Department',
      email: 'hr@company.com',
    },
    to: 'demo@example.com',
    subject: 'Important: Benefits enrollment deadline',
    body: `<p>Dear Employee,</p>
    <p>This is a reminder that the benefits enrollment period closes on Friday. Please make your selections by end of day.</p>
    <p>If you have any questions, please contact HR.</p>
    <p>Best regards,<br>HR Department</p>`,
    preview: 'This is a reminder that the benefits enrollment period closes on Friday. Please make your selections by end of day.',
    date: '2024-03-12T09:00:00Z',
    read: true,
    starred: true,
    hasAttachments: false,
    labels: ['INBOX', 'IMPORTANT']
  }
];

// Mock drafts
export const drafts: Draft[] = [
  {
    id: 'draft-1',
    subject: 'Project Proposal for Client',
    to: 'client@example.com',
    body: 'Here is the project proposal we discussed. I've outlined the key deliverables and timeline for the project as follows:\n\n1. Research Phase (2 weeks)\n2. Design Phase (3 weeks)\n3. Development Phase (4 weeks)\n4. Testing & Refinement (2 weeks)\n\nThe total budget for this project is $15,000.\n\nPlease let me know if you have any questions.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    scheduled: false,
    status: 'draft'
  },
  {
    id: 'draft-2',
    subject: 'Meeting Follow-up',
    to: 'team@company.com',
    cc: 'manager@company.com',
    body: 'Thanks for attending the meeting yesterday. Here are the action items we agreed on:\n\n- Sarah: Prepare market research report by Friday\n- John: Update the client presentation\n- Maria: Schedule the follow-up call for next week\n\nOur next team meeting will be on Monday at 10 AM.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    scheduled: false,
    status: 'draft'
  },
  {
    id: 'draft-3',
    subject: 'Interview Questions',
    to: 'hr@company.com',
    body: 'Here are the interview questions for the upcoming candidate interviews:\n\n1. Can you describe your experience with similar projects?\n2. How do you approach problem-solving in a team environment?\n3. What tools and technologies are you most comfortable with?\n4. How do you handle tight deadlines and changing requirements?\n\nPlease let me know if you want to add any more questions.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    scheduled: false,
    status: 'draft'
  }
];

// Mock scheduled emails
export const scheduledEmails: Draft[] = [
  {
    id: 'scheduled-1',
    subject: 'Quarterly Business Review',
    to: 'team@company.com',
    body: 'Hello team,\n\nThis is a reminder about our quarterly business review meeting tomorrow. Please come prepared with your department updates.\n\nRegards,\nManagement',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    scheduled: true,
    sendAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    status: 'scheduled'
  },
  {
    id: 'scheduled-2',
    subject: 'Client Follow-up',
    to: 'client@example.com',
    body: 'Dear Client,\n\nI wanted to follow up on our recent meeting and see if you had any questions about the proposal.\n\nLooking forward to your feedback.\n\nBest regards,\nAccount Manager',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    scheduled: true,
    sendAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    status: 'scheduled'
  },
  {
    id: 'scheduled-3',
    subject: 'Weekly Newsletter',
    to: 'subscribers@company.com',
    body: 'Hello Subscribers,\n\nHere is our weekly newsletter with the latest updates and announcements.\n\n- New product launch next month\n- Office closed for company retreat on Friday\n- Welcome our new team members: Sarah and John\n\nHave a great week!\nThe Communications Team',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    scheduled: true,
    sendAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    status: 'scheduled'
  }
];

// Mock sent emails
export const sentEmails: Draft[] = [
  {
    id: 'sent-1',
    subject: 'Project Update',
    to: 'manager@company.com',
    body: 'Hi Manager,\n\nHere is the weekly project update as requested.\n\nWe are on track to meet the deadline. All key milestones have been met so far.\n\nRegards,\nTeam Lead',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    scheduled: false,
    status: 'sent'
  },
  {
    id: 'sent-2',
    subject: 'Holiday Greeting',
    to: 'clients@company.com',
    body: 'Dear Valued Clients,\n\nHappy holidays from all of us at Company! We appreciate your business and look forward to serving you in the new year.\n\nWarm regards,\nThe Company Team',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    scheduled: false,
    status: 'sent'
  }
];

// Mock email templates
export const emailTemplates: Template[] = [
  {
    id: 'template-1',
    name: 'Meeting Follow-up',
    subject: 'Follow-up from our meeting on {date}',
    body: `Hi {name},

Thank you for taking the time to meet with me on {date}. I wanted to follow up on some of the key points we discussed:

- {point1}
- {point2}
- {point3}

Let me know if you have any questions or if there's anything else I can help with.

Best regards,
{yourName}`,
    category: 'work',
    lastUsed: '2024-03-10T14:30:00Z',
  },
  {
    id: 'template-2',
    name: 'Thank You Note',
    subject: 'Thank you!',
    body: `Dear {name},

I wanted to take a moment to express my sincere thanks for {reason}. It meant a lot to me.

Thanks again,
{yourName}`,
    category: 'personal',
    lastUsed: '2024-02-28T09:15:00Z',
  },
  {
    id: 'template-3',
    name: 'Marketing Newsletter',
    subject: '{company} - Monthly Newsletter',
    body: `Hello {name},

Here's what's new at {company} this month:

# Latest Updates
- {update1}
- {update2}

# Upcoming Events
- {event1}
- {event2}

To learn more, visit our website or reply to this email with any questions.

Thanks,
The {company} Team`,
    category: 'marketing',
  },
  {
    id: 'template-4',
    name: 'Interview Request',
    subject: 'Interview Request: {position} Position at {company}',
    body: `Dear {name},

I'm writing to request an interview for the {position} position at {company}.

I believe my experience in {skill1} and {skill2} would make me a strong candidate for this role.

I'm available {availability} and look forward to the opportunity to discuss how I can contribute to your team.

Best regards,
{yourName}`,
    category: 'work',
    lastUsed: '2024-03-05T11:00:00Z',
  }
];

// Helper functions for accessing data
export function getInboxEmails(): Email[] {
  return inboxEmails;
}

export function getEmail(id: string): Email | undefined {
  return inboxEmails.find(email => email.id === id);
}

export function getDrafts(): Draft[] {
  return drafts;
}

export function getDraft(id: string): Draft | undefined {
  return drafts.find(draft => draft.id === id);
}

export function getScheduledEmails(): Draft[] {
  return scheduledEmails;
}

export function getSentEmails(): Draft[] {
  return sentEmails;
}

export function getTemplates(): Template[] {
  return emailTemplates;
}

export function getTemplate(id: string): Template | undefined {
  return emailTemplates.find(template => template.id === id);
}
