export type EmailProvider = 'gmail' | 'outlook' | 'yahoo' | 'imap' | 'pop3';

export interface ProviderConfig {
  id: EmailProvider;
  name: string;
  icon: string;
  scopes: string[];
  clientId: string;
  authEndpoint: string;
  apiEndpoint: string;
  manualConfig?: boolean;
}

export interface ManualEmailConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  secure: boolean;
  protocol: 'imap' | 'pop3';
}

export interface AuthResponse {
  accessToken: string;
  user: {
    email: string;
    name: string;
    picture: string;
  };
}