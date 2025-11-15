'use client'

import { useState } from 'react'

interface PhotosProps {
  windowId: string
}

interface Photo {
  id: string
  url: string
  title: string
}

const PLACEHOLDER_PHOTOS: Photo[] = [
  { id: '1', url: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Photo+1', title: 'Photo 1' },
  { id: '2', url: 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Photo+2', title: 'Photo 2' },
  { id: '3', url: 'https://via.placeholder.com/300x200/EC4899/FFFFFF?text=Photo+3', title: 'Photo 3' },
  { id: '4', url: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Photo+4', title: 'Photo 4' },
  { id: '5', url: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Photo+5', title: 'Photo 5' },
  { id: '6', url: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Photo+6', title: 'Photo 6' },
]

export default function Photos({ windowId }: PhotosProps) {
  const [photos, setPhotos] = useState<Photo[]>(PLACEHOLDER_PHOTOS)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newPhoto: Photo = {
          id: `upload-${Date.now()}-${Math.random()}`,
          url: event.target?.result as string,
          title: file.name,
        }
        setPhotos(prev => [...prev, newPhoto])
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="w-full h-full flex bg-white dark:bg-gray-800">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-3">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Library
          </div>
          <button className="w-full text-left px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-sm">
            📷 All Photos
          </button>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
            ❤️ Favorites
          </button>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
            📅 Recent
          </button>
        </div>

        <div className="mt-4">
          <label className="block w-full px-2 py-1 text-sm bg-blue-500 text-white rounded cursor-pointer text-center hover:bg-blue-600 transition-colors">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          {photos.map(photo => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Photo viewer */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl max-h-4xl p-4">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
