import axios from 'axios';
import { EmailThread } from '../../types/email';
import { AuthResponse } from '../../types/provider';
import { providers } from '../../config/providers';

const provider = providers.gmail;

export async function authenticateGmail(accessToken: string): Promise<AuthResponse> {
  const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return {
    accessToken,
    user: {
      email: data.email,
      name: data.name,
      picture: data.picture,
    },
  };
}

export async function fetchGmailEmails(accessToken: string): Promise<EmailThread[]> {
  const { data } = await axios.get(`${provider.apiEndpoint}/threads`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      maxResults: 20,
      q: 'in:inbox',
    },
  });

  return Promise.all(
    data.threads.map(async (thread: any) => {
      const { data: threadData } = await axios.get(
        `${provider.apiEndpoint}/threads/${thread.id}`,
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
        threatLevel: 'safe',
        provider: 'gmail'
      };
    })
  );
}