'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useSystemStore } from '@/store/systemStore'
import { getAppRegistry } from '@/lib/appRegistry'

export default function Spotlight() {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toggleSpotlight, openWindow } = useSystemStore()
  const apps = getAppRegistry()

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    inputRef.current?.focus()
    setSelectedIndex(0)
  }, [])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      toggleSpotlight()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, filteredApps.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && filteredApps[selectedIndex]) {
      const app = filteredApps[selectedIndex]
      openWindow(app.id, app)
      toggleSpotlight()
    }
  }

  const handleAppClick = (app: any) => {
    openWindow(app.id, app)
    toggleSpotlight()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
        onClick={toggleSpotlight}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="w-full max-w-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden">
            {/* Search input */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for apps..."
                className="w-full bg-transparent text-2xl outline-none placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {filteredApps.length > 0 ? (
                <div className="py-2">
                  {filteredApps.map((app, index) => (
                    <button
                      key={app.id}
                      onClick={() => handleAppClick(app)}
                      className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {app.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{app.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Application</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No results found
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
