import { BaseAPIClient } from './base-api-client'
import { 
  SocialPost, 
  YouTubeSearchResponse, 
  YouTubeVideosResponse, 
  YouTubeVideo,
  APIClientConfig 
} from '@/types/social-media'

export class YouTubeAPIClient extends BaseAPIClient {
  private apiKey: string
  private channelId?: string

  constructor(config: APIClientConfig & { apiKey: string; channelId?: string }) {
    super(config, 'youtube', 'https://www.googleapis.com/youtube/v3')
    this.apiKey = config.apiKey
    this.channelId = config.channelId
    
    if (this.apiKey) {
      this.validateRequiredConfig(['apiKey'])
    }
  }

  async fetchPosts(limit: number = 10): Promise<SocialPost[]> {
    try {
      // First, search for recent videos from the channel
      const searchResults = await this.searchVideos(limit)
      
      if (searchResults.length === 0) {
        return []
      }

      // Get detailed video information including statistics
      const videoIds = searchResults.map(video => video.id.videoId)
      const videoDetails = await this.getVideoDetails(videoIds)

      // Convert to unified SocialPost format
      return videoDetails.map(video => this.convertToSocialPost(video))
    } catch (error) {
      console.error('Failed to fetch YouTube posts:', error)
      throw error
    }
  }

  async isAuthenticated(): Promise<boolean> {
    return !!this.apiKey
  }

  async validateCredentials(): Promise<boolean> {
    try {
      // Test the API key by making a simple search request
      await this.makeRequest('/search', {
        method: 'GET',
        headers: this.getAuthHeaders()
      })
      return true
    } catch (error) {
      console.error('YouTube API credentials validation failed:', error)
      return false
    }
  }

  private async searchVideos(maxResults: number): Promise<YouTubeSearchResponse['items']> {
    const params = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      order: 'date',
      maxResults: maxResults.toString(),
      key: this.apiKey
    })

    // If channelId is provided, search within that channel
    if (this.channelId) {
      params.append('channelId', this.channelId)
    } else {
      // If no specific channel, search for recent videos (you might want to add a search query)
      params.append('q', 'alien labs') // Default search term
    }

    const response = await this.makeRequestWithRetry<YouTubeSearchResponse>(
      `/search?${params.toString()}`
    )

    return response.items || []
  }

  private async getVideoDetails(videoIds: string[]): Promise<YouTubeVideo[]> {
    if (videoIds.length === 0) {
      return []
    }

    const params = new URLSearchParams({
      part: 'snippet,statistics',
      id: videoIds.join(','),
      key: this.apiKey
    })

    const response = await this.makeRequestWithRetry<YouTubeVideosResponse>(
      `/videos?${params.toString()}`
    )

    return response.items || []
  }

  private convertToSocialPost(video: YouTubeVideo): SocialPost {
    const videoUrl = `https://www.youtube.com/watch?v=${video.id}`
    
    return this.createSocialPost(
      video.id,
      'youtube',
      {
        title: video.snippet.title,
        text: video.snippet.description,
        thumbnailUrl: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.high?.url
      },
      {
        username: video.snippet.channelId,
        displayName: video.snippet.channelTitle,
        avatarUrl: undefined // YouTube API doesn't provide channel avatar in video response
      },
      {
        views: parseInt(video.statistics.viewCount || '0', 10),
        likes: parseInt(video.statistics.likeCount || '0', 10),
        comments: parseInt(video.statistics.commentCount || '0', 10)
      },
      video.snippet.publishedAt,
      videoUrl
    )
  }

  private getAuthHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Accept': 'application/json'
    }
  }

  // Additional method to get channel information if needed
  async getChannelInfo(channelId?: string): Promise<any> {
    const targetChannelId = channelId || this.channelId
    
    if (!targetChannelId) {
      throw new Error('Channel ID is required to fetch channel information')
    }

    const params = new URLSearchParams({
      part: 'snippet,statistics',
      id: targetChannelId,
      key: this.apiKey
    })

    return await this.makeRequestWithRetry(
      `/channels?${params.toString()}`
    )
  }

  // Method to search for videos by query
  async searchVideosByQuery(query: string, maxResults: number = 10): Promise<SocialPost[]> {
    const params = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      q: query,
      order: 'relevance',
      maxResults: maxResults.toString(),
      key: this.apiKey
    })

    const searchResponse = await this.makeRequestWithRetry<YouTubeSearchResponse>(
      `/search?${params.toString()}`
    )

    if (!searchResponse.items || searchResponse.items.length === 0) {
      return []
    }

    // Get detailed video information
    const videoIds = searchResponse.items.map(item => item.id.videoId)
    const videoDetails = await this.getVideoDetails(videoIds)

    return videoDetails.map(video => this.convertToSocialPost(video))
  }
}