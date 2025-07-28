'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'

// Hook to detect mobile/touch devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      // Check for touch capability and screen size
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(hasTouchScreen && isSmallScreen)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

interface DraggableWindowProps {
  title: string
  icon: string
  children: ReactNode
  initialX?: number
  initialY?: number
  width?: string
  height?: string
  onClose: () => void
  zIndex: number
  onFocus: () => void
}

export default function DraggableWindow({
  title,
  icon,
  children,
  initialX = 100,
  initialY = 100,
  width = 'w-96',
  height = 'h-auto',
  onClose,
  zIndex,
  onFocus
}: DraggableWindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const handleMouseDown = (e: React.MouseEvent) => {
    // Disable dragging on mobile devices
    if (isMobile) {
      onFocus()
      return
    }
    
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
      setIsDragging(true)
      onFocus()
    }
  }

  useEffect(() => {
    // Skip drag event listeners on mobile
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset, isMobile])

  // Mobile modal-like positioning and styling
  const mobileStyles = isMobile ? {
    position: 'fixed' as const,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95vw',
    maxWidth: '95vw',
    maxHeight: '90vh',
    zIndex: zIndex
  } : {
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: zIndex
  }

  const containerClasses = isMobile 
    ? `win95-window cursor-default overflow-hidden`
    : `absolute ${width} ${height} win95-window cursor-move max-h-[calc(100vh-100px)]`

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          style={{ zIndex: zIndex - 1 }}
          onClick={onClose}
        />
      )}
      
      <div
        ref={windowRef}
        className={containerClasses}
        style={mobileStyles}
        onClick={onFocus}
      >
        {/* Title Bar */}
        <div
          className={`win95-titlebar select-none ${isMobile ? 'cursor-default' : 'cursor-move'}`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-2">
            <div className={`${isMobile ? 'w-6 h-6' : 'w-4 h-4'} text-xs flex items-center justify-center`}>
              {icon}
            </div>
            <span className={isMobile ? 'text-sm font-medium' : ''}>{title}</span>
          </div>
          <div className="flex space-x-1">
            {/* Hide minimize/maximize buttons on mobile */}
            {!isMobile && (
              <>
                <button className="w-4 h-4 bg-win95-gray border border-win95-darkgray text-xs hover:bg-win95-lightgray">
                  _
                </button>
                <button className="w-4 h-4 bg-win95-gray border border-win95-darkgray text-xs hover:bg-win95-lightgray">
                  □
                </button>
              </>
            )}
            <button
              className={`${isMobile ? 'w-8 h-8 text-lg' : 'w-4 h-4 text-xs'} bg-win95-gray border border-win95-darkgray hover:bg-win95-lightgray flex items-center justify-center`}
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              style={{ minWidth: isMobile ? '44px' : 'auto', minHeight: isMobile ? '44px' : 'auto' }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`cursor-default ${isMobile ? 'overflow-y-auto max-h-[calc(90vh-60px)]' : ''}`}>
          {children}
        </div>
      </div>
    </>
  )
}