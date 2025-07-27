// Unified Social Post Model
export interface SocialPost {
  id: string
  platform: 'youtube' | 'instagram' | 'twitter'
  content: {
    text?: string
    title?: string
    imageUrl?: string
    thumbnailUrl?: string
  }
  author: {
    username: string
    displayName: string
    avatarUrl?: string
  }
  engagement: {
    likes?: number
    views?: number
    comments?: number
    shares?: number
  }
  timestamp: string
  url: string
  createdAt: Date
}

// YouTube API Response Types
export interface YouTubeVideo {
  id: string
  snippet: {
    title: string
    description: string
    thumbnails: {
      medium: { url: string }
      high?: { url: string }
    }
    publishedAt: string
    channelTitle: string
    channelId: string
  }
  statistics: {
    viewCount: string
    likeCount: string
    commentCount: string
  }
}

export interface YouTubeSearchResponse {
  items: Array<{
    id: { videoId: string }
    snippet: {
      title: string
      description: string
      thumbnails: {
        medium: { url: string }
      }
      publishedAt: string
      channelTitle: string
    }
  }>
  nextPageToken?: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
}

export interface YouTubeVideosResponse {
  items: YouTubeVideo[]
}

// Instagram API Response Types
export interface InstagramMedia {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  timestamp: string
  permalink: string
  username?: string
}

export interface InstagramMediaResponse {
  data: InstagramMedia[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

export interface InstagramUser {
  id: string
  username: string
  account_type: string
  media_count: number
}

// Twitter API Response Types
export interface TwitterTweet {
  id: string
  text: string
  created_at: string
  public_metrics: {
    retweet_count: number
    like_count: number
    reply_count: number
    quote_count: number
  }
  author_id: string
  attachments?: {
    media_keys: string[]
  }
}

export interface TwitterUser {
  id: string
  name: string
  username: string
  profile_image_url?: string
  verified?: boolean
}

export interface TwitterMedia {
  media_key: string
  type: 'photo' | 'video' | 'animated_gif'
  url?: string
  preview_image_url?: string
}

export interface TwitterTweetsResponse {
  data: TwitterTweet[]
  includes?: {
    users: TwitterUser[]
    media: TwitterMedia[]
  }
  meta: {
    result_count: number
    next_token?: string
  }
}

// API Client Interfaces
export interface RateLimitInfo {
  remaining: number
  reset: number
  limit: number
}

export interface APIClientConfig {
  apiKey?: string
  accessToken?: string
  clientId?: string
  clientSecret?: string
  bearerToken?: string
  timeout: number
  retryAttempts: number
}

export interface APIClient {
  fetchPosts(limit: number): Promise<SocialPost[]>
  isAuthenticated(): Promise<boolean>
  getRateLimit(): Promise<RateLimitInfo>
  validateCredentials(): Promise<boolean>
}

// Error Types
export interface APIError {
  code: string
  message: string
  status: number
  platform: string
  retryable: boolean
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
}

// Configuration Types
export interface SocialMediaConfig {
  youtube: {
    apiKey: string
    channelId?: string
  }
  instagram: {
    clientId: string
    clientSecret: string
    accessToken: string
  }
  twitter: {
    bearerToken: string
    apiKey: string
    apiSecret: string
    userId?: string
  }
  cache: {
    durationMinutes: number
  }
  api: {
    timeoutMs: number
    retryAttempts: number
  }
}