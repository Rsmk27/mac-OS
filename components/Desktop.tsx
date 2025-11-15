'use client'

import { useEffect, useState } from 'react'
import MenuBar from '@/components/MenuBar'
import Dock from '@/components/Dock'
import WindowManager from '@/components/WindowManager'
import Spotlight from '@/components/Spotlight'
import { useSystemStore } from '@/store/systemStore'

export default function Desktop() {
  const [mounted, setMounted] = useState(false)
  const { isSpotlightOpen, toggleSpotlight } = useSystemStore()

  useEffect(() => {
    setMounted(true)
    
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Spotlight: Cmd/Ctrl + Space
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault()
        toggleSpotlight()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSpotlight])

  if (!mounted) return null

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-[url('/wallpaper.jpg')] bg-cover bg-center" />
      
      {/* Desktop content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <MenuBar />
        
        <div className="flex-1 relative overflow-hidden">
          <WindowManager />
        </div>
        
        <Dock />
      </div>

      {/* Spotlight */}
      {isSpotlightOpen && <Spotlight />}

      {/* Disclaimer */}
      <div className="absolute bottom-20 left-4 text-xs text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
        Educational demo - Not affiliated with Apple Inc.
      </div>
    </div>
  )
}
