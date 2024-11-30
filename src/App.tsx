import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { Layout } from './components/Layout';
import { useAuth } from './hooks/useAuth';
import { AUTH_CONFIG } from './config/auth';

function App() {
  const { auth, handleAuthSuccess } = useAuth();

  return (
    <GoogleOAuthProvider clientId={AUTH_CONFIG.clientId}>
      <Layout>
        {!auth.isAuthenticated ? (
          <LoginScreen 
            onSuccess={handleAuthSuccess}
            loading={auth.loading}
            error={auth.error}
          />
        ) : (
          auth.user && <Dashboard user={auth.user} />
        )}
      </Layout>
    </GoogleOAuthProvider>
  );
}

export default App;