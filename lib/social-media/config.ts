import { SocialMediaConfig } from '@/types/social-media'

export function getSocialMediaConfig(): SocialMediaConfig {
  // Validate required environment variables
  const requiredEnvVars = [
    'YOUTUBE_API_KEY',
    'INSTAGRAM_CLIENT_ID',
    'INSTAGRAM_CLIENT_SECRET', 
    'INSTAGRAM_ACCESS_TOKEN',
    'TWITTER_BEARER_TOKEN',
    'TWITTER_API_KEY',
    'TWITTER_API_SECRET'
  ]

  const missing = requiredEnvVars.filter(envVar => !process.env[envVar])
  
  if (missing.length > 0) {
    console.warn(`Missing social media environment variables: ${missing.join(', ')}`)
  }

  return {
    youtube: {
      apiKey: process.env.YOUTUBE_API_KEY || '',
      channelId: process.env.YOUTUBE_CHANNEL_ID
    },
    instagram: {
      clientId: process.env.INSTAGRAM_CLIENT_ID || '',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '',
      accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || ''
    },
    twitter: {
      bearerToken: process.env.TWITTER_BEARER_TOKEN || '',
      apiKey: process.env.TWITTER_API_KEY || '',
      apiSecret: process.env.TWITTER_API_SECRET || '',
      userId: process.env.TWITTER_USER_ID
    },
    cache: {
      durationMinutes: parseInt(process.env.CACHE_DURATION_MINUTES || '15', 10)
    },
    api: {
      timeoutMs: parseInt(process.env.API_TIMEOUT_MS || '10000', 10),
      retryAttempts: parseInt(process.env.API_RETRY_ATTEMPTS || '3', 10)
    }
  }
}

export function validateSocialMediaConfig(config: SocialMediaConfig): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // YouTube validation
  if (!config.youtube.apiKey) {
    errors.push('YouTube API key is required')
  }

  // Instagram validation
  if (!config.instagram.clientId) {
    errors.push('Instagram client ID is required')
  }
  if (!config.instagram.clientSecret) {
    errors.push('Instagram client secret is required')
  }
  if (!config.instagram.accessToken) {
    errors.push('Instagram access token is required')
  }

  // Twitter validation
  if (!config.twitter.bearerToken) {
    errors.push('Twitter bearer token is required')
  }
  if (!config.twitter.apiKey) {
    errors.push('Twitter API key is required')
  }
  if (!config.twitter.apiSecret) {
    errors.push('Twitter API secret is required')
  }

  // Configuration validation
  if (config.cache.durationMinutes <= 0) {
    errors.push('Cache duration must be greater than 0')
  }
  if (config.api.timeoutMs <= 0) {
    errors.push('API timeout must be greater than 0')
  }
  if (config.api.retryAttempts < 0) {
    errors.push('API retry attempts must be 0 or greater')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}