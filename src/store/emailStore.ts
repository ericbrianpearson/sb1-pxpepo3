import { create } from 'zustand';
import { EmailState, EmailThread } from '../types/email';
import { fetchEmails, analyzeEmail } from '../services/emailService';

interface EmailStore extends EmailState {
  fetchThreads: (accessToken: string) => Promise<void>;
  updateStats: () => void;
}

const initialStats = {
  safe: 0,
  suspicious: 0,
  malicious: 0,
};

export const useEmailStore = create<EmailStore>((set, get) => ({
  threads: [],
  stats: initialStats,
  loading: false,
  error: null,

  fetchThreads: async (accessToken: string) => {
    set({ loading: true, error: null });
    try {
      const threads = await fetchEmails(accessToken);
      const analyzedThreads = await Promise.all(
        threads.map(thread => analyzeEmail(thread))
      );
      set({ threads: analyzedThreads, loading: false });
      get().updateStats();
    } catch (error) {
      set({ 
        error: 'Failed to fetch emails. Please try again.',
        loading: false 
      });
    }
  },

  updateStats: () => {
    const threads = get().threads;
    const stats = threads.reduce((acc, thread) => {
      acc[thread.threatLevel]++;
      return acc;
    }, { ...initialStats });
    set({ stats });
  },
}));