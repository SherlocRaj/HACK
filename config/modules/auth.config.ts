import { AuthConfig } from '../types';

const authConfig: AuthConfig = {
  descope: {
    projectId: process.env.DESCOPE_PROJECT_ID!,
    managementKey: process.env.DESCOPE_MANAGEMENT_KEY!,
    baseUrl: process.env.DESCOPE_BASE_URL || 'https://api.descope.com',
    timeout: parseInt(process.env.DESCOPE_TIMEOUT || '10000')
  },

  jwt: {
    issuer: process.env.JWT_ISSUER || 'secure-mcp-server',
    audience: process.env.JWT_AUDIENCE || 'mcp-client',
    algorithm: (process.env.JWT_ALGORITHM as 'HS256' | 'RS256' | 'ES256') || 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },

  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback',
      scopes: [
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    },

    slack: {
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
      redirectUri: process.env.SLACK_REDIRECT_URI || 'http://localhost:3000/auth/slack/callback',
      scopes: [
        'search:read',
        'channels:read',
        'chat:write',
        'users:read',
        'files:read'
      ]
    },

    notion: {
      clientId: process.env.NOTION_CLIENT_ID!,
      clientSecret: process.env.NOTION_CLIENT_SECRET!,
      redirectUri: process.env.NOTION_REDIRECT_URI || 'http://localhost:3000/auth/notion/callback',
      scopes: [
        'read_content',
        'read_user_with_email'
      ]
    }
  },

  session: {
    secret: process.env.SESSION_SECRET!,
    maxAge: parseInt(process.env.SESSION_MAX_AGE || '3600000'), // 1 hour
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: (process.env.SESSION_SAME_SITE as 'strict' | 'lax' | 'none') || 'strict'
  }
};

export default authConfig;
