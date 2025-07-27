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
    <div>
      {/* Browser Navigation Bar */}
      <div className="bg-earthy-light border-b border-earthy-dark px-2 py-1">
        <div className="flex items-center space-x-2 mb-2">
          <button className="win95-button text-xs px-2 py-1">←</button>
          <button className="win95-button text-xs px-2 py-1">→</button>
          <button className="win95-button text-xs px-2 py-1">🏠</button>
          <button className="win95-button text-xs px-2 py-1">🔄</button>
          <div className="win95-inset flex-1 px-2 py-1 text-sm">
            http://www.alienlabs.com/{activeTab}
          </div>
        </div>
        
        {/* Tab Bar */}
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 text-xs border-2 border-b-0 flex items-center space-x-1 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-earthy-light border-earthy-dark border-t-earthy-medium border-l-earthy-medium text-earthy-darkest'
                  : 'bg-earthy-medium border-earthy-dark hover:bg-earthy-light text-earthy-light hover:text-earthy-darkest'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.title}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="bg-earthy-light min-h-[500px] max-h-[500px] overflow-y-auto">
        {activeTabData && <activeTabData.content />}
      </div>
      
      {/* Status Bar */}
      <div className="bg-earthy-light border-t border-earthy-dark px-2 py-1 text-xs flex justify-between text-earthy-darkest">
        <span>Ready</span>
        <span>Internet Explorer - Alien Labs</span>
      </div>
    </div>
  )
}