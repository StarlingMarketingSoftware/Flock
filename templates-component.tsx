'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Plus, Edit, Trash2, Copy } from 'lucide-react';

type Template = {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'personal' | 'work' | 'marketing';
  lastUsed?: string;
};

// Mock data for templates
const DEMO_TEMPLATES: Template[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
  },
];

export default function EmailTemplates() {
  const [templates, setTemplates] = useState<Template[]>(DEMO_TEMPLATES);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState<'all' | 'personal' | 'work' | 'marketing'>('all');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.body.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = currentCategory === 'all' || template.category === currentCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: Template) => {
    // In a real app, this would apply the template to the composer
    console.log('Using template:', template);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Email Templates</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={(v) => setCurrentCategory(v as any)}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="work">Work</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onUse={handleUseTemplate}
                />
              ))
            ) : (
              <div className="col-span-2 py-12 text-center text-muted-foreground">
                <p>No templates found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* These content sections will display based on the filter at the TabsList level */}
        <TabsContent value="personal" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onUse={handleUseTemplate}
                />
              ))
            ) : (
              <div className="col-span-2 py-12 text-center text-muted-foreground">
                <p>No personal templates found.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="work" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onUse={handleUseTemplate}
                />
              ))
            ) : (
              <div className="col-span-2 py-12 text-center text-muted-foreground">
                <p>No work templates found.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="marketing" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onUse={handleUseTemplate}
                />
              ))
            ) : (
              <div className="col-span-2 py-12 text-center text-muted-foreground">
                <p>No marketing templates found.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TemplateCard({ template, onUse }: { template: Template; onUse: (template: Template) => void }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{template.name}</CardTitle>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-sm font-medium">{template.subject}</div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-line">
          {template.body.substring(0, 150)}
          {template.body.length > 150 ? '...' : ''}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          {template.lastUsed ? `Last used: ${new Date(template.lastUsed).toLocaleDateString()}` : 'Never used'}
        </div>
        <Button size="sm" onClick={() => onUse(template)}>
          Use Template
        </Button>
      </CardFooter>
    </Card>
  );
}
