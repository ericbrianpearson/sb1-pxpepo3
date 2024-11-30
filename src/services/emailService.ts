import axios from 'axios';
import { EmailThread } from '../types/email';

const GMAIL_API_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

export async function fetchEmails(accessToken: string): Promise<EmailThread[]> {
  const { data } = await axios.get(`${GMAIL_API_BASE}/threads`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      maxResults: 20,
      q: 'in:inbox',
    },
  });

  return Promise.all(
    data.threads.map(async (thread: any) => {
      const { data: threadData } = await axios.get(
        `${GMAIL_API_BASE}/threads/${thread.id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const message = threadData.messages[0];
      const headers = message.payload.headers;
      
      return {
        id: thread.id,
        snippet: message.snippet,
        subject: headers.find((h: any) => h.name === 'Subject')?.value || 'No Subject',
        from: headers.find((h: any) => h.name === 'From')?.value || '',
        date: headers.find((h: any) => h.name === 'Date')?.value || '',
        labels: message.labelIds || [],
        threatLevel: 'safe', // Will be updated by analyzeEmail
      };
    })
  );
}

export async function analyzeEmail(thread: EmailThread): Promise<EmailThread> {
  // Simple threat analysis based on common patterns
  // In a production environment, this would use more sophisticated AI/ML models
  const suspicious = [
    'urgent', 'account suspended', 'verify your account',
    'won lottery', 'inheritance', 'prince',
  ];
  const malicious = [
    'password reset', 'unusual activity', 'security alert',
    'login attempt', 'payment declined', 'invoice attached',
  ];

  const content = `${thread.subject} ${thread.snippet}`.toLowerCase();
  
  if (malicious.some(term => content.includes(term))) {
    return { ...thread, threatLevel: 'malicious' };
  }
  
  if (suspicious.some(term => content.includes(term))) {
    return { ...thread, threatLevel: 'suspicious' };
  }
  
  return { ...thread, threatLevel: 'safe' };
}