import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useMsal } from '@azure/msal-react';
import { Mail, Shield } from 'lucide-react';
import { providers } from '../config/providers';
import { EmailProvider } from '../types/provider';

interface AuthButtonProps {
  provider: EmailProvider;
  onSuccess: (token: string) => void;
  disabled?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ 
  provider, 
  onSuccess, 
  disabled 
}) => {
  const { instance } = useMsal();
  const providerConfig = providers[provider];

  const handleOutlookLogin = async () => {
    try {
      const response = await instance.loginPopup({
        scopes: providerConfig.scopes,
      });
      onSuccess(response.accessToken);
    } catch (error) {
      console.error('Outlook login error:', error);
    }
  };

  const handleYahooLogin = () => {
    window.location.href = `${providerConfig.authEndpoint}?` +
      `client_id=${providerConfig.clientId}&` +
      `redirect_uri=${window.location.origin}/auth/callback&` +
      `response_type=token&` +
      `scope=${providerConfig.scopes.join(' ')}`;
  };

  const login = useGoogleLogin({
    onSuccess: (response) => onSuccess(response.access_token),
    scope: providerConfig.scopes.join(' '),
    flow: 'implicit',
  });

  const handleLogin = () => {
    switch (provider) {
      case 'gmail':
        login();
        break;
      case 'outlook':
        handleOutlookLogin();
        break;
      case 'yahoo':
        handleYahooLogin();
        break;
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={disabled}
      className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 
        ${disabled 
          ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 transform'
        }
        backdrop-blur-xl shadow-lg hover:shadow-blue-500/25`}
    >
      <Mail className="w-5 h-5" />
      <span className="font-medium">Secure Sign in with {providerConfig.name}</span>
      <Shield className="w-4 h-4 ml-2" />
    </button>
  );
};