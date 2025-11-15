'use client'

import { useState, useRef } from 'react'

interface MusicProps {
  windowId: string
}

interface Track {
  id: string
  title: string
  artist: string
  duration: string
  url?: string
}

const SAMPLE_TRACKS: Track[] = [
  { id: '1', title: 'Sample Track 1', artist: 'Artist Name', duration: '3:24' },
  { id: '2', title: 'Sample Track 2', artist: 'Artist Name', duration: '4:15' },
  { id: '3', title: 'Sample Track 3', artist: 'Artist Name', duration: '2:58' },
]

export default function Music({ windowId }: MusicProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlayPause = () => {
    if (!currentTrack) {
      setCurrentTrack(SAMPLE_TRACKS[0])
    }
    setIsPlaying(!isPlaying)
  }

  const handleTrackClick = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Album art section */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-8">
        <div className="text-center text-white">
          <div className="w-48 h-48 mx-auto bg-white/20 rounded-lg mb-4 flex items-center justify-center text-6xl">
            🎵
          </div>
          <h2 className="text-2xl font-bold mb-1">
            {currentTrack?.title || 'No track playing'}
          </h2>
          <p className="text-lg opacity-90">
            {currentTrack?.artist || 'Select a track'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={handlePlayPause}
            className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 18h2V6h-2zM6 18l8.5-6L6 6z" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0:00</span>
            <span>{currentTrack?.duration || '0:00'}</span>
          </div>
        </div>

        {/* Track list */}
        <div className="space-y-1">
          {SAMPLE_TRACKS.map(track => (
            <button
              key={track.id}
              onClick={() => handleTrackClick(track)}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                currentTrack?.id === track.id ? 'bg-blue-100 dark:bg-blue-900' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{track.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{track.artist}</div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{track.duration}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
