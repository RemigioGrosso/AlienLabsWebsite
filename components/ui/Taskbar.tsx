'use client'

import { useState, useEffect } from 'react'

interface TaskbarProps {
  openWindows: Array<{
    id: string
    title: string
    icon: string
  }>
  onWindowFocus: (id: string) => void
  onStartMenuClick: () => void
}

export default function Taskbar({ openWindows, onWindowFocus, onStartMenuClick }: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showStartMenu, setShowStartMenu] = useState(false)

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleStartClick = () => {
    setShowStartMenu(!showStartMenu)
    onStartMenuClick()
  }

  return (
    <>
      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 w-full h-10 bg-win95-gray border-t-2 border-win95-lightgray z-[100]">
        <div className="flex items-center h-full px-1">
          {/* Start Button */}
          <button 
            className={`win95-button h-8 px-3 text-sm font-bold flex items-center space-x-1 ${
              showStartMenu ? 'win95-button-pressed' : ''
            }`}
            onClick={handleStartClick}
          >
            <span className="text-xs">🪟</span>
            <span>Start</span>
          </button>

          {/* Window Buttons */}
          <div className="flex-1 flex items-center space-x-1 px-2">
            {openWindows.map((window) => (
              <button
                key={window.id}
                className="win95-button h-8 px-3 text-xs flex items-center space-x-1 max-w-40 truncate"
                onClick={() => onWindowFocus(window.id)}
                title={window.title}
              >
                <span>{window.icon}</span>
                <span className="truncate">{window.title}</span>
              </button>
            ))}
          </div>

          {/* System Tray */}
          <div className="flex items-center space-x-2">
            {/* Volume Icon */}
            <div className="text-xs cursor-pointer hover:bg-win95-lightgray px-1 py-1 rounded">
              🔊
            </div>
            
            {/* Clock */}
            <div className="text-xs bg-win95-inset px-2 py-1 font-win95-mono border border-win95-darkgray">
              {currentTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <>
          {/* Backdrop to close menu */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowStartMenu(false)}
          />
          
          {/* Start Menu Panel */}
          <div className="absolute bottom-10 left-0 w-64 bg-win95-gray border-2 border-win95-lightgray z-[101] shadow-lg">
            {/* Start Menu Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-2 text-sm font-bold">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🪟</span>
                <span>Windows 95</span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-1">
              <div className="win95-menu-item flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer">
                <span>📁</span>
                <span>Programs</span>
                <span className="ml-auto">▶</span>
              </div>
              
              <div className="win95-menu-item flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer">
                <span>📄</span>
                <span>Documents</span>
                <span className="ml-auto">▶</span>
              </div>
              
              <div className="win95-menu-item flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer">
                <span>⚙️</span>
                <span>Settings</span>
                <span className="ml-auto">▶</span>
              </div>
              
              <div className="win95-menu-item flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer">
                <span>🔍</span>
                <span>Find</span>
                <span className="ml-auto">▶</span>
              </div>
              
              <div className="win95-menu-item flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer">
                <span>❓</span>
                <span>Help</span>
              </div>
              
              <div className="win95-menu-item flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer">
                <span>🏃</span>
                <span>Run...</span>
              </div>
              
              <hr className="border-win95-darkgray my-1" />
              
              <div className="win95-menu-item flex items-center space-x-2 p-2 hover:bg-blue-600 hover:text-white cursor-pointer">
                <span>🔌</span>
                <span>Shut Down...</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}