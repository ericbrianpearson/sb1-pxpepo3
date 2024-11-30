import ImapClient from 'emailjs-imap-client';
import { EmailThread } from '../../types/email';
import { ManualEmailConfig, AuthResponse } from '../../types/provider';

export async function authenticateImap(config: ManualEmailConfig): Promise<AuthResponse> {
  const client = new ImapClient(config.host, {
    auth: {
      user: config.username,
      pass: config.password,
    },
    port: config.port,
    useSecureTransport: config.secure,
  });

  try {
    await client.connect();
    await client.selectMailbox('INBOX');

    return {
      accessToken: Buffer.from(JSON.stringify(config)).toString('base64'),
      user: {
        email: config.username,
        name: config.username.split('@')[0],
        picture: '',
      },
    };
  } finally {
    client.close();
  }
}

export async function fetchImapEmails(config: ManualEmailConfig): Promise<EmailThread[]> {
  const client = new ImapClient(config.host, {
    auth: {
      user: config.username,
      pass: config.password,
    },
    port: config.port,
    useSecureTransport: config.secure,
  });

  try {
    await client.connect();
    const box = await client.selectMailbox('INBOX');
    const messages = await client.listMessages('INBOX', '1:20', ['uid', 'envelope', 'body[]']);

    return messages.map((message: any) => ({
      id: message.uid,
      snippet: message.body?.substring(0, 100) || '',
      subject: message.envelope.subject || 'No Subject',
      from: message.envelope.from[0].address,
      date: message.envelope.date,
      labels: [],
      threatLevel: 'safe',
      provider: 'imap'
    }));
  } finally {
    client.close();
  }
}