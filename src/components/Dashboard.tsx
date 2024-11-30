import React, { useEffect } from 'react';
import { Shield, AlertTriangle, Ban } from 'lucide-react';
import { User } from '../types/auth';
import { EmailList } from './EmailList';
import { useEmailStore } from '../store/emailStore';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const { threads, stats, loading, error, fetchThreads } = useEmailStore();

  useEffect(() => {
    const token = sessionStorage.getItem('email_sanitizer_token');
    if (token) {
      fetchThreads(token);
    }
  }, [fetchThreads]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <img
          src={user.picture}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Safe Emails</h3>
          </div>
          <p className="text-2xl font-bold text-green-900">{stats.safe}</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Suspicious</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-900">{stats.suspicious}</p>
        </div>

        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <Ban className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">Malicious</h3>
          </div>
          <p className="text-2xl font-bold text-red-900">{stats.malicious}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Emails</h3>
        </div>
        {error ? (
          <div className="p-4 text-center text-red-600">{error}</div>
        ) : loading ? (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <EmailList threads={threads} />
        )}
      </div>
    </div>
  );
};