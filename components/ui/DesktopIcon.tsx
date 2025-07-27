'use client'

import { useState } from 'react'

interface DesktopIconProps {
  icon: string
  label: string
  onClick: () => void
}

export default function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    setIsSelected(true)
    setTimeout(() => setIsSelected(false), 200) // Brief selection effect
    onClick()
  }

  return (
    <div
      className={`flex flex-col items-center space-y-1 cursor-pointer group p-2 rounded transition-all duration-200 ${
        isSelected 
          ? 'bg-black/25 backdrop-blur-sm' 
          : 'hover:bg-black/15 hover:backdrop-blur-sm'
      }`}
      onClick={handleClick}
      onDoubleClick={handleClick}
    >
      {/* Icon with backlighting */}
      <div className="relative">
        {/* Subtle ambient backlight glow */}
        <div className="absolute inset-0 bg-gradient-radial from-black/50 via-black/25 to-transparent rounded-full blur-lg scale-125 group-hover:scale-150 transition-transform duration-300"></div>
        <div className="absolute inset-0 bg-gradient-radial from-black/30 via-black/15 to-transparent rounded-full blur-md scale-110 group-hover:scale-130 transition-transform duration-300"></div>
        <div className="absolute inset-0 bg-gradient-radial from-black/20 via-black/8 to-transparent rounded-full blur-sm scale-100 group-hover:scale-115 transition-transform duration-300"></div>
        
        {/* Icon */}
        <div className="relative win95-icon text-2xl bg-win95-gray/80 backdrop-blur-sm border border-win95-darkgray/50 shadow-lg">
          {icon}
        </div>
      </div>
      
      {/* Label with selection background */}
      <span 
        className={`text-xs text-center break-words max-w-full px-1 py-0.5 rounded transition-all duration-200 ${
          isSelected 
            ? 'text-white bg-black/80' 
            : 'text-white bg-black/60 backdrop-blur-sm group-hover:bg-black/80'
        }`}
      >
        {label}
      </span>
    </div>
  )
}