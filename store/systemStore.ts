import { create } from 'zustand'

export interface Window {
  id: string
  appId: string
  title: string
  x: number
  y: number
  width: number
  height: number
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

export interface App {
  id: string
  name: string
  icon: string
  component: React.ComponentType<any>
  defaultWidth?: number
  defaultHeight?: number
}

interface SystemStore {
  // Windows
  windows: Window[]
  activeWindowId: string | null
  maxZIndex: number
  
  // Apps
  runningApps: string[]
  
  // UI State
  isSpotlightOpen: boolean
  isMissionControlOpen: boolean
  isNotificationCenterOpen: boolean
  
  // Theme
  theme: 'light' | 'dark' | 'auto'
  accentColor: string
  
  // Dock
  dockSize: number
  dockMagnification: number
  dockAutoHide: boolean
  
  // Actions
  openWindow: (appId: string, app: App) => void
  closeWindow: (windowId: string) => void
  minimizeWindow: (windowId: string) => void
  maximizeWindow: (windowId: string) => void
  setActiveWindow: (windowId: string) => void
  updateWindowPosition: (windowId: string, x: number, y: number) => void
  updateWindowSize: (windowId: string, width: number, height: number) => void
  bringToFront: (windowId: string) => void
  
  toggleSpotlight: () => void
  toggleMissionControl: () => void
  toggleNotificationCenter: () => void
  
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  setAccentColor: (color: string) => void
  setDockSize: (size: number) => void
  setDockMagnification: (mag: number) => void
  setDockAutoHide: (autoHide: boolean) => void
}

export const useSystemStore = create<SystemStore>((set, get) => ({
  // Initial state
  windows: [],
  activeWindowId: null,
  maxZIndex: 100,
  runningApps: [],
  isSpotlightOpen: false,
  isMissionControlOpen: false,
  isNotificationCenterOpen: false,
  theme: 'light',
  accentColor: '#007AFF',
  dockSize: 64,
  dockMagnification: 1.5,
  dockAutoHide: false,

  // Window actions
  openWindow: (appId: string, app: App) => {
    const state = get()
    const existingWindow = state.windows.find(w => w.appId === appId)
    
    if (existingWindow) {
      // Focus existing window
      set({
        activeWindowId: existingWindow.id,
        windows: state.windows.map(w =>
          w.id === existingWindow.id ? { ...w, isMinimized: false, zIndex: state.maxZIndex + 1 } : w
        ),
        maxZIndex: state.maxZIndex + 1,
      })
      return
    }

    // Create new window
    const windowId = `window-${Date.now()}-${Math.random()}`
    const centerX = (window.innerWidth - (app.defaultWidth || 800)) / 2
    const centerY = (window.innerHeight - (app.defaultHeight || 600)) / 2 - 30 // Account for menu bar
    
    const newWindow: Window = {
      id: windowId,
      appId,
      title: app.name,
      x: centerX,
      y: Math.max(50, centerY),
      width: app.defaultWidth || 800,
      height: app.defaultHeight || 600,
      isMinimized: false,
      isMaximized: false,
      zIndex: state.maxZIndex + 1,
    }

    set({
      windows: [...state.windows, newWindow],
      activeWindowId: windowId,
      maxZIndex: state.maxZIndex + 1,
      runningApps: state.runningApps.includes(appId) ? state.runningApps : [...state.runningApps, appId],
    })
  },

  closeWindow: (windowId: string) => {
    const state = get()
    const window = state.windows.find(w => w.id === windowId)
    if (!window) return

    const remainingWindows = state.windows.filter(w => w.id !== windowId)
    const stillRunning = remainingWindows.some(w => w.appId === window.appId)

    set({
      windows: remainingWindows,
      activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
      runningApps: stillRunning ? state.runningApps : state.runningApps.filter(id => id !== window.appId),
    })
  },

  minimizeWindow: (windowId: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, isMinimized: true } : w
      ),
      activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
    }))
  },

  maximizeWindow: (windowId: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { 
          ...w, 
          isMaximized: !w.isMaximized,
          x: w.isMaximized ? w.x : 0,
          y: w.isMaximized ? w.y : 30,
          width: w.isMaximized ? w.width : window.innerWidth,
          height: w.isMaximized ? w.height : window.innerHeight - 30 - 80, // Menu bar + dock
        } : w
      ),
    }))
  },

  setActiveWindow: (windowId: string) => {
    set({ activeWindowId: windowId })
  },

  updateWindowPosition: (windowId: string, x: number, y: number) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, x, y } : w
      ),
    }))
  },

  updateWindowSize: (windowId: string, width: number, height: number) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, width, height } : w
      ),
    }))
  },

  bringToFront: (windowId: string) => {
    const state = get()
    set({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, zIndex: state.maxZIndex + 1 } : w
      ),
      maxZIndex: state.maxZIndex + 1,
      activeWindowId: windowId,
    })
  },

  // UI toggles
  toggleSpotlight: () => set(state => ({ isSpotlightOpen: !state.isSpotlightOpen })),
  toggleMissionControl: () => set(state => ({ isMissionControlOpen: !state.isMissionControlOpen })),
  toggleNotificationCenter: () => set(state => ({ isNotificationCenterOpen: !state.isNotificationCenterOpen })),

  // Settings
  setTheme: (theme) => set({ theme }),
  setAccentColor: (color) => set({ accentColor: color }),
  setDockSize: (size) => set({ dockSize: size }),
  setDockMagnification: (mag) => set({ dockMagnification: mag }),
  setDockAutoHide: (autoHide) => set({ dockAutoHide: autoHide }),
}))
