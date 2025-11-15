'use client'

import { useState } from 'react'

interface FinderProps {
  windowId: string
}

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  size?: string
  modified: string
}

const MOCK_FILES: FileItem[] = [
  { id: '1', name: 'Documents', type: 'folder', modified: '2024-01-15' },
  { id: '2', name: 'Downloads', type: 'folder', modified: '2024-01-14' },
  { id: '3', name: 'Pictures', type: 'folder', modified: '2024-01-13' },
  { id: '4', name: 'Music', type: 'folder', modified: '2024-01-12' },
  { id: '5', name: 'Desktop', type: 'folder', modified: '2024-01-11' },
  { id: '6', name: 'README.txt', type: 'file', size: '2 KB', modified: '2024-01-10' },
]

export default function Finder({ windowId }: FinderProps) {
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [files, setFiles] = useState<FileItem[]>(MOCK_FILES)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full h-full flex bg-white dark:bg-gray-800">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-3">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Favorites
          </div>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
            📁 All Files
          </button>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
            ⏰ Recent
          </button>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
            ⭐ Starred
          </button>
          
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-4 mb-2">
            Locations
          </div>
          <button className="w-full text-left px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-sm">
            🏠 Home
          </button>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
            💻 Desktop
          </button>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
            📄 Documents
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none text-sm w-64"
          />

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setView('grid')}
              className={`p-1 rounded ${view === 'grid' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1 rounded ${view === 'list' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* File list */}
        <div className="flex-1 overflow-y-auto p-4">
          {view === 'list' ? (
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Modified</th>
                  <th className="pb-2">Size</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map(file => (
                  <tr
                    key={file.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <td className="py-2">
                      <div className="flex items-center space-x-2">
                        <span>{file.type === 'folder' ? '📁' : '📄'}</span>
                        <span>{file.name}</span>
                      </div>
                    </td>
                    <td className="py-2 text-gray-500 dark:text-gray-400">{file.modified}</td>
                    <td className="py-2 text-gray-500 dark:text-gray-400">
                      {file.size || '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {filteredFiles.map(file => (
                <div
                  key={file.id}
                  className="flex flex-col items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                >
                  <div className="text-4xl mb-2">
                    {file.type === 'folder' ? '📁' : '📄'}
                  </div>
                  <div className="text-sm text-center truncate w-full">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
