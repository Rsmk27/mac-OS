'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useSystemStore } from '@/store/systemStore'

interface WindowProps {
  id: string
  appId: string
  title: string
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  children: React.ReactNode
}

export default function Window({
  id,
  title,
  x,
  y,
  width,
  height,
  zIndex,
  isMinimized,
  isMaximized,
  children,
}: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
  } = useSystemStore()

  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string>('')
  const dragStartPos = useRef({ x: 0, y: 0, windowX: x, windowY: y })
  const resizeStartPos = useRef({ x: 0, y: 0, width, height, windowX: x, windowY: y })

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return
    e.preventDefault()
    bringToFront(id)
    setIsDragging(true)
    dragStartPos.current = { x: e.clientX, y: e.clientY, windowX: x, windowY: y }
  }

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()
    bringToFront(id)
    setIsResizing(true)
    setResizeDirection(direction)
    resizeStartPos.current = { 
      x: e.clientX, 
      y: e.clientY, 
      width, 
      height,
      windowX: x,
      windowY: y
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartPos.current.x
        const deltaY = e.clientY - dragStartPos.current.y
        const newX = dragStartPos.current.windowX + deltaX
        const newY = Math.max(30, dragStartPos.current.windowY + deltaY) // Keep below menu bar
        updateWindowPosition(id, newX, newY)
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStartPos.current.x
        const deltaY = e.clientY - resizeStartPos.current.y
        
        let newWidth = width
        let newHeight = height
        let newX = x
        let newY = y

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(400, resizeStartPos.current.width + deltaX)
        }
        if (resizeDirection.includes('w')) {
          newWidth = Math.max(400, resizeStartPos.current.width - deltaX)
          newX = resizeStartPos.current.windowX + deltaX
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(300, resizeStartPos.current.height + deltaY)
        }
        if (resizeDirection.includes('n')) {
          newHeight = Math.max(300, resizeStartPos.current.height - deltaY)
          newY = Math.max(30, resizeStartPos.current.windowY + deltaY)
        }

        updateWindowSize(id, newWidth, newHeight)
        if (newX !== x || newY !== y) {
          updateWindowPosition(id, newX, newY)
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection('')
    }

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, resizeDirection, id, x, y, width, height, updateWindowPosition, updateWindowSize])

  if (isMinimized) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute"
      style={{
        left: x,
        top: y,
        width,
        height,
        zIndex,
      }}
    >
      <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg window-shadow overflow-hidden">
        {/* Title bar */}
        <div
          className="h-10 flex items-center justify-between px-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 cursor-move no-select"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-2 window-controls">
            <button
              onClick={() => closeWindow(id)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
            <button
              onClick={() => minimizeWindow(id)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            />
            <button
              onClick={() => maximizeWindow(id)}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            />
          </div>

          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 pointer-events-none">
            {title}
          </div>

          <div className="w-12" /> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>

      {/* Resize handles */}
      {!isMaximized && (
        <>
          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
          />

          {/* Edges */}
          <div
            className="absolute top-0 left-3 right-3 h-1 cursor-n-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, 'n')}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, 's')}
          />
          <div
            className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, 'w')}
          />
          <div
            className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
          />
        </>
      )}
    </motion.div>
  )
}
