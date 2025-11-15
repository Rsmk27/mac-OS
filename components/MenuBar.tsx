'use client'

import { useState } from 'react'
import { useSystemStore } from '@/store/systemStore'

export default function MenuBar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { activeWindowId, windows } = useSystemStore()

  // Update time every second
  useState(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  })

  const activeWindow = windows.find(w => w.id === activeWindowId)

  return (
    <div className="h-8 flex items-center justify-between px-4 glass-effect border-b border-gray-200/50 dark:border-gray-700/50 no-select z-50">
      {/* Left side - System menu and app menu */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {/* System menu icon */}
          <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </button>
        </div>

        {activeWindow && (
          <div className="flex items-center space-x-3 text-sm font-medium">
            <span>{activeWindow.title}</span>
          </div>
        )}
      </div>

      {/* Right side - Status icons */}
      <div className="flex items-center space-x-4 text-sm">
        {/* WiFi icon */}
        <button className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded px-2 py-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </button>

        {/* Battery icon */}
        <button className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded px-2 py-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm14 4h2a2 2 0 012 2v4a2 2 0 01-2 2h-2" />
          </svg>
        </button>

        {/* Time */}
        <div className="text-sm font-medium">
          {currentTime.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          })}
        </div>

        {/* Control Center */}
        <button className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded px-2 py-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
