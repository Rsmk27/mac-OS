'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSystemStore } from '@/store/systemStore'
import { getAppRegistry } from '@/lib/appRegistry'

export default function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { openWindow, runningApps, dockSize, dockMagnification } = useSystemStore()
  const apps = getAppRegistry()

  const handleAppClick = (app: any) => {
    openWindow(app.id, app)
  }

  const getDockItemScale = (index: number) => {
    if (hoveredIndex === null) return 1
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return dockMagnification
    if (distance === 1) return 1 + (dockMagnification - 1) * 0.5
    return 1
  }

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect rounded-2xl px-2 py-2 dock-shadow border border-white/20 dark:border-gray-700/50"
      >
        <div className="flex items-end space-x-2">
          {apps.map((app, index) => {
            const isRunning = runningApps.includes(app.id)
            const scale = getDockItemScale(index)

            return (
              <motion.div
                key={app.id}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{ scale }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <button
                  onClick={() => handleAppClick(app)}
                  className="relative group"
                  style={{ width: dockSize, height: dockSize }}
                >
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                    {app.icon}
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gray-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {app.name}
                    </div>
                  </div>
                </button>

                {/* Running indicator */}
                {isRunning && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-gray-700 dark:bg-gray-300 rounded-full" />
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
