import { ApiConfig } from '../types';

const apiConfig: ApiConfig = {
  google: {
    baseUrl: 'https://www.googleapis.com',
    timeout: parseInt(process.env.GOOGLE_API_TIMEOUT || '30000'),
    retries: parseInt(process.env.GOOGLE_API_RETRIES || '3'),
    backoffFactor: parseFloat(process.env.GOOGLE_API_BACKOFF_FACTOR || '2'),
    quotaLimits: {
      requestsPerMinute: parseInt(process.env.GOOGLE_REQUESTS_PER_MINUTE || '100'),
      requestsPerHour: parseInt(process.env.GOOGLE_REQUESTS_PER_HOUR || '10000'),
      burstLimit: parseInt(process.env.GOOGLE_BURST_LIMIT || '10')
    }
  },

  slack: {
    baseUrl: 'https://slack.com/api',
    timeout: parseInt(process.env.SLACK_API_TIMEOUT || '30000'),
    retries: parseInt(process.env.SLACK_API_RETRIES || '3'),
    backoffFactor: parseFloat(process.env.SLACK_API_BACKOFF_FACTOR || '2'),
    quotaLimits: {
      requestsPerMinute: parseInt(process.env.SLACK_REQUESTS_PER_MINUTE || '60'),
      requestsPerHour: parseInt(process.env.SLACK_REQUESTS_PER_HOUR || '1000'),
      burstLimit: parseInt(process.env.SLACK_BURST_LIMIT || '5')
    }
  },

  notion: {
    baseUrl: 'https://api.notion.com',
    version: '2022-06-28',
    timeout: parseInt(process.env.NOTION_API_TIMEOUT || '30000'),
    retries: parseInt(process.env.NOTION_API_RETRIES || '3'),
    backoffFactor: parseFloat(process.env.NOTION_API_BACKOFF_FACTOR || '2'),
    quotaLimits: {
      requestsPerMinute: parseInt(process.env.NOTION_REQUESTS_PER_MINUTE || '3'),
      requestsPerHour: parseInt(process.env.NOTION_REQUESTS_PER_HOUR || '1000'),
      burstLimit: parseInt(process.env.NOTION_BURST_LIMIT || '1')
    }
  },

  caching: {
    defaultTtl: parseInt(process.env.CACHE_DEFAULT_TTL || '600'), // 10 minutes
    maxItems: parseInt(process.env.CACHE_MAX_ITEMS || '5000'),
    checkPeriod: parseInt(process.env.CACHE_CHECK_PERIOD || '600'),
    useClones: process.env.CACHE_USE_CLONES === 'true'
  }
};

export default apiConfig;
