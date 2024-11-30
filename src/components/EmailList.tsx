import React from 'react';
import { format } from 'date-fns';
import { Shield, AlertTriangle, Ban } from 'lucide-react';
import { EmailThread } from '../types/email';

interface EmailListProps {
  threads: EmailThread[];
}

const ThreatIcon = ({ level }: { level: EmailThread['threatLevel'] }) => {
  switch (level) {
    case 'safe':
      return <Shield className="w-5 h-5 text-green-600" />;
    case 'suspicious':
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    case 'malicious':
      return <Ban className="w-5 h-5 text-red-600" />;
  }
};

export const EmailList: React.FC<EmailListProps> = ({ threads }) => {
  if (threads.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No emails processed yet</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {threads.map((thread) => (
        <div key={thread.id} className="p-4 hover:bg-gray-50">
          <div className="flex items-center gap-4">
            <ThreatIcon level={thread.threatLevel} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {thread.from}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(thread.date), 'MMM d, yyyy')}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900 truncate">
                {thread.subject}
              </p>
              <p className="text-sm text-gray-500 truncate">{thread.snippet}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};