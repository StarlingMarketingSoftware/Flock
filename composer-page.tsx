import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import EmailTemplates from "@/components/email/EmailTemplates";
import { Paperclip, Send, Clock, Save, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ComposerPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Compose Email</h1>

      <Tabs defaultValue="compose">
        <TabsList className="mb-4">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="ai-assist">AI Assist</TabsTrigger>
        </TabsList>

        <TabsContent value="compose">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1.5">
                <Input
                  type="email"
                  placeholder="To"
                  className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <Input
                  type="text"
                  placeholder="Cc/Bcc"
                  className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <Input
                  type="text"
                  placeholder="Subject"
                  className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>
              <Textarea
                placeholder="Write your message here..."
                className="min-h-[200px] border rounded mt-4"
              />

              <div className="flex items-center gap-2 pt-4">
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Send
                </Button>
                <Button variant="outline" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Schedule
                </Button>
                <Button variant="outline" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <EmailTemplates />
        </TabsContent>

        <TabsContent value="ai-assist">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">AI Email Assistant</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Let AI help you draft the perfect email. Select options below
                  and generate content.
                </p>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tone">Email Tone</Label>
                    <select
                      id="tone"
                      className="w-full p-2 border rounded mt-1"
                    >
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="formal">Formal</option>
                      <option value="casual">Casual</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="purpose">Email Purpose</Label>
                    <select
                      id="purpose"
                      className="w-full p-2 border rounded mt-1"
                    >
                      <option value="introduction">Introduction</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="request">Request</option>
                      <option value="thank-you">Thank You</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="prompt">Additional Instructions</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Provide any specific details to include in the email..."
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-signature" />
                    <Label htmlFor="include-signature">
                      Include my signature
                    </Label>
                  </div>

                  <Button className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
