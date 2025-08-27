
import Joi from 'joi';
import { AppConfig } from './types';

const configSchema = Joi.object({
  server: Joi.object({
    port: Joi.number().port().required(),
    host: Joi.string().hostname().required(),
    nodeEnv: Joi.string().valid('development', 'staging', 'production', 'test').required(),
    cors: Joi.object({
      origin: Joi.alternatives().try(
        Joi.string().uri(),
        Joi.array().items(Joi.string().uri())
      ).required(),
      credentials: Joi.boolean().required(),
      methods: Joi.array().items(Joi.string()).required(),
      allowedHeaders: Joi.array().items(Joi.string()).required()
    }).required(),
    rateLimiting: Joi.object({
      windowMs: Joi.number().positive().required(),
      maxRequests: Joi.number().positive().required(),
      skipSuccessfulRequests: Joi.boolean().required(),
      standardHeaders: Joi.boolean().required()
    }).required()
  }).required(),

  auth: Joi.object({
    descope: Joi.object({
      projectId: Joi.string().required(),
      managementKey: Joi.string().required(),
      baseUrl: Joi.string().uri().required(),
      timeout: Joi.number().positive().required()
    }).required(),
    
    jwt: Joi.object({
      issuer: Joi.string().required(),
      audience: Joi.string().required(),
      algorithm: Joi.string().valid('HS256', 'RS256', 'ES256').required(),
      expiresIn: Joi.string().required(),
      refreshExpiresIn: Joi.string().required()
    }).required(),

    oauth: Joi.object({
      google: Joi.object({
        clientId: Joi.string().required(),
        clientSecret: Joi.string().required(),
        redirectUri: Joi.string().uri().required(),
        scopes: Joi.array().items(Joi.string()).required()
      }).required(),
      
      slack: Joi.object({
        clientId: Joi.string().required(),
        clientSecret: Joi.string().required(),
        redirectUri: Joi.string().uri().required(),
        scopes: Joi.array().items(Joi.string()).required()
      }).required(),
      
      notion: Joi.object({
        clientId: Joi.string().required(),
        clientSecret: Joi.string().required(),
        redirectUri: Joi.string().uri().required(),
        scopes: Joi.array().items(Joi.string()).required()
      }).required()
    }).required(),

    session: Joi.object({
      secret: Joi.string().min(32).required(),
      maxAge: Joi.number().positive().required(),
      secure: Joi.boolean().required(),
      httpOnly: Joi.boolean().required(),
      sameSite: Joi.string().valid('strict', 'lax', 'none').required()
    }).required()
  }).required(),

  database: Joi.object({
    redis: Joi.object({
      host: Joi.string().hostname().required(),
      port: Joi.number().port().required(),
      password: Joi.string().optional(),
      db: Joi.number().min(0).max(15).required(),
      keyPrefix: Joi.string().required(),
      retryDelayOnFailover: Joi.number().positive().required(),
      maxRetriesPerRequest: Joi.number().positive().required(),
      lazyConnect: Joi.boolean().required()
    }).required()
  }).required(),

  // Additional validation schemas for other config sections...
});

export function validateConfig(config: Partial<AppConfig>): Partial<AppConfig> {
  const { error, value } = configSchema.validate(config, {
    allowUnknown: false,
    abortEarly: false
  });

  if (error) {
    const errorMessages = error.details.map(detail => detail.message).join(', ');
    throw new Error(`Configuration validation failed: ${errorMessages}`);
  }

  return value;
}

export function validateEnvironmentVariables(): void {
  const requiredEnvVars = [
    'DESCOPE_PROJECT_ID',
    'DESCOPE_MANAGEMENT_KEY',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'SLACK_CLIENT_ID',
    'SLACK_CLIENT_SECRET',
    'NOTION_CLIENT_ID',
    'NOTION_CLIENT_SECRET',
    'REDIS_HOST',
    'JWT_SECRET',
    'SESSION_SECRET'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}
