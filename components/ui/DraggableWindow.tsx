'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'

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

  const handleMouseDown = (e: React.MouseEvent) => {
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
  }, [isDragging, dragOffset])

  return (
    <div
      ref={windowRef}
      className={`absolute ${width} ${height} win95-window cursor-move max-h-[calc(100vh-100px)]`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="win95-titlebar cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 text-xs flex items-center justify-center">
            {icon}
          </div>
          <span>{title}</span>
        </div>
        <div className="flex space-x-1">
          <button className="w-4 h-4 bg-win95-gray border border-win95-darkgray text-xs hover:bg-win95-lightgray">
            _
          </button>
          <button className="w-4 h-4 bg-win95-gray border border-win95-darkgray text-xs hover:bg-win95-lightgray">
            □
          </button>
          <button
            className="w-4 h-4 bg-win95-gray border border-win95-darkgray text-xs hover:bg-win95-lightgray"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="cursor-default">
        {children}
      </div>
    </div>
  )
}