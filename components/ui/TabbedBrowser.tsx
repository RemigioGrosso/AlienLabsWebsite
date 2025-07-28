'use client'

import { useState } from 'react'

interface Tab {
  id: string
  title: string
  icon: string
  content: React.ComponentType
}

interface TabbedBrowserProps {
  tabs: Tab[]
  initialTab?: string
}

export default function TabbedBrowser({ tabs, initialTab }: TabbedBrowserProps) {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.id)

  const activeTabData = tabs.find(tab => tab.id === activeTab)

  return (
    <div className="w-full">
      {/* Browser Navigation Bar */}
      <div className="bg-earthy-light border-b border-earthy-dark px-2 py-1">
        <div className="flex items-center space-x-1 md:space-x-2 mb-2">
          <button className="win95-button text-xs px-2 md:px-2 py-2 md:py-1 min-w-[44px] min-h-[44px] md:min-w-auto md:min-h-auto touch-manipulation">←</button>
          <button className="win95-button text-xs px-2 md:px-2 py-2 md:py-1 min-w-[44px] min-h-[44px] md:min-w-auto md:min-h-auto touch-manipulation">→</button>
          <button className="win95-button text-xs px-2 md:px-2 py-2 md:py-1 min-w-[44px] min-h-[44px] md:min-w-auto md:min-h-auto touch-manipulation hidden sm:block">🏠</button>
          <button className="win95-button text-xs px-2 md:px-2 py-2 md:py-1 min-w-[44px] min-h-[44px] md:min-w-auto md:min-h-auto touch-manipulation hidden sm:block">🔄</button>
          <div className="win95-inset flex-1 px-2 py-1 text-xs md:text-sm overflow-hidden">
            <span className="hidden md:inline">https://www.alienlabs.com/</span>
            <span className="md:hidden">alienlabs.com/</span>
            {activeTab}
          </div>
        </div>
        
        {/* Tab Bar - Mobile responsive with horizontal scrolling */}
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-[44px] px-2 md:px-3 py-2 md:py-1 text-xs border-2 border-b-0 flex items-center justify-center md:justify-start space-x-1 transition-colors duration-200 whitespace-nowrap touch-manipulation ${
                activeTab === tab.id
                  ? 'bg-earthy-light border-earthy-dark border-t-earthy-medium border-l-earthy-medium text-earthy-darkest'
                  : 'bg-earthy-medium border-earthy-dark hover:bg-earthy-light text-earthy-light hover:text-earthy-darkest'
              }`}
              style={{ minHeight: '44px' }}
            >
              <span className="text-sm md:text-xs">{tab.icon}</span>
              <span className="hidden md:inline">{tab.title}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Area - Mobile responsive height */}
      <div className="bg-earthy-light min-h-[300px] md:min-h-[500px] max-h-[70vh] md:max-h-[500px] overflow-y-auto">
        {activeTabData && <activeTabData.content />}
      </div>
      
      {/* Status Bar - Mobile responsive */}
      <div className="bg-earthy-light border-t border-earthy-dark px-2 py-1 text-xs flex justify-between text-earthy-darkest">
        <span>Ready</span>
        <span className="hidden md:inline">Internet Explorer - Alien Labs</span>
        <span className="md:hidden">IE - Alien Labs</span>
      </div>
    </div>
  )
}