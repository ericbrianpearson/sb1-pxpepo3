import { ProviderConfig } from '../types/provider';

export const providers: Record<string, ProviderConfig> = {
  gmail: {
    id: 'gmail',
    name: 'Gmail',
    icon: 'mail',
    scopes: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.modify',
      'openid',
      'profile',
      'email'
    ],
    clientId: '1234567890-example.apps.googleusercontent.com',
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    apiEndpoint: 'https://gmail.googleapis.com/gmail/v1/users/me'
  },
  outlook: {
    id: 'outlook',
    name: 'Microsoft Outlook',
    icon: 'mail-check',
    scopes: [
      'Mail.Read',
      'Mail.ReadWrite',
      'User.Read',
      'openid',
      'profile',
      'email'
    ],
    clientId: 'your-outlook-client-id',
    authEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    apiEndpoint: 'https://graph.microsoft.com/v1.0/me'
  },
  yahoo: {
    id: 'yahoo',
    name: 'Yahoo Mail',
    icon: 'mail-plus',
    scopes: [
      'mail-r',
      'openid',
      'profile',
      'email'
    ],
    clientId: 'your-yahoo-client-id',
    authEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
    apiEndpoint: 'https://mail.yahooapis.com/v1/users'
  },
  imap: {
    id: 'imap',
    name: 'IMAP Server',
    icon: 'server',
    scopes: [],
    clientId: '',
    authEndpoint: '',
    apiEndpoint: '',
    manualConfig: true
  },
  pop3: {
    id: 'pop3',
    name: 'POP3 Server',
    icon: 'database',
    scopes: [],
    clientId: '',
    authEndpoint: '',
    apiEndpoint: '',
    manualConfig: true
  }
};