import { YouTubeAPIClient } from '../youtube-api-client'
import { YouTubeSearchResponse, YouTubeVideosResponse, YouTubeVideo } from '@/types/social-media'

// Mock fetch globally
global.fetch = jest.fn()

describe('YouTubeAPIClient', () => {
  let client: YouTubeAPIClient
  const mockConfig = {
    apiKey: 'test-api-key',
    channelId: 'test-channel-id',
    timeout: 10000,
    retryAttempts: 3
  }

  beforeEach(() => {
    client = new YouTubeAPIClient(mockConfig)
    jest.clearAllMocks()
  })

  describe('constructor', () => {
    it('should create client with valid config', () => {
      expect(client).toBeInstanceOf(YouTubeAPIClient)
    })

    it('should create client even when API key is empty', () => {
      const client = new YouTubeAPIClient({
        ...mockConfig,
        apiKey: ''
      })
      expect(client).toBeInstanceOf(YouTubeAPIClient)
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when API key is present', async () => {
      const result = await client.isAuthenticated()
      expect(result).toBe(true)
    })

    it('should return false when API key is empty', async () => {
      const clientWithoutKey = new YouTubeAPIClient({
        ...mockConfig,
        apiKey: ''
      })
      const result = await clientWithoutKey.isAuthenticated()
      expect(result).toBe(false)
    })
  })

  describe('validateCredentials', () => {
    it('should return true for valid credentials', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] }),
        headers: new Headers()
      } as Response)

      const result = await client.validateCredentials()
      expect(result).toBe(true)
    })

    it('should return false for invalid credentials', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: new Headers()
      } as Response)

      const result = await client.validateCredentials()
      expect(result).toBe(false)
    })
  })

  describe('fetchPosts', () => {
    const mockSearchResponse: YouTubeSearchResponse = {
      items: [
        {
          id: { videoId: 'video1' },
          snippet: {
            title: 'Test Video 1',
            description: 'Test description 1',
            thumbnails: {
              medium: { url: 'https://example.com/thumb1.jpg' }
            },
            publishedAt: '2023-01-01T00:00:00Z',
            channelTitle: 'Test Channel'
          }
        },
        {
          id: { videoId: 'video2' },
          snippet: {
            title: 'Test Video 2',
            description: 'Test description 2',
            thumbnails: {
              medium: { url: 'https://example.com/thumb2.jpg' }
            },
            publishedAt: '2023-01-02T00:00:00Z',
            channelTitle: 'Test Channel'
          }
        }
      ],
      pageInfo: {
        totalResults: 2,
        resultsPerPage: 10
      }
    }

    const mockVideosResponse: YouTubeVideosResponse = {
      items: [
        {
          id: 'video1',
          snippet: {
            title: 'Test Video 1',
            description: 'Test description 1',
            thumbnails: {
              medium: { url: 'https://example.com/thumb1.jpg' }
            },
            publishedAt: '2023-01-01T00:00:00Z',
            channelTitle: 'Test Channel',
            channelId: 'test-channel-id'
          },
          statistics: {
            viewCount: '1000',
            likeCount: '50',
            commentCount: '10'
          }
        },
        {
          id: 'video2',
          snippet: {
            title: 'Test Video 2',
            description: 'Test description 2',
            thumbnails: {
              medium: { url: 'https://example.com/thumb2.jpg' }
            },
            publishedAt: '2023-01-02T00:00:00Z',
            channelTitle: 'Test Channel',
            channelId: 'test-channel-id'
          },
          statistics: {
            viewCount: '2000',
            likeCount: '100',
            commentCount: '20'
          }
        }
      ]
    }

    it('should fetch and convert posts successfully', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      
      // Mock search request
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse,
        headers: new Headers()
      } as Response)

      // Mock videos details request
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockVideosResponse,
        headers: new Headers()
      } as Response)

      const posts = await client.fetchPosts(2)

      expect(posts).toHaveLength(2)
      expect(posts[0]).toMatchObject({
        id: 'video1',
        platform: 'youtube',
        content: {
          title: 'Test Video 1',
          text: 'Test description 1',
          thumbnailUrl: 'https://example.com/thumb1.jpg'
        },
        author: {
          username: 'test-channel-id',
          displayName: 'Test Channel'
        },
        engagement: {
          views: 1000,
          likes: 50,
          comments: 10
        },
        url: 'https://www.youtube.com/watch?v=video1'
      })
    })

    it('should return empty array when no videos found', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] }),
        headers: new Headers()
      } as Response)

      const posts = await client.fetchPosts(10)
      expect(posts).toEqual([])
    })

    it('should handle API errors gracefully', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        headers: new Headers()
      } as Response)

      await expect(client.fetchPosts(10)).rejects.toThrow()
    })
  })

  describe('searchVideosByQuery', () => {
    it('should search videos by query successfully', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      
      const mockSearchResponse: YouTubeSearchResponse = {
        items: [
          {
            id: { videoId: 'search-video1' },
            snippet: {
              title: 'Search Result 1',
              description: 'Search description 1',
              thumbnails: {
                medium: { url: 'https://example.com/search-thumb1.jpg' }
              },
              publishedAt: '2023-01-01T00:00:00Z',
              channelTitle: 'Search Channel'
            }
          }
        ],
        pageInfo: {
          totalResults: 1,
          resultsPerPage: 10
        }
      }

      const mockVideosResponse: YouTubeVideosResponse = {
        items: [
          {
            id: 'search-video1',
            snippet: {
              title: 'Search Result 1',
              description: 'Search description 1',
              thumbnails: {
                medium: { url: 'https://example.com/search-thumb1.jpg' }
              },
              publishedAt: '2023-01-01T00:00:00Z',
              channelTitle: 'Search Channel',
              channelId: 'search-channel-id'
            },
            statistics: {
              viewCount: '500',
              likeCount: '25',
              commentCount: '5'
            }
          }
        ]
      }

      // Mock search request
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse,
        headers: new Headers()
      } as Response)

      // Mock videos details request
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockVideosResponse,
        headers: new Headers()
      } as Response)

      const posts = await client.searchVideosByQuery('test query', 1)

      expect(posts).toHaveLength(1)
      expect(posts[0]).toMatchObject({
        id: 'search-video1',
        platform: 'youtube',
        content: {
          title: 'Search Result 1'
        }
      })
    })
  })

  describe('getChannelInfo', () => {
    it('should get channel information successfully', async () => {
      const mockChannelResponse = {
        items: [
          {
            id: 'test-channel-id',
            snippet: {
              title: 'Test Channel',
              description: 'Test channel description'
            },
            statistics: {
              subscriberCount: '1000',
              videoCount: '50'
            }
          }
        ]
      }

      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockChannelResponse,
        headers: new Headers()
      } as Response)

      const channelInfo = await client.getChannelInfo()
      expect(channelInfo).toEqual(mockChannelResponse)
    })

    it('should throw error when no channel ID provided', async () => {
      const clientWithoutChannelId = new YouTubeAPIClient({
        ...mockConfig,
        channelId: undefined
      })

      await expect(clientWithoutChannelId.getChannelInfo()).rejects.toThrow(
        'Channel ID is required to fetch channel information'
      )
    })
  })
})