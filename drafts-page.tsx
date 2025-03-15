import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDrafts } from '@/lib/gmail';
import { Edit, Filter, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDateTime } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

async function getDraftEmails(userId: string) {
  try {
    // Get drafts from the database
    const localDrafts = await prisma.draft.findMany({
      where: {
        userId,
        status: "draft"
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    // In a real application, you might also fetch drafts from the Gmail API
    // For simplicity, we'll just use the local drafts for now

    return localDrafts.map(draft => ({
      id: draft.id,
      subject: draft.subject,
      recipients: draft.to,
      updatedAt: draft.updatedAt,
      preview: draft.body.substring(0, 100) + (draft.body.length > 100 ? '...' : '')
    }));
  } catch (error) {
    console.error('Error fetching drafts:', error);
    return [];
  }
}

export default async function DraftsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  // For demo purposes, let's add some dummy data since we don't have actual Gmail drafts
  const dummyDrafts = [
    {
      id: '1',
      subject: 'Project Proposal for Client',
      recipients: 'client@example.com',
      updatedAt: new Date(),
      preview: 'Here is the project proposal we discussed. I've outlined the key deliverables and timeline for...'
    },
    {
      id: '2',
      subject: 'Meeting Follow-up',
      recipients: 'team@company.com',
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      preview: 'Thanks for attending the meeting yesterday. Here are the action items we agreed on:'
    },
    {
      id: '3',
      subject: 'Interview Questions',
      recipients: 'hr@company.com',
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      preview: 'Here are the interview questions for the upcoming candidate interviews:'
    }
  ];

  // In a real application, we would fetch the actual drafts
  // const drafts = await getDraftEmails(session.user.id);
  const drafts = dummyDrafts;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Drafts</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search drafts..."
              className="w-full pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Link href="/composer">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Draft
            </Button>
          </Link>
        </div>
      </div>

      {drafts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted p-4 rounded-full mb-4">
            <Edit className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No drafts yet</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            Create your first draft by clicking the "New Draft" button above.
          </p>
          <Link href="/composer">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Draft
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {drafts.map((draft) => (
            <Card key={draft.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-base truncate">{draft.subject || 'No Subject'}</CardTitle>
                    <CardDescription className="truncate">To: {draft.recipients}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{draft.preview}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <div className="text-xs text-muted-foreground">
                  Last edited: {formatDateTime(draft.updatedAt)}
                </div>
                <Link href={`/composer?draft=${draft.id}`}>
                  <Button size="sm">Edit</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
