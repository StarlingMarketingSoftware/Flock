'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, Paperclip, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Email = {
  id: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  hasAttachments: boolean;
};

// Mock data - in a real app, would be fetched from the server
const DEMO_EMAILS: Email[] = [
  {
    id: '1',
    from: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    subject: 'Meeting tomorrow',
    preview: 'Hi, I wanted to confirm our meeting tomorrow at 2 PM. Please let me know if that still works for you.',
    date: '2024-03-14T10:30:00Z',
    read: false,
    starred: true,
    hasAttachments: false,
  },
  {
    id: '2',
    from: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    subject: 'Project proposal',
    preview: 'I've attached the project proposal we discussed. Let me know your thoughts when you get a chance.',
    date: '2024-03-14T08:15:00Z',
    read: true,
    starred: false,
    hasAttachments: true,
  },
  {
    id: '3',
    from: {
      name: 'Marketing Team',
      email: 'marketing@company.com',
    },
    subject: 'Q2 Marketing Plan Review',
    preview: 'Here's the Q2 marketing plan for your review. We've made some changes based on the feedback from last quarter.',
    date: '2024-03-13T16:45:00Z',
    read: true,
    starred: false,
    hasAttachments: true,
  },
  {
    id: '4',
    from: {
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
    },
    subject: 'Quick question about the presentation',
    preview: 'Hey there, I had a quick question about slide 15 in your presentation. Could you clarify what you meant by...',
    date: '2024-03-13T14:20:00Z',
    read: false,
    starred: false,
    hasAttachments: false,
  },
  {
    id: '5',
    from: {
      name: 'HR Department',
      email: 'hr@company.com',
    },
    subject: 'Important: Benefits enrollment deadline',
    preview: 'This is a reminder that the benefits enrollment period closes on Friday. Please make your selections by end of day.',
    date: '2024-03-12T09:00:00Z',
    read: true,
    starred: true,
    hasAttachments: false,
  },
];

export default function EmailList() {
  const [emails, setEmails] = useState<Email[]>(DEMO_EMAILS);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // If it's today, show the time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If it's this year, show the month and day
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    // Otherwise show full date
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const toggleRead = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, read: !email.read } : email
    ));
  };

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails(emails.map(email => 
      email.id === id ? { ...email, starred: !email.starred } : email
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="divide-y">
      {emails.map(email => (
        <Sheet key={email.id}>
          <SheetTrigger asChild>
            <div
              className={`flex items-start gap-4 p-4 hover:bg-muted cursor-pointer ${
                !email.read ? 'bg-blue-50 dark:bg-blue-950/20' : ''
              }`}
              onClick={() => setSelectedEmail(email)}
            >
              <div className="flex flex-col items-center gap-1 pt-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 rounded-full"
                  onClick={() => toggleRead(email.id)}
                >
                  <CheckCircle2 className={`h-4 w-4 ${!email.read ? 'text-blue-500' : 'text-muted-foreground'}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 rounded-full"
                  onClick={(e) => toggleStar(email.id, e)}
                >
                  <Star className={`h-4 w-4 ${email.starred ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                </Button>
              </div>
              
              <Avatar className="mt-1">
                <AvatarFallback>
                  {getInitials(email.from.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className={`text-sm font-medium truncate ${!email.read ? 'font-semibold' : ''}`}>
                    {email.from.name}
                  </h4>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatDate(email.date)}
                  </span>
                </div>
                <h3 className={`text-sm truncate ${!email.read ? 'font-semibold' : ''}`}>
                  {email.subject}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {email.preview}
                </p>
                <div className="flex gap-1 mt-1">
                  {email.hasAttachments && (
                    <Paperclip className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-full sm:max-w-xl overflow-auto">
            <SheetHeader className="mb-4">
              <SheetTitle>{email.subject}</SheetTitle>
            </SheetHeader>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(email.from.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium">
                      {email.from.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(email.date)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    to me
                  </p>
                </div>
              </div>
              
              <div className="py-4 text-sm">
                <p>{email.preview}</p>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mt-2">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                  culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              
              {email.hasAttachments && (
                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    Attachments
                  </h4>
                  <div className="border rounded p-2 bg-muted/50 flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded">
                      <Paperclip className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">document.pdf</p>
                      <p className="text-xs text-muted-foreground">250 KB</p>
                    </div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                </div>
              )}
              
              <div className="pt-4 flex gap-2">
                <Button>Reply</Button>
                <Button variant="outline">Forward</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
