export interface EmailThread {
  id: string;
  snippet: string;
  subject: string;
  from: string;
  date: string;
  threatLevel: 'safe' | 'suspicious' | 'malicious';
  labels: string[];
}

export interface EmailStats {
  safe: number;
  suspicious: number;
  malicious: number;
}

export interface EmailState {
  threads: EmailThread[];
  stats: EmailStats;
  loading: boolean;
  error: string | null;
}