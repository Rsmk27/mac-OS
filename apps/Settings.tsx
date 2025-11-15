'use client'

import { useSystemStore } from '@/store/systemStore'

interface SettingsProps {
  windowId: string
}

export default function Settings({ windowId }: SettingsProps) {
  const {
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    dockSize,
    setDockSize,
    dockMagnification,
    setDockMagnification,
    dockAutoHide,
    setDockAutoHide,
  } = useSystemStore()

  const accentColors = [
    { name: 'Blue', value: '#007AFF' },
    { name: 'Purple', value: '#7C3AED' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Green', value: '#10B981' },
  ]

  return (
    <div className="w-full h-full flex bg-white dark:bg-gray-800">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-3">
        <div className="space-y-1">
          <button className="w-full text-left px-3 py-2 rounded bg-blue-100 dark:bg-blue-900 text-sm font-medium">
            ⚙️ General
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
            🎨 Appearance
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
            🔒 Security
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
            ♿ Accessibility
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Appearance */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <div className="flex space-x-2">
                {(['light', 'dark', 'auto'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-4 py-2 rounded capitalize ${
                      theme === t
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Accent Color</label>
              <div className="flex space-x-2">
                {accentColors.map(color => (
                  <button
                    key={color.value}
                    onClick={() => setAccentColor(color.value)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      accentColor === color.value ? 'border-gray-900 dark:border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dock Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Dock</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Dock Size: {dockSize}px
              </label>
              <input
                type="range"
                min="48"
                max="96"
                value={dockSize}
                onChange={(e) => setDockSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Magnification: {dockMagnification.toFixed(1)}x
              </label>
              <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={dockMagnification}
                onChange={(e) => setDockMagnification(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="auto-hide"
                checked={dockAutoHide}
                onChange={(e) => setDockAutoHide(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="auto-hide" className="text-sm">
                Automatically hide and show the Dock
              </label>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">About</h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Build</span>
              <span className="font-medium">2024.01</span>
            </div>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-600 text-xs text-gray-500">
              Educational demo - Not affiliated with Apple Inc.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
