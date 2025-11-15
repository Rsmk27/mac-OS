'use client'

import { useState } from 'react'

interface BrowserProps {
  windowId: string
}

export default function Browser({ windowId }: BrowserProps) {
  const [url, setUrl] = useState('https://example.com')
  const [currentUrl, setCurrentUrl] = useState('https://example.com')

  const handleNavigate = () => {
    let finalUrl = url
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = 'https://' + url
    }
    setCurrentUrl(finalUrl)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate()
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Browser toolbar */}
      <div className="flex items-center space-x-2 p-3 border-b border-gray-200 dark:border-gray-700">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Enter URL..."
          />
        </div>
      </div>

      {/* Browser content */}
      <div className="flex-1 relative bg-white">
        <iframe
          src={currentUrl}
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin"
          title="Browser content"
        />
      </div>
    </div>
  )
}
