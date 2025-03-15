'use client';

import { useState } from 'react';
import Link from 'next/link';
import { currentUser, drafts, inboxEmails, scheduledEmails, sentEmails } from '@/lib/data';
import { Mail, Inbox, PenTool, Clock, Send, User, ChevronRight, Home } from 'lucide-react';

export default function Dashboard() {
  // Simple state for demo purposes
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    inboxCount: inboxEmails.filter(email => !email.read).length,
    draftCount: drafts.length,
    scheduledCount: scheduledEmails.length,
    sentCount: sentEmails.length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-xl">Gmail Toolkit</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">{currentUser.email}</span>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-medium">
              {currentUser.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Sidebar and content wrapper */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium ${
                  activeTab === 'dashboard' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('inbox')}
                className={`flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium ${
                  activeTab === 'inbox' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Inbox className="h-4 w-4" />
                Inbox
                {stats.inboxCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {stats.inboxCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('drafts')}
                className={`flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium ${
                  activeTab === 'drafts' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <PenTool className="h-4 w-4" />
                Drafts
                {stats.draftCount > 0 && (
                  <span className="ml-auto bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {stats.draftCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('scheduled')}
                className={`flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium ${
                  activeTab === 'scheduled' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Clock className="h-4 w-4" />
                Scheduled
                {stats.scheduledCount > 0 && (
                  <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {stats.scheduledCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium ${
                  activeTab === 'sent' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Send className="h-4 w-4" />
                Sent
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium ${
                  activeTab === 'contacts' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <User className="h-4 w-4" />
                Contacts
              </button>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <DashboardContent stats={stats} />
            )}
            {activeTab === 'inbox' && (
              <InboxContent />
            )}
            {activeTab === 'drafts' && (
              <DraftsContent />
            )}
            {activeTab === 'scheduled' && (
              <ScheduledContent />
            )}
            {activeTab === 'sent' && (
              <SentContent />
            )}
            {activeTab === 'contacts' && (
              <ContactsContent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardContent({ stats }: { stats: any }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Inbox</p>
              <p className="text-2xl font-bold">{stats.inboxCount}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Unread emails</p>
            </div>
            <Inbox className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Drafts</p>
              <p className="text-2xl font-bold">{stats.draftCount}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Saved drafts</p>
            </div>
            <PenTool className="h-5 w-5 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled</p>
              <p className="text-2xl font-bold">{stats.scheduledCount}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Waiting to be sent</p>
            </div>
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sent</p>
              <p className="text-2xl font-bold">{stats.sentCount}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total sent this month</p>
            </div>
            <Send className="h-5 w-5 text-green-500" />
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => alert('Compose Email clicked')}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-md font-medium transition-colors"
          >
            <PenTool className="h-5 w-5" />
            Compose Email
          </button>
          
          <button 
            onClick={() => alert('Check Inbox clicked')}
            className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-md font-medium transition-colors"
          >
            <Inbox className="h-5 w-5" />
            Check Inbox
          </button>
          
          <button 
            onClick={() => alert('View Drafts clicked')}
            className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-md font-medium transition-colors"
          >
            <PenTool className="h-5 w-5" />
            View Drafts
          </button>
          
          <button 
            onClick={() => alert('Schedule Email clicked')}
            className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-md font-medium transition-colors"
          >
            <Clock className="h-5 w-5" />
            Schedule Email
          </button>
        </div>
      </div>
      
      {/* Recent items */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Items</h2>
        <div className="space-y-3">
          {drafts.slice(0, 3).map(draft => (
            <div key={draft.id} className="border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <div className="flex items-start gap-3">
                <PenTool className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{draft.subject}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    {draft.body.substring(0, 100)}...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Last edited: {new Date(draft.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InboxContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inbox</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {inboxEmails.map(email => (
          <div 
            key={email.id} 
            className={`border-b last:border-b-0 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
              !email.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium flex-shrink-0">
                {email.from.name.charAt(0)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className={`text-sm font-medium truncate ${!email.read ? 'font-semibold' : ''}`}>
                    {email.from.name}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {new Date(email.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h3 className={`text-sm truncate ${!email.read ? 'font-semibold' : ''}`}>
                  {email.subject}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {email.preview}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DraftsContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Drafts</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {drafts.map(draft => (
          <div key={draft.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1">{draft.subject}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">To: {draft.to}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{draft.body}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Last edited: {new Date(draft.updatedAt).toLocaleString()}
              </span>
              <button 
                onClick={() => alert(`Edit draft: ${draft.id}`)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduledContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Scheduled Emails</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {scheduledEmails.map(email => (
          <div key={email.id} className="border-b last:border-b-0 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{email.subject}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">To: {email.to}</p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Scheduled for: {new Date(email.sendAt!).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert(`Send now: ${email.id}`)}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Send Now
                </button>
                <button 
                  onClick={() => alert(`Cancel: ${email.id}`)}
                  className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SentContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sent Emails</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {sentEmails.map(email => (
          <div key={email.id} className="border-b last:border-b-0 p-4">
            <h3 className="font-medium">{email.subject}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">To: {email.to}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">{email.body}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Sent on: {new Date(email.updatedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Contacts</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
        <div className="my-6">
          <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Contact management coming soon</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            This feature is under development. You will be able to manage your contacts here.
          </p>
          <button 
            onClick={() => alert('Feature coming soon!')}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Import Contacts
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
