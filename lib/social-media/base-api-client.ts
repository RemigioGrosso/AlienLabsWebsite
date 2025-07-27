import { APIClient, APIClientConfig, APIError as APIErrorType, RateLimitInfo, SocialPost } from '@/types/social-media'

export abstract class BaseAPIClient implements APIClient {
  protected config: APIClientConfig
  protected platform: string
  protected baseUrl: string
  private rateLimitInfo: RateLimitInfo = {
    remaining: 1000,
    reset: Date.now() + 3600000, // 1 hour from now
    limit: 1000
  }

  constructor(config: APIClientConfig, platform: string, baseUrl: string) {
    this.config = config
    this.platform = platform
    this.baseUrl = baseUrl
  }

  abstract fetchPosts(limit: number): Promise<SocialPost[]>
  abstract isAuthenticated(): Promise<boolean>
  abstract validateCredentials(): Promise<boolean>

  async getRateLimit(): Promise<RateLimitInfo> {
    return this.rateLimitInfo
  }

  protected async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      // Check rate limit before making request
      if (this.rateLimitInfo.remaining <= 0 && Date.now() < this.rateLimitInfo.reset) {
        throw new SocialAPIError({
          code: 'RATE_LIMIT_EXCEEDED',
          message: `Rate limit exceeded for ${this.platform}. Reset at ${new Date(this.rateLimitInfo.reset)}`,
          status: 429,
          platform: this.platform,
          retryable: true
        })
      }

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      })

      clearTimeout(timeoutId)

      // Update rate limit info from response headers
      this.updateRateLimitFromHeaders(response.headers)

      if (!response.ok) {
        throw new SocialAPIError({
          code: this.getErrorCode(response.status),
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          platform: this.platform,
          retryable: this.isRetryableStatus(response.status)
        })
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof SocialAPIError) {
        throw error
      }

      if ((error as any)?.name === 'AbortError') {
        throw new SocialAPIError({
          code: 'TIMEOUT',
          message: `Request timeout after ${this.config.timeout}ms`,
          status: 408,
          platform: this.platform,
          retryable: true
        })
      }

      throw new SocialAPIError({
        code: 'NETWORK_ERROR',
        message: (error as any)?.message || 'Network request failed',
        status: 0,
        platform: this.platform,
        retryable: true
      })
    }
  }

  protected async makeRequestWithRetry<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    let lastError: SocialAPIError

    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        return await this.makeRequest<T>(endpoint, options)
      } catch (error) {
        lastError = error as SocialAPIError
        
        if (!lastError.retryable || attempt === this.config.retryAttempts) {
          throw lastError
        }

        // Exponential backoff with jitter
        const baseDelay = Math.pow(2, attempt - 1) * 1000 // 1s, 2s, 4s, 8s...
        const jitter = Math.random() * 1000 // 0-1s random jitter
        const delay = baseDelay + jitter

        console.warn(`${this.platform} API request failed (attempt ${attempt}/${this.config.retryAttempts}). Retrying in ${Math.round(delay)}ms...`, {
          error: lastError.message,
          endpoint
        })

        await this.sleep(delay)
      }
    }

    throw lastError!
  }

  private updateRateLimitFromHeaders(headers: Headers): void {
    // Common rate limit headers across platforms
    const remaining = headers.get('x-ratelimit-remaining') || 
                     headers.get('x-rate-limit-remaining') ||
                     headers.get('ratelimit-remaining')
    
    const reset = headers.get('x-ratelimit-reset') || 
                  headers.get('x-rate-limit-reset') ||
                  headers.get('ratelimit-reset')
    
    const limit = headers.get('x-ratelimit-limit') || 
                  headers.get('x-rate-limit-limit') ||
                  headers.get('ratelimit-limit')

    if (remaining) this.rateLimitInfo.remaining = parseInt(remaining, 10)
    if (reset) this.rateLimitInfo.reset = parseInt(reset, 10) * 1000 // Convert to milliseconds
    if (limit) this.rateLimitInfo.limit = parseInt(limit, 10)
  }

  private getErrorCode(status: number): string {
    switch (status) {
      case 400: return 'BAD_REQUEST'
      case 401: return 'UNAUTHORIZED'
      case 403: return 'FORBIDDEN'
      case 404: return 'NOT_FOUND'
      case 429: return 'RATE_LIMIT_EXCEEDED'
      case 500: return 'INTERNAL_SERVER_ERROR'
      case 502: return 'BAD_GATEWAY'
      case 503: return 'SERVICE_UNAVAILABLE'
      case 504: return 'GATEWAY_TIMEOUT'
      default: return 'UNKNOWN_ERROR'
    }
  }

  private isRetryableStatus(status: number): boolean {
    // Retry on server errors and rate limits, but not client errors
    return status >= 500 || status === 429 || status === 408
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  protected validateRequiredConfig(requiredFields: string[]): void {
    const missing = requiredFields.filter(field => !this.config[field as keyof APIClientConfig])
    
    if (missing.length > 0) {
      throw new SocialAPIError({
        code: 'MISSING_CREDENTIALS',
        message: `Missing required configuration: ${missing.join(', ')}`,
        status: 0,
        platform: this.platform,
        retryable: false
      })
    }
  }

  protected createSocialPost(
    id: string,
    platform: 'youtube' | 'instagram' | 'twitter',
    content: any,
    author: any,
    engagement: any,
    timestamp: string,
    url: string
  ): SocialPost {
    return {
      id,
      platform,
      content,
      author,
      engagement,
      timestamp,
      url,
      createdAt: new Date()
    }
  }
}

// Custom error class for API errors
export class SocialAPIError extends Error {
  public code: string
  public status: number
  public platform: string
  public retryable: boolean

  constructor(error: {
    code: string
    message: string
    status: number
    platform: string
    retryable: boolean
  }) {
    super(error.message)
    this.name = 'SocialAPIError'
    this.code = error.code
    this.status = error.status
    this.platform = error.platform
    this.retryable = error.retryable
  }
}