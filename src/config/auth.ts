export const AUTH_CONFIG = {
  clientId: '1234567890-example.apps.googleusercontent.com', // Replace with your actual Google Client ID
  scopes: {
    gmail: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.modify',
      'openid',
      'profile',
      'email'
    ]
  },
  endpoints: {
    userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo'
  }
};