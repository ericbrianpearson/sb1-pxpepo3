import axios from 'axios';
import { EmailThread } from '../../types/email';
import { AuthResponse } from '../../types/provider';
import { providers } from '../../config/providers';

const provider = providers.yahoo;

export async function authenticateYahoo(accessToken: string): Promise<AuthResponse> {
  const { data } = await axios.get(`${provider.apiEndpoint}/me/userinfo`, {
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

export async function fetchYahooEmails(accessToken: string): Promise<EmailThread[]> {
  const { data } = await axios.get(`${provider.apiEndpoint}/me/messages`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      limit: 20,
      folderId: 'Inbox',
    },
  });

  return data.messages.map((message: any) => ({
    id: message.id,
    snippet: message.preview,
    subject: message.subject || 'No Subject',
    from: message.from.email,
    date: message.receivedDate,
    labels: message.flags || [],
    threatLevel: 'safe',
    provider: 'yahoo'
  }));
}