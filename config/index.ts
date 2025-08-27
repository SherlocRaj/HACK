import dotenv from 'dotenv';
import { AppConfig } from './types';
import { defineConfig, mergeConfigs } from './defineConfig';
import { validateEnvironmentVariables } from './validation';

// Load environment variables
dotenv.config();

// Validate required environment variables
validateEnvironmentVariables();

// Import environment-specific configurations
import developmentConfig from './environments/development';
import stagingConfig from './environments/staging';
import productionConfig from './environments/production';
import testConfig from './environments/test';

// Import module configurations
import appConfig from './modules/app.config';
import authConfig from './modules/auth.config';
import databaseConfig from './modules/database.config';
import loggingConfig from './modules/logging.config';
import securityConfig from './modules/security.config';
import apiConfig from './modules/api.config';
import monitoringConfig from './modules/monitoring.config';

// Determine current environment
const nodeEnv = process.env.NODE_ENV || 'development';

// Select environment-specific config
const environmentConfigs = {
  development: developmentConfig,
  staging: stagingConfig,
  production: productionConfig,
  test: testConfig
};

const envConfig = environmentConfigs[nodeEnv as keyof typeof environmentConfigs] || developmentConfig;

// Merge base configuration with environment-specific overrides
const baseConfig: Partial<AppConfig> = {
  server: appConfig.server,
  auth: authConfig,
  database: databaseConfig,
  logging: loggingConfig,
  security: securityConfig,
  apis: apiConfig,
  monitoring: monitoringConfig
};

// Create final configuration
const config = defineConfig(mergeConfigs(baseConfig, envConfig));

// Export configuration and utilities
export default config;
export { AppConfig } from './types';
export { defineConfig } from './defineConfig';

// Export individual config modules for direct access
export {
  appConfig,
  authConfig,
  databaseConfig,
  loggingConfig,
  securityConfig,
  apiConfig,
  monitoringConfig
};

// Configuration helpers
export function getConfig(): AppConfig {
  return config;
}

export function isProduction(): boolean {
  return config.server.nodeEnv === 'production';
}

export function isDevelopment(): boolean {
  return config.server.nodeEnv === 'development';
}

export function isTest(): boolean {
  return config.server.nodeEnv === 'test';
}
