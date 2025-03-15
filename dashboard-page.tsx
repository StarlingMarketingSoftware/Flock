import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, PenTool, Clock, Send, CircleUser } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getDashboardData() {
  // In a real app, we'd fetch this from the database
  return {
    stats: {
      inboxCount: 12,
      draftCount: 5,
      scheduledCount: 3,
      sentCount: 28
    },
    recentItems: [
      { id: '1', type: 'draft', subject: 'Client proposal', date: '2024-03-13T10:30:00Z' },
      { id: '2', type: 'scheduled', subject: 'Team meeting', date: '2024-03-15T09:00:00Z' },
      { id: '3', type: 'draft', subject: 'Marketing ideas', date: '2024-03-12T14:20:00Z' }
    ]
  };
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {session?.user?.email}
          </span>
          <CircleUser className="h-8 w-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inbox</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.inboxCount}</div>
            <p className="text-xs text-muted-foreground">Unread emails</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <PenTool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.draftCount}</div>
            <p className="text-xs text-muted-foreground">Saved drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.scheduledCount}</div>
            <p className="text-xs text-muted-foreground">Waiting to be sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.sentCount}</div>
            <p className="text-xs text-muted-foreground">Total sent this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and actions</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/composer">
              <Button className="w-full" size="lg">
                <PenTool className="mr-2 h-4 w-4" />
                Compose Email
              </Button>
            </Link>
            <Link href="/inbox">
              <Button variant="outline" className="w-full" size="lg">
                <Mail className="mr-2 h-4 w-4" />
                Check Inbox
              </Button>
            </Link>
            <Link href="/drafts">
              <Button variant="outline" className="w-full" size="lg">
                <PenTool className="mr-2 h-4 w-4" />
                View Drafts
              </Button>
            </Link>
            <Link href="/scheduler">
              <Button variant="outline" className="w-full" size="lg">
                <Clock className="mr-2 h-4 w-4" />
                Schedule Email
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Items</CardTitle>
            <CardDescription>Your latest activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="drafts">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>
              <TabsContent value="drafts" className="mt-4 space-y-4">
                {data.recentItems
                  .filter(item => item.type === 'draft')
                  .map(item => (
                    <div key={item.id} className="flex items-center gap-2 p-2 border rounded hover:bg-muted cursor-pointer">
                      <PenTool className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{item.subject}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="scheduled" className="mt-4 space-y-4">
                {data.recentItems
                  .filter(item => item.type === 'scheduled')
                  .map(item => (
                    <div key={item.id} className="flex items-center gap-2 p-2 border rounded hover:bg-muted cursor-pointer">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{item.subject}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
