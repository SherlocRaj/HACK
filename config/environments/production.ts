import { AppConfig } from '../types';

const productionConfig: Partial<AppConfig> = {
  server: {
    port: parseInt(process.env.PORT || '8080'),
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: 'production',
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://your-production-domain.com'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    },
    rateLimiting: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100, // Stricter limits for production
      skipSuccessfulRequests: false,
      standardHeaders: true
    }
  },

  logging: {
    level: 'info',
    format: 'json',
    transports: [
      {
        type: 'console',
        level: 'warn'
      },
      {
        type: 'rotate',
        level: 'info',
        filename: 'logs/production-%DATE%.log',
        maxFiles: 30,
        maxSize: '100m'
      },
      {
        type: 'elasticsearch',
        level: 'error',
        endpoint: process.env.ELASTICSEARCH_URL
      }
    ],
    audit: {
      enabled: true,
      retention: 90, // 90 days for compliance
      events: ['auth', 'api_call', 'error', 'security'],
      destinations: ['elasticsearch', 'file']
    }
  },

  database: {
    redis: {
      host: process.env.REDIS_HOST!,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
      keyPrefix: 'prod:mcp:',
      retryDelayOnFailover: 500,
      maxRetriesPerRequest: 5,
      lazyConnect: false
    }
  },

  security: {
    headers: {
      hsts: true,
      noSniff: true,
      xssProtection: true,
      frameguard: 'deny',
      contentTypeOptions: true
    },
    validation: {
      maxPayloadSize: '10mb',
      allowedMimeTypes: ['application/json'],
      sanitization: true,
      strictValidation: true
    },
    policies: {
      maxLoginAttempts: 5,
      lockoutDuration: 900000, // 15 minutes
      passwordMinLength: 12,
      requireMfa: true
    }
  },

  apis: {
    caching: {
      defaultTtl: 1800, // 30 minutes
      maxItems: 10000,
      checkPeriod: 1800,
      useClones: true
    }
  },

  monitoring: {
    metrics: {
      enabled: true,
      endpoint: '/metrics',
      interval: 30000, // 30 seconds
      labels: {
        environment: 'production',
        service: 'mcp-server',
        region: process.env.AWS_REGION || 'us-east-1'
      }
    },
    health: {
      enabled: true,
      endpoint: '/health',
      timeout: 10000,
      checks: ['redis', 'auth', 'apis', 'external-services']
    },
    alerting: {
      enabled: true,
      channels: [
        {
          type: 'slack',
          endpoint: process.env.SLACK_WEBHOOK_URL!,
          severity: 'high'
        },
        {
          type: 'email',
          endpoint: process.env.ALERT_EMAIL!,
          severity: 'critical'
        }
      ],
      thresholds: {
        errorRate: 0.05, // 5%
        responseTime: 2000, // 2 seconds
        memoryUsage: 0.85, // 85%
        cpuUsage: 0.80 // 80%
      }
    }
  }
};

export default productionConfig;
