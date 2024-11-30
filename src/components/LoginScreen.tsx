import React, { useState } from 'react';
import { Shield, Lock, Server } from 'lucide-react';
import { ProviderSelect } from './ProviderSelect';
import { AuthButton } from './AuthButton';
import { Spinner } from './Spinner';
import { PricingSection } from './PricingSection';
import { EmailProvider } from '../types/provider';

interface LoginScreenProps {
  onSuccess: (token: string, provider: EmailProvider) => void;
  loading?: boolean;
  error?: string | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onSuccess, 
  loading = false,
  error = null,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<EmailProvider | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 cyber-grid relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <Shield className="w-20 h-20 text-blue-400 relative" />
            </div>
            <Lock className="w-12 h-12 text-blue-400 animate-pulse" />
            <Server className="w-16 h-16 text-blue-400" />
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 mb-8 glow max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Email Sanitizer
            </h1>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-300 text-lg max-w-md">
                Protect your inbox with advanced AI-powered threat detection and real-time email sanitization
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Military-grade encryption</span>
                <span className="mx-2">•</span>
                <Lock className="w-4 h-4" />
                <span>Advanced threat detection</span>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 text-red-200 rounded-lg border border-red-700/50 backdrop-blur-xl max-w-md mx-auto">
              {error}
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Choose Your Email Provider
            </h2>
            <ProviderSelect 
              onSelect={(provider) => setSelectedProvider(provider)} 
            />
          </div>

          <div className="flex justify-center mb-16">
            {loading ? (
              <Spinner />
            ) : selectedProvider && (
              <AuthButton 
                provider={selectedProvider}
                onSuccess={(token) => onSuccess(token, selectedProvider)} 
                disabled={loading} 
              />
            )}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />
    </div>
  );
};