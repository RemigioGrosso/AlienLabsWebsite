'use client'

import { useState, useEffect } from 'react'
import { SocialPost } from '@/types/social-media'

interface SocialPopupAdsProps {
  posts?: SocialPost[]
  onPostClick?: (post: SocialPost) => void
  displayInterval?: number
  autoCloseDelay?: number
  isLoading?: boolean
  error?: string | null
}

// Fallback posts when no real data is available
const fallbackPosts: SocialPost[] = [
  {
    id: 'fallback-1',
    platform: 'youtube',
    content: {
      title: 'Creative Tech Project Showcase',
      text: 'Just shipped another creative tech project! The intersection of art and code never gets old. 🚀',
      thumbnailUrl: undefined
    },
    author: {
      username: 'alienlabs',
      displayName: 'Alien Labs',
      avatarUrl: undefined
    },
    engagement: {
      views: 1250,
      likes: 42,
      comments: 8
    },
    timestamp: '2h',
    url: '#',
    createdAt: new Date()
  },
  {
    id: 'fallback-2',
    platform: 'instagram',
    content: {
      text: 'Behind the scenes at Alien Labs - where coffee meets code and magic happens ✨',
      imageUrl: undefined
    },
    author: {
      username: 'alienlabs',
      displayName: 'Alien Labs',
      avatarUrl: undefined
    },
    engagement: {
      likes: 127,
      comments: 15
    },
    timestamp: '1d',
    url: '#',
    createdAt: new Date()
  },
  {
    id: 'fallback-3',
    platform: 'twitter',
    content: {
      text: 'Excited to share our latest project combining AI and interactive design. The future of user experience is here!'
    },
    author: {
      username: 'alienlabs',
      displayName: 'Alien Labs',
      avatarUrl: undefined
    },
    engagement: {
      likes: 89,
      shares: 23,
      comments: 12
    },
    timestamp: '3d',
    url: '#',
    createdAt: new Date()
  }
]

export default function SocialPopupAds({ 
  posts = [], 
  onPostClick,
  displayInterval = 20000, // 20 seconds default
  autoCloseDelay = 12000, // 12 seconds default
  isLoading = false,
  error = null
}: SocialPopupAdsProps) {
  const [activePopups, setActivePopups] = useState<SocialPost[]>([])
  const [popupPositions, setPopupPositions] = useState<Array<{x: number, y: number}>>([])
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set())

  // Use real posts if available, otherwise fallback posts
  const availablePosts = posts.length > 0 ? posts : fallbackPosts

  useEffect(() => {
    // Don't show popups if there's an error or we're loading
    if (error || isLoading || availablePosts.length === 0) {
      return
    }

    const showRandomPopup = () => {
      const randomPost = availablePosts[Math.floor(Math.random() * availablePosts.length)]
      const randomPosition = {
        x: Math.random() * (window.innerWidth - 400),
        y: Math.random() * (window.innerHeight - 300)
      }
      
      setActivePopups(prev => [...prev, { ...randomPost, id: `${randomPost.id}-${Date.now()}` }])
      setPopupPositions(prev => [...prev, randomPosition])
      
      // Auto-hide after specified delay
      setTimeout(() => {
        setActivePopups(prev => prev.slice(1))
        setPopupPositions(prev => prev.slice(1))
      }, autoCloseDelay)
    }

    // Show first popup after 10 seconds (as per requirements)
    const initialTimer = setTimeout(showRandomPopup, 10000)
    
    // Then show popups at specified intervals
    const intervalTimer = setInterval(() => {
      if (activePopups.length < 3) { // Allow up to 3 popups at once
        showRandomPopup()
      }
    }, displayInterval)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(intervalTimer)
    }
  }, [activePopups.length, availablePosts, displayInterval, autoCloseDelay, error, isLoading])

  const closePopup = (popupId: string) => {
    setActivePopups(prev => prev.filter(popup => popup.id !== popupId))
    setPopupPositions(prev => {
      const index = activePopups.findIndex(popup => popup.id === popupId)
      return prev.filter((_, i) => i !== index)
    })
  }

  const handlePostClick = (post: SocialPost) => {
    if (onPostClick) {
      onPostClick(post)
    } else {
      // Default behavior: open post in new tab
      window.open(post.url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleImageError = (postId: string) => {
    setImageLoadErrors(prev => new Set(Array.from(prev).concat(postId)))
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return '🐦'
      case 'instagram': return '📷'
      case 'youtube': return '📺'
      default: return '📱'
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'border-blue-400 bg-blue-900/20'
      case 'instagram': return 'border-pink-400 bg-pink-900/20'
      case 'youtube': return 'border-red-400 bg-red-900/20'
      default: return 'border-gray-400 bg-gray-900/20'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    // If timestamp is already formatted (like "2h", "1d"), return as is
    if (timestamp.match(/^\d+[smhd]$/)) {
      return timestamp
    }
    
    // Otherwise, format the date
    try {
      const date = new Date(timestamp)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

      if (diffMins < 60) {
        return `${diffMins}m`
      } else if (diffHours < 24) {
        return `${diffHours}h`
      } else {
        return `${diffDays}d`
      }
    } catch {
      return timestamp
    }
  }

  const renderContent = (post: SocialPost) => {
    const hasImageError = imageLoadErrors.has(post.id)
    
    return (
      <div className="space-y-2">
        {/* Title for YouTube videos */}
        {post.content.title && (
          <h3 className="font-semibold text-white text-sm leading-tight">
            {post.content.title}
          </h3>
        )}
        
        {/* Image/Thumbnail */}
        {(post.content.imageUrl || post.content.thumbnailUrl) && !hasImageError && (
          <div className="relative">
            <img
              src={post.content.imageUrl || post.content.thumbnailUrl}
              alt={post.content.title || 'Social media content'}
              className="w-full h-32 object-cover rounded border border-gray-600"
              onError={() => handleImageError(post.id)}
              loading="lazy"
            />
            {post.platform === 'youtube' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                  ▶ PLAY
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Text content */}
        {post.content.text && (
          <p className="text-gray-300 text-sm leading-relaxed">
            {post.content.text.length > 150 
              ? `${post.content.text.substring(0, 150)}...` 
              : post.content.text
            }
          </p>
        )}
      </div>
    )
  }

  const renderEngagementStats = (post: SocialPost) => {
    const stats = []
    
    if (post.engagement.likes) {
      stats.push(`❤️ ${post.engagement.likes.toLocaleString()}`)
    }
    if (post.engagement.views) {
      stats.push(`👁️ ${post.engagement.views.toLocaleString()}`)
    }
    if (post.engagement.comments) {
      stats.push(`💬 ${post.engagement.comments.toLocaleString()}`)
    }
    if (post.engagement.shares) {
      stats.push(`🔄 ${post.engagement.shares.toLocaleString()}`)
    }
    
    return stats
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-[9999]">
        <div className="win95-window border-2 border-gray-400 bg-gray-900/20 p-4">
          <div className="flex items-center space-x-2">
            <div className="animate-spin w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"></div>
            <span className="text-white text-sm">Loading social posts...</span>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="fixed bottom-4 right-4 z-[9999]">
        <div className="win95-window border-2 border-red-400 bg-red-900/20 p-4 max-w-sm">
          <div className="flex items-center space-x-2">
            <span className="text-red-400">⚠️</span>
            <span className="text-white text-sm">Failed to load social posts</span>
          </div>
          <p className="text-gray-300 text-xs mt-1">{error}</p>
        </div>
      </div>
    )
  }

  if (activePopups.length === 0) return null

  return (
    <>
      {activePopups.map((popup, index) => (
        <div 
          key={popup.id}
          className="fixed z-[9999] transition-all duration-300 cursor-pointer"
          style={{
            left: popupPositions[index]?.x || 0,
            top: popupPositions[index]?.y || 0,
          }}
          onClick={() => handlePostClick(popup)}
        >
          {/* Windows 95 style popup */}
          <div className={`win95-window max-w-sm ${getPlatformColor(popup.platform)} border-2 shadow-2xl hover:shadow-3xl transition-shadow`}>
            {/* Title bar */}
            <div className="win95-titlebar flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getPlatformIcon(popup.platform)}</span>
                <span className="text-sm font-bold">
                  {popup.platform.charAt(0).toUpperCase() + popup.platform.slice(1)} Update
                </span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  closePopup(popup.id)
                }}
                className="win95-button-small text-xs px-2 py-1 hover:bg-red-500 transition-colors"
                onMouseEnter={(e) => {
                  // Make close button move like annoying ads (30% chance)
                  if (Math.random() > 0.7) {
                    e.currentTarget.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)'
                }}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  {popup.author.avatarUrl ? (
                    <img 
                      src={popup.author.avatarUrl} 
                      alt={popup.author.displayName}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                        if (nextElement) nextElement.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <span className={popup.author.avatarUrl ? 'hidden' : 'block'}>👤</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-white text-sm truncate">
                      {popup.author.displayName}
                    </span>
                    <span className="text-gray-400 text-xs">
                      @{popup.author.username}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {formatTimestamp(popup.timestamp)}
                    </span>
                  </div>
                  {renderContent(popup)}
                </div>
              </div>

              {/* Engagement stats */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-600">
                <div className="flex items-center space-x-3">
                  {renderEngagementStats(popup).map((stat, idx) => (
                    <span key={idx}>{stat}</span>
                  ))}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePostClick(popup)
                  }}
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  View Post →
                </button>
              </div>
            </div>

            {/* Windows 95 style resize corner */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 opacity-50"></div>
          </div>
        </div>
      ))}
    </>
  )
}