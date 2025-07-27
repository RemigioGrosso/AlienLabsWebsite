import { YouTubeAPIClient } from '../youtube-api-client'
import { getSocialMediaConfig } from '../config'

/**
 * Example usage of the YouTube API client
 * This demonstrates how to fetch posts from YouTube and handle errors
 */
async function exampleUsage() {
  try {
    // Get configuration from environment variables
    const config = getSocialMediaConfig()
    
    // Create YouTube API client
    const youtubeClient = new YouTubeAPIClient({
      apiKey: config.youtube.apiKey,
      channelId: config.youtube.channelId, // Optional: specific channel
      timeout: config.api.timeoutMs,
      retryAttempts: config.api.retryAttempts
    })

    // Check if client is authenticated
    const isAuthenticated = await youtubeClient.isAuthenticated()
    console.log('YouTube client authenticated:', isAuthenticated)

    if (!isAuthenticated) {
      console.error('YouTube API key is missing or invalid')
      return
    }

    // Validate credentials
    const isValid = await youtubeClient.validateCredentials()
    console.log('YouTube credentials valid:', isValid)

    if (!isValid) {
      console.error('YouTube API credentials are invalid')
      return
    }

    // Fetch recent posts
    console.log('Fetching recent YouTube posts...')
    const posts = await youtubeClient.fetchPosts(5)
    
    console.log(`Found ${posts.length} posts:`)
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.content.title}`)
      console.log(`   Views: ${post.engagement.views}`)
      console.log(`   Likes: ${post.engagement.likes}`)
      console.log(`   URL: ${post.url}`)
      console.log(`   Published: ${post.timestamp}`)
      console.log()
    })

    // Search for specific videos
    console.log('Searching for "alien labs" videos...')
    const searchResults = await youtubeClient.searchVideosByQuery('alien labs', 3)
    
    console.log(`Found ${searchResults.length} search results:`)
    searchResults.forEach((post, index) => {
      console.log(`${index + 1}. ${post.content.title}`)
      console.log(`   Channel: ${post.author.displayName}`)
      console.log(`   URL: ${post.url}`)
      console.log()
    })

    // Get rate limit information
    const rateLimit = await youtubeClient.getRateLimit()
    console.log('Rate limit info:', {
      remaining: rateLimit.remaining,
      limit: rateLimit.limit,
      resetTime: new Date(rateLimit.reset)
    })

  } catch (error) {
    console.error('Error in YouTube API example:', error)
  }
}

// Export for use in other modules
export { exampleUsage as runYouTubeExample }

// Run example if this file is executed directly
if (require.main === module) {
  exampleUsage()
}