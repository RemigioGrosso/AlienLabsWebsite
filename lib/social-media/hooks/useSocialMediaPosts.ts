'use client'

import { useState, useEffect } from 'react'
import { SocialPost } from '@/types/social-media'
import { YouTubeAPIClient } from '../youtube-api-client'
import { getSocialMediaConfig } from '../config'

interface UseSocialMediaPostsResult {
  posts: SocialPost[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useSocialMediaPosts(): UseSocialMediaPostsResult {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const config = getSocialMediaConfig()
      const allPosts: SocialPost[] = []

      // Fetch YouTube posts if API key is available
      if (config.youtube.apiKey) {
        try {
          const youtubeClient = new YouTubeAPIClient({
            apiKey: config.youtube.apiKey,
            channelId: config.youtube.channelId,
            timeout: config.api.timeoutMs,
            retryAttempts: config.api.retryAttempts
          })

          const youtubePosts = await youtubeClient.fetchPosts(5)
          allPosts.push(...youtubePosts)
        } catch (youtubeError) {
          console.warn('Failed to fetch YouTube posts:', youtubeError)
        }
      }

      // TODO: Add Instagram and Twitter clients when they're implemented
      // Similar pattern for Instagram and Twitter

      setPosts(allPosts)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch social media posts'
      setError(errorMessage)
      console.error('Error fetching social media posts:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()

    // Set up periodic refresh every 15 minutes
    const interval = setInterval(fetchPosts, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return {
    posts,
    isLoading,
    error,
    refetch: fetchPosts
  }
}