import axios from 'axios';
import { EmailThread } from '../../types/email';
import { AuthResponse } from '../../types/provider';
import { providers } from '../../config/providers';

const provider = providers.outlook;

export async function authenticateOutlook(accessToken: string): Promise<AuthResponse> {
  const { data } = await axios.get(`${provider.apiEndpoint}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return {
    accessToken,
    user: {
      email: data.userPrincipalName,
      name: data.displayName,
      picture: '', // Microsoft Graph API requires additional permissions for photo
    },
  };
}

export async function fetchOutlookEmails(accessToken: string): Promise<EmailThread[]> {
  const { data } = await axios.get(`${provider.apiEndpoint}/messages`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      $top: 20,
      $select: 'id,subject,bodyPreview,from,receivedDateTime,categories',
    },
  });

  return data.value.map((message: any) => ({
    id: message.id,
    snippet: message.bodyPreview,
    subject: message.subject || 'No Subject',
    from: message.from.emailAddress.address,
    date: message.receivedDateTime,
    labels: message.categories || [],
    threatLevel: 'safe',
    provider: 'outlook'
  }));
}