'use client'

import { useState, useEffect } from 'react'

interface NotesProps {
  windowId: string
}

export default function Notes({ windowId }: NotesProps) {
  const [content, setContent] = useState('')

  // Load saved notes
  useEffect(() => {
    const saved = localStorage.getItem(`notes-${windowId}`)
    if (saved) {
      setContent(saved)
    }
  }, [windowId])

  // Auto-save on every keystroke
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(`notes-${windowId}`, content)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [content, windowId])

  return (
    <div className="w-full h-full flex flex-col bg-yellow-50 dark:bg-gray-900">
      <div className="flex items-center justify-between p-3 border-b border-yellow-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Auto-saving...
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm bg-yellow-200 dark:bg-gray-700 rounded hover:bg-yellow-300 dark:hover:bg-gray-600 transition-colors">
            Format
          </button>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing..."
        className="flex-1 p-4 bg-transparent outline-none resize-none text-gray-900 dark:text-gray-100"
      />
    </div>
  )
}
