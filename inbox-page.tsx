import { Suspense } from 'react';
import { CheckCircle2, Filter, Inbox, Mail, MoreHorizontal, RefreshCcw, Search, Star, Tags, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import EmailList from '@/components/email/EmailList';

export default function InboxPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search emails..."
              className="w-full pl-8"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="primary" className="flex-1 flex flex-col">
        <div className="border-b">
          <TabsList>
            <TabsTrigger value="primary" className="flex gap-2">
              <Inbox className="h-4 w-4" />
              Primary
            </TabsTrigger>
            <TabsTrigger value="social" className="flex gap-2">
              <Mail className="h-4 w-4" />
              Social
            </TabsTrigger>
            <TabsTrigger value="promotions" className="flex gap-2">
              <Tags className="h-4 w-4" />
              Promotions
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="primary" className="flex-1 p-0">
          <div className="border-b py-2 px-4 flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <CheckCircle2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Trash2 className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground">3 of 120</span>
            <div className="ml-auto">
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Suspense fallback={<EmailListSkeleton />}>
            <EmailList />
          </Suspense>
        </TabsContent>

        <TabsContent value="social" className="flex-1 p-0">
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium">Social tab</h3>
            <p className="text-sm text-muted-foreground">
              Emails from social networks and platforms
            </p>
          </div>
        </TabsContent>

        <TabsContent value="promotions" className="flex-1 p-0">
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium">Promotions tab</h3>
            <p className="text-sm text-muted-foreground">
              Offers, deals, and other marketing emails
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmailListSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-4 p-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-1/5" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}
