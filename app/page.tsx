'use client'

import { useState } from 'react'
import DesktopIcon from '@/components/ui/DesktopIcon'
import DraggableWindow from '@/components/ui/DraggableWindow'
import TabbedBrowser from '@/components/ui/TabbedBrowser'
import MyComputerWindow from '@/components/windows/MyComputerWindow'
import ProjectsWindow from '@/components/windows/ProjectsWindow'
import TeamWindow from '@/components/windows/TeamWindow'
import WelcomeTab from '@/components/tabs/WelcomeTab'
import AboutTab from '@/components/tabs/AboutTab'
import SocialTab from '@/components/tabs/SocialTab'
import ProjectsTab from '@/components/tabs/ProjectsTab'
import WelcomeWindow from '@/components/windows/WelcomeWindow'
import LoadingScreen from '@/components/ui/LoadingScreen'
import CursorLight from '@/components/ui/CursorLight'
import SocialPopupAds from '@/components/ui/SocialPopupAds'
import { useSocialMediaPosts } from '@/lib/social-media/hooks/useSocialMediaPosts'
import Taskbar from '@/components/ui/Taskbar'

interface Window {
  id: string
  title: string
  icon: string
  component: React.ComponentType
  x: number
  y: number
  width: string
  height: string
  zIndex: number
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadedElements, setLoadedElements] = useState<Set<string>>(new Set())
  const [windows, setWindows] = useState<Window[]>([])
  const [highestZIndex, setHighestZIndex] = useState(1000)
  
  // Hook for social media posts
  const { posts, isLoading: postsLoading, error: postsError } = useSocialMediaPosts()

  // Progressive loading sequence - no animations, just appear
  const loadingSequence = [
    { id: 'welcome-icon', delay: 100 },
    { id: 'computer-icon', delay: 200 },
    { id: 'projects-icon', delay: 300 },
    { id: 'team-icon', delay: 400 },
    { id: 'recycle-icon', delay: 500 },
    { id: 'taskbar', delay: 600 },
    { id: 'browser-window', delay: 700 },
    { id: 'cursor', delay: 800 }
  ]

  // Start progressive loading when boot completes
  const handleBootComplete = () => {
    setIsLoading(false)

    loadingSequence.forEach((element) => {
      setTimeout(() => {
        setLoadedElements(prev => new Set(Array.from(prev).concat(element.id)))

        if (element.id === 'browser-window') {
          // Auto-open the browser window
          const browserWindow = {
            id: 'browser',
            title: 'Internet Explorer - Alien Labs',
            icon: '🌐',
            component: () => (
              <TabbedBrowser
                tabs={[
                  { id: 'welcome', title: 'Welcome', icon: '🛸', content: WelcomeTab },
                  { id: 'about', title: 'About Us', icon: 'ℹ️', content: AboutTab },
                  { id: 'social', title: 'Social Posts', icon: '📱', content: SocialTab },
                  { id: 'projects', title: 'Projects', icon: '📁', content: ProjectsTab }
                ]}
                initialTab="welcome"
              />
            ),
            x: 120,
            y: 40,
            width: 'w-[1000px]',
            height: 'h-auto',
            zIndex: 1000
          }
          setWindows([browserWindow])
          setHighestZIndex(1001)
        }
      }, element.delay)
    })
  }

  const openWindow = (type: string) => {
    const newZIndex = highestZIndex + 1
    const windowConfigs = {
      welcome: {
        id: `welcome-${Date.now()}`,
        title: 'Welcome - Alien Labs',
        icon: '🛸',
        component: WelcomeWindow,
        x: 150 + Math.random() * 100,
        y: 80 + Math.random() * 100,
        width: 'w-96',
        height: 'h-auto',
        zIndex: newZIndex
      },
      computer: {
        id: `computer-${Date.now()}`,
        title: 'My Computer',
        icon: '🖥️',
        component: MyComputerWindow,
        x: 100 + Math.random() * 100,
        y: 100 + Math.random() * 100,
        width: 'w-80',
        height: 'h-auto',
        zIndex: newZIndex
      },
      projects: {
        id: `projects-${Date.now()}`,
        title: 'Projects',
        icon: '📁',
        component: ProjectsWindow,
        x: 200 + Math.random() * 100,
        y: 150 + Math.random() * 100,
        width: 'w-96',
        height: 'h-auto',
        zIndex: newZIndex
      },
      team: {
        id: `team-${Date.now()}`,
        title: 'Team Directory',
        icon: '👥',
        component: TeamWindow,
        x: 250 + Math.random() * 100,
        y: 200 + Math.random() * 100,
        width: 'w-80',
        height: 'h-auto',
        zIndex: newZIndex
      }
    }

    const config = windowConfigs[type as keyof typeof windowConfigs]
    if (config) {
      setWindows(prev => [...prev, config])
      setHighestZIndex(newZIndex)
    }
  }

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }

  const focusWindow = (id: string) => {
    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, zIndex: newZIndex } : w
    ))
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleBootComplete} />
  }

  return (
    <div className="h-screen w-screen fixed inset-0 overflow-hidden">
      {/* Keep original black background - no changes */}

      {/* Cursor Light Effect - appears last */}
      {loadedElements.has('cursor') && <CursorLight />}

      {/* Social Media Pop-up Ads - appears with cursor */}
      {loadedElements.has('cursor') && (
        <SocialPopupAds 
          posts={posts}
          isLoading={postsLoading}
          error={postsError}
          displayInterval={30000} // 30 seconds between popups
          autoCloseDelay={12000} // 12 seconds auto-close
        />
      )}

      {/* Desktop Icons - appear one by one */}
      <div className="absolute top-4 left-4 space-y-6 z-10">
        {loadedElements.has('welcome-icon') && (
          <DesktopIcon
            icon="🛸"
            label="Welcome"
            onClick={() => openWindow('welcome')}
          />
        )}
        {loadedElements.has('computer-icon') && (
          <DesktopIcon
            icon="🖥️"
            label="My Computer"
            onClick={() => openWindow('computer')}
          />
        )}
        {loadedElements.has('projects-icon') && (
          <DesktopIcon
            icon="📁"
            label="File Explorer"
            onClick={() => openWindow('projects')}
          />
        )}
        {loadedElements.has('team-icon') && (
          <DesktopIcon
            icon="👥"
            label="Team Directory"
            onClick={() => openWindow('team')}
          />
        )}
        {loadedElements.has('recycle-icon') && (
          <DesktopIcon
            icon="🗑️"
            label="Recycle Bin"
            onClick={() => { }}
          />
        )}
      </div>



      {/* Functional Taskbar */}
      {loadedElements.has('taskbar') && (
        <Taskbar
          openWindows={windows.map(w => ({
            id: w.id,
            title: w.title,
            icon: w.icon
          }))}
          onWindowFocus={focusWindow}
          onStartMenuClick={() => { }}
        />
      )}

      {/* Draggable Windows - browser appears automatically */}
      {windows.map((window) => (
        <DraggableWindow
          key={window.id}
          title={window.title}
          icon={window.icon}
          initialX={window.x}
          initialY={window.y}
          width={window.width}
          height={window.height}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
        >
          <window.component />
        </DraggableWindow>
      ))}
    </div>
  )
}