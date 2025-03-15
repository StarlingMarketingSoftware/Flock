'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Clock, 
  Home, 
  Inbox, 
  LogOut, 
  Mail, 
  PenTool, 
  Send, 
  Settings, 
  Users 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Inbox',
    href: '/inbox',
    icon: Inbox,
  },
  {
    title: 'Compose',
    href: '/composer',
    icon: Mail,
  },
  {
    title: 'Drafts',
    href: '/drafts',
    icon: PenTool,
  },
  {
    title: 'Sent',
    href: '/sent',
    icon: Send,
  },
  {
    title: 'Scheduler',
    href: '/scheduler',
    icon: Clock,
  },
  {
    title: 'Contacts',
    href: '/contacts',
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 border-r flex flex-col">
      <div className="p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Mail className="h-6 w-6" />
          <span className="font-bold text-lg">Gmail Toolkit</span>
        </Link>
      </div>
      
      <div className="flex-1 py-6 px-4 overflow-auto">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'hover:bg-muted'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
        
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase pl-3 mb-3">
            Labels
          </h3>
          <nav className="space-y-1">
            <Link
              href="#work"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              Work
            </Link>
            <Link
              href="#personal"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Personal
            </Link>
            <Link
              href="#important"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              Important
            </Link>
          </nav>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <Link href="/settings" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => signOut()}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
