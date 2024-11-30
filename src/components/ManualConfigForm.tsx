import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Server, Lock, User, Globe, KeyRound } from 'lucide-react';
import { ManualEmailConfig } from '../types/provider';

const schema = z.object({
  host: z.string().min(1, 'Host is required'),
  port: z.number().min(1, 'Port is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  secure: z.boolean(),
  protocol: z.enum(['imap', 'pop3'])
});

interface ManualConfigFormProps {
  protocol: 'imap' | 'pop3';
  onSubmit: (config: ManualEmailConfig) => void;
  loading?: boolean;
}

export const ManualConfigForm: React.FC<ManualConfigFormProps> = ({
  protocol,
  onSubmit,
  loading = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ManualEmailConfig>({
    resolver: zodResolver(schema),
    defaultValues: {
      protocol,
      secure: true,
      port: protocol === 'imap' ? 993 : 995
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-300">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4" />
            <span>Server Host</span>
          </div>
          <input
            type="text"
            {...register('host')}
            placeholder="mail.example.com"
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white
              focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        {errors.host && (
          <p className="mt-1 text-sm text-red-500">{errors.host.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-4 h-4" />
            <span>Port</span>
          </div>
          <input
            type="number"
            {...register('port', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white
              focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        {errors.port && (
          <p className="mt-1 text-sm text-red-500">{errors.port.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4" />
            <span>Username</span>
          </div>
          <input
            type="text"
            {...register('username')}
            placeholder="user@example.com"
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white
              focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          <div className="flex items-center gap-2 mb-1">
            <KeyRound className="w-4 h-4" />
            <span>Password</span>
          </div>
          <input
            type="password"
            {...register('password')}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white
              focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Lock className="w-4 h-4 text-gray-300" />
        <label className="text-sm font-medium text-gray-300">
          <input
            type="checkbox"
            {...register('secure')}
            className="mr-2 rounded bg-gray-800 border-gray-700 text-blue-500
              focus:ring-blue-500"
          />
          Use SSL/TLS
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md
          ${loading
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-500'
          } text-white transition-colors duration-200`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Server className="w-4 h-4" />
            <span>Connect to Server</span>
          </>
        )}
      </button>
    </form>
  );
};