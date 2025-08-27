import { AppConfig } from './types';
import { validateConfig } from './validation';

export function defineConfig(config: Partial<AppConfig>): AppConfig {
  const validatedConfig = validateConfig(config);
  
  return {
    server: {
      port: config.server?.port || 3000,
      host: config.server?.host || 'localhost',
      nodeEnv: process.env.NODE_ENV || 'development',
      cors: {
        origin: config.server?.cors?.origin || 'http://localhost:3000',
        credentials: config.server?.cors?.credentials || true,
        methods: config.server?.cors?.methods || ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: config.server?.cors?.allowedHeaders || ['Content-Type', 'Authorization']
      },
      rateLimiting: {
        windowMs: config.server?.rateLimiting?.windowMs || 15 * 60 * 1000, // 15 minutes
        maxRequests: config.server?.rateLimiting?.maxRequests || 100,
        skipSuccessfulRequests: config.server?.rateLimiting?.skipSuccessfulRequests || false,
        standardHeaders: config.server?.rateLimiting?.standardHeaders || true
      }
    },
    ...validatedConfig
  } as AppConfig;
}

export function mergeConfigs(base: Partial<AppConfig>, override: Partial<AppConfig>): AppConfig {
  // Deep merge implementation with proper type handling
  return Object.keys({ ...base, ...override }).reduce((merged, key) => {
    const baseValue = base[key as keyof AppConfig];
    const overrideValue = override[key as keyof AppConfig];
    
    if (typeof baseValue === 'object' && typeof overrideValue === 'object') {
      merged[key as keyof AppConfig] = { ...baseValue, ...overrideValue } as any;
    } else {
      merged[key as keyof AppConfig] = (overrideValue !== undefined ? overrideValue : baseValue) as any;
    }
    
    return merged;
  }, {} as AppConfig);
}
