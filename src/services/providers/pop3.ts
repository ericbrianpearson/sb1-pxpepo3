import POP3Client from 'poplib';
import { EmailThread } from '../../types/email';
import { ManualEmailConfig, AuthResponse } from '../../types/provider';

export async function authenticatePop3(config: ManualEmailConfig): Promise<AuthResponse> {
  return new Promise((resolve, reject) => {
    const client = new POP3Client(config.port, config.host, {
      tlserrs: false,
      enabletls: config.secure,
      debug: false,
    });

    client.on('error', (err: Error) => {
      client.quit();
      reject(err);
    });

    client.on('connect', () => {
      client.login(config.username, config.password)
        .then(() => {
          client.quit();
          resolve({
            accessToken: Buffer.from(JSON.stringify(config)).toString('base64'),
            user: {
              email: config.username,
              name: config.username.split('@')[0],
              picture: '',
            },
          });
        })
        .catch((err: Error) => {
          client.quit();
          reject(err);
        });
    });
  });
}

export async function fetchPop3Emails(config: ManualEmailConfig): Promise<EmailThread[]> {
  return new Promise((resolve, reject) => {
    const client = new POP3Client(config.port, config.host, {
      tlserrs: false,
      enabletls: config.secure,
      debug: false,
    });

    const emails: EmailThread[] = [];

    client.on('error', (err: Error) => {
      client.quit();
      reject(err);
    });

    client.on('connect', () => {
      client.login(config.username, config.password)
        .then(() => client.list())
        .then((messages: any[]) => {
          const promises = messages.slice(0, 20).map((msg) =>
            client.retr(msg.number).then((email: any) => {
              const headers = parseEmailHeaders(email);
              emails.push({
                id: msg.number.toString(),
                snippet: email[1]?.substring(0, 100) || '',
                subject: headers.subject || 'No Subject',
                from: headers.from || '',
                date: headers.date || new Date().toISOString(),
                labels: [],
                threatLevel: 'safe',
                provider: 'pop3'
              });
            })
          );
          return Promise.all(promises);
        })
        .then(() => {
          client.quit();
          resolve(emails);
        })
        .catch((err: Error) => {
          client.quit();
          reject(err);
        });
    });
  });
}

function parseEmailHeaders(email: string[]): Record<string, string> {
  const headers: Record<string, string> = {};
  for (const line of email) {
    const match = line.match(/^([\w-]+):\s*(.+)$/i);
    if (match) {
      headers[match[1].toLowerCase()] = match[2];
    }
  }
  return headers;
}