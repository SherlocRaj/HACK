// Type definitions for all configuration objects
export interface AppConfig {
  server: ServerConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  logging: LoggingConfig;
  security: SecurityConfig;
  apis: ApiConfig;
  monitoring: MonitoringConfig;
}

export interface ServerConfig {
  port: number;
  host: string;
  nodeEnv: string;
  cors: CorsConfig;
  rateLimiting: RateLimitConfig;
}

export interface CorsConfig {
  origin: string | string[];
  credentials: boolean;
  methods: string[];
  allowedHeaders: string[];
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests: boolean;
  standardHeaders: boolean;
}

export interface AuthConfig {
  descope: DescopeConfig;
  jwt: JwtConfig;
  oauth: OAuthConfig;
  session: SessionConfig;
}

export interface DescopeConfig {
  projectId: string;
  managementKey: string;
  baseUrl: string;
  timeout: number;
}

export interface JwtConfig {
  issuer: string;
  audience: string;
  algorithm: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

export interface OAuthConfig {
  google: GoogleOAuthConfig;
  slack: SlackOAuthConfig;
  notion: NotionOAuthConfig;
}

export interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface SlackOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface NotionOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface SessionConfig {
  secret: string;
  maxAge: number;
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'strict' | 'lax' | 'none';
}

export interface DatabaseConfig {
  redis: RedisConfig;
  connectionPool: ConnectionPoolConfig;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
  keyPrefix: string;
  retryDelayOnFailover: number;
  maxRetriesPerRequest: number;
  lazyConnect: boolean;
}

export interface ConnectionPoolConfig {
  min: number;
  max: number;
  acquireTimeoutMillis: number;
  idleTimeoutMillis: number;
}

export interface LoggingConfig {
  level: string;
  format: string;
  transports: LogTransportConfig[];
  audit: AuditLogConfig;
}

export interface LogTransportConfig {
  type: 'console' | 'file' | 'rotate' | 'elasticsearch';
  level?: string;
  filename?: string;
  maxFiles?: number;
  maxSize?: string;
  endpoint?: string;
}

export interface AuditLogConfig {
  enabled: boolean;
  retention: number;
  events: string[];
  destinations: string[];
}

export interface SecurityConfig {
  encryption: EncryptionConfig;
  headers: SecurityHeadersConfig;
  validation: ValidationConfig;
  policies: SecurityPoliciesConfig;
}

export interface EncryptionConfig {
  algorithm: string;
  keyLength: number;
  ivLength: number;
  saltLength: number;
}

export interface SecurityHeadersConfig {
  hsts: boolean;
  noSniff: boolean;
  xssProtection: boolean;
  frameguard: string;
  contentTypeOptions: boolean;
}

export interface ValidationConfig {
  maxPayloadSize: string;
  allowedMimeTypes: string[];
  sanitization: boolean;
  strictValidation: boolean;
}

export interface SecurityPoliciesConfig {
  maxLoginAttempts: number;
  lockoutDuration: number;
  passwordMinLength: number;
  requireMfa: boolean;
}

export interface ApiConfig {
  google: GoogleApiConfig;
  slack: SlackApiConfig;
  notion: NotionApiConfig;
  caching: CachingConfig;
}

export interface GoogleApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  backoffFactor: number;
  quotaLimits: QuotaConfig;
}

export interface SlackApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  backoffFactor: number;
  quotaLimits: QuotaConfig;
}

export interface NotionApiConfig {
  baseUrl: string;
  version: string;
  timeout: number;
  retries: number;
  backoffFactor: number;
  quotaLimits: QuotaConfig;
}

export interface QuotaConfig {
  requestsPerMinute: number;
  requestsPerHour: number;
  burstLimit: number;
}

export interface CachingConfig {
  defaultTtl: number;
  maxItems: number;
  checkPeriod: number;
  useClones: boolean;
}

export interface MonitoringConfig {
  metrics: MetricsConfig;
  health: HealthCheckConfig;
  alerting: AlertingConfig;
}

export interface MetricsConfig {
  enabled: boolean;
  endpoint: string;
  interval: number;
  labels: Record<string, string>;
}

export interface HealthCheckConfig {
  enabled: boolean;
  endpoint: string;
  timeout: number;
  checks: string[];
}

export interface AlertingConfig {
  enabled: boolean;
  channels: AlertChannelConfig[];
  thresholds: AlertThresholdConfig;
}

export interface AlertChannelConfig {
  type: 'slack' | 'email' | 'webhook';
  endpoint: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface AlertThresholdConfig {
  errorRate: number;
  responseTime: number;
  memoryUsage: number;
  cpuUsage: number;
}
