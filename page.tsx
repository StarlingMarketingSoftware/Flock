import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Mail, Clock, PenTool, Send } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Mail className="h-6 w-6" />
              <span className="font-bold">Gmail Toolkit</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <Link href="/auth/signin">
                <Button variant="ghost" className="mr-2">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage Your Gmail Like a Pro
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Draft, schedule, and send emails efficiently with our intuitive toolkit.
                    Perfect for marketing campaigns, follow-ups, and staying organized.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/signin">
                    <Button size="lg" className="mr-4">
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button size="lg" variant="outline">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                  <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
                    <Mail className="h-12 w-12 text-blue-500" />
                    <h3 className="text-xl font-bold">Inbox Management</h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      View and organize your emails
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
                    <PenTool className="h-12 w-12 text-purple-500" />
                    <h3 className="text-xl font-bold">Smart Drafts</h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Create templates and drafts
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
                    <Clock className="h-12 w-12 text-amber-500" />
                    <h3 className="text-xl font-bold">Scheduling</h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Schedule emails to send later
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
                    <Send className="h-12 w-12 text-green-500" />
                    <h3 className="text-xl font-bold">Campaigns</h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Send emails to multiple recipients
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Gmail Toolkit. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
