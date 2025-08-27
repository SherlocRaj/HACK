import { AppConfig } from '../types';

const developmentConfig: Partial<AppConfig> = {
  server: {
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || 'localhost',
    nodeEnv: 'development',
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000'
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    },
    rateLimiting: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 1000, // Higher limit for development
      skipSuccessfulRequests: true,
      standardHeaders: true
    }
  },

  logging: {
    level: 'debug',
    format: 'combined',
    transports: [
      {
        type: 'console',
        level: 'debug'
      },
      {
        type: 'file',
        level: 'info',
        filename: 'logs/development.log',
        maxFiles: 5,
        maxSize: '10m'
      }
    ],
    audit: {
      enabled: true,
      retention: 7, // 7 days
      events: ['auth', 'api_call', 'error'],
      destinations: ['file']
    }
  },

  database: {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      db: 0,
      keyPrefix: 'dev:mcp:',
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true
    }
  },

  security: {
    headers: {
      hsts: false, // Disabled for development
      noSniff: true,
      xssProtection: true,
      frameguard: 'deny',
      contentTypeOptions: true
    },
    validation: {
      maxPayloadSize: '50mb',
      allowedMimeTypes: ['application/json', 'text/plain', 'multipart/form-data'],
      sanitization: true,
      strictValidation: false // More lenient for development
    }
  },

  apis: {
    caching: {
      defaultTtl: 300, // 5 minutes
      maxItems: 1000,
      checkPeriod: 600, // 10 minutes
      useClones: false
    }
  },

  monitoring: {
    metrics: {
      enabled: true,
      endpoint: '/metrics',
      interval: 5000, // 5 seconds
      labels: {
        environment: 'development',
        service: 'mcp-server'
      }
    },
    health: {
      enabled: true,
      endpoint: '/health',
      timeout: 5000,
      checks: ['redis', 'auth', 'apis']
    }
  }
};

export default developmentConfig;
