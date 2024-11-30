import React from 'react';

export const Spinner: React.FC = () => (
  <div className="flex items-center gap-2">
    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
    <span className="text-blue-400">Securing connection...</span>
  </div>
);