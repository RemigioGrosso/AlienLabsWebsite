import { YouTubeAPIClient } from '../youtube-api-client'
import { getSocialMediaConfig } from '../config'

describe('YouTube API Integration', () => {
  let client: YouTubeAPIClient

  beforeEach(() => {
    const config = getSocialMediaConfig()
    client = new YouTubeAPIClient({
      apiKey: config.youtube.apiKey,
      channelId: config.youtube.channelId,
      timeout: config.api.timeoutMs,
      retryAttempts: config.api.retryAttempts
    })
  })

  it('should create client with config from environment', () => {
    expect(client).toBeInstanceOf(YouTubeAPIClient)
  })

  it('should handle authentication check', async () => {
    const isAuth = await client.isAuthenticated()
    expect(typeof isAuth).toBe('boolean')
  })

  // Note: These tests would require actual API credentials to run against real YouTube API
  // For now, they serve as integration test structure
  it.skip('should fetch real posts from YouTube API', async () => {
    const posts = await client.fetchPosts(5)
    expect(Array.isArray(posts)).toBe(true)
    
    if (posts.length > 0) {
      const post = posts[0]
      expect(post).toHaveProperty('id')
      expect(post).toHaveProperty('platform', 'youtube')
      expect(post).toHaveProperty('content')
      expect(post).toHaveProperty('author')
      expect(post).toHaveProperty('engagement')
      expect(post).toHaveProperty('url')
    }
  })

  it.skip('should search for videos by query', async () => {
    const posts = await client.searchVideosByQuery('alien labs', 3)
    expect(Array.isArray(posts)).toBe(true)
  })
})