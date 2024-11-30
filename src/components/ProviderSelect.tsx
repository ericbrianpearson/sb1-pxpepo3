import React from 'react';
import { Mail, MailCheck, MailPlus } from 'lucide-react';
import { providers } from '../config/providers';
import { EmailProvider } from '../types/provider';

interface ProviderSelectProps {
  onSelect: (provider: EmailProvider) => void;
}

const ProviderIcon = ({ id }: { id: EmailProvider }) => {
  switch (id) {
    case 'gmail':
      return <Mail className="w-6 h-6" />;
    case 'outlook':
      return <MailCheck className="w-6 h-6" />;
    case 'yahoo':
      return <MailPlus className="w-6 h-6" />;
    default:
      return <Mail className="w-6 h-6" />;
  }
};

export const ProviderSelect: React.FC<ProviderSelectProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
      {Object.values(providers).map((provider) => (
        <button
          key={provider.id}
          onClick={() => onSelect(provider.id as EmailProvider)}
          className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300
            bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-xl
            border border-gray-700 hover:border-blue-500
            group hover:scale-105 transform"
        >
          <div className="p-2 rounded-lg bg-gray-700 group-hover:bg-blue-500/20">
            <ProviderIcon id={provider.id as EmailProvider} />
          </div>
          <span className="font-medium text-white">{provider.name}</span>
        </button>
      ))}
    </div>
  );
};