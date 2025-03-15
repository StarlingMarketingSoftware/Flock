import { CalendarIcon, Clock, FileText, MoreHorizontal, Pause, Send, Trash, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { formatRelative } from 'date-fns';
import Link from "next/link";

// In a real app, this would be fetched from the server
const scheduledEmails = [
  {
    id: '1',
    subject: 'Quarterly Business Review',
    recipients: 'team@company.com',
    scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    status: 'pending'
  },
  {
    id: '2',
    subject: 'Client Follow-up',
    recipients: 'client@example.com',
    scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
    status: 'pending'
  },
  {
    id: '3',
    subject: 'Weekly Newsletter',
    recipients: 'subscribers@company.com',
    scheduledFor: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    status: 'pending'
  }
];

const completedEmails = [
  {
    id: '4',
    subject: 'Project Update',
    recipients: 'manager@company.com',
    sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: 'sent'
  },
  {
    id: '5',
    subject: 'Holiday Greeting',
    recipients: 'clients@company.com',
    sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: 'sent'
  }
];

export default function SchedulerPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Email Scheduler</h1>
        <Link href="/composer">
          <Button>
            Schedule New Email
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Quick Schedule</CardTitle>
              <CardDescription>Schedule an email from your drafts</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Draft</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a draft" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft1">Project Proposal Draft</SelectItem>
                    <SelectItem value="draft2">Meeting Follow-up</SelectItem>
                    <SelectItem value="draft3">Interview Confirmation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Pick a date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00">9:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="17:00">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Zone</label>
                <Select defaultValue="utc-5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc+0">UTC</SelectItem>
                    <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Email
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>
              Your next scheduled emails
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledEmails.map((email) => (
                <div key={email.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{email.subject}</p>
                    <div className="flex items-center pt-2">
                      <User className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{email.recipients}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatRelative(email.scheduledFor, new Date())}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>View Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pause className="mr-2 h-4 w-4" />
                        <span>Pause</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        <span>Send Now</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Cancel</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-4">Email History</h2>

        <Tabs defaultValue="scheduled">
          <TabsList className="mb-4">
            <TabsTrigger value="scheduled">Scheduled ({scheduledEmails.length})</TabsTrigger>
            <TabsTrigger value="sent">Sent ({completedEmails.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="scheduled" className="space-y-4">
            <div className="rounded-md border">
              <div className="bg-muted px-4 py-2 grid grid-cols-4 gap-4 text-xs font-medium">
                <div>Subject</div>
                <div>Recipient</div>
                <div>Scheduled For</div>
                <div>Actions</div>
              </div>
              <Separator />
              {scheduledEmails.map((email) => (
                <div key={email.id} className="px-4 py-3 grid grid-cols-4 gap-4 items-center">
                  <div className="text-sm font-medium">{email.subject}</div>
                  <div className="text-sm">{email.recipients}</div>
                  <div className="text-sm">
                    {email.scheduledFor.toLocaleDateString()}, {email.scheduledFor.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            <div className="rounded-md border">
              <div className="bg-muted px-4 py-2 grid grid-cols-3 gap-4 text-xs font-medium">
                <div>Subject</div>
                <div>Recipient</div>
                <div>Sent At</div>
              </div>
              <Separator />
              {completedEmails.map((email) => (
                <div key={email.id} className="px-4 py-3 grid grid-cols-3 gap-4 items-center">
                  <div className="text-sm font-medium">{email.subject}</div>
                  <div className="text-sm">{email.recipients}</div>
                  <div className="text-sm">
                    {email.sentAt.toLocaleDateString()}, {email.sentAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
