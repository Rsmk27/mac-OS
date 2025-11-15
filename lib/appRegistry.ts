import Finder from '@/apps/Finder'
import Browser from '@/apps/Browser'
import Notes from '@/apps/Notes'
import Terminal from '@/apps/Terminal'
import Photos from '@/apps/Photos'
import Music from '@/apps/Music'
import Calendar from '@/apps/Calendar'
import Settings from '@/apps/Settings'

export interface AppDefinition {
  id: string
  name: string
  icon: string
  component: React.ComponentType<any>
  defaultWidth?: number
  defaultHeight?: number
}

let appRegistry: AppDefinition[] = []

export function initAppRegistry() {
  if (appRegistry.length > 0) return appRegistry

  appRegistry = [
    {
      id: 'finder',
      name: 'Finder',
      icon: '📁',
      component: Finder,
      defaultWidth: 900,
      defaultHeight: 600,
    },
    {
      id: 'browser',
      name: 'Browser',
      icon: '🌐',
      component: Browser,
      defaultWidth: 1000,
      defaultHeight: 700,
    },
    {
      id: 'notes',
      name: 'Notes',
      icon: '📝',
      component: Notes,
      defaultWidth: 800,
      defaultHeight: 600,
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: '⌨️',
      component: Terminal,
      defaultWidth: 800,
      defaultHeight: 500,
    },
    {
      id: 'photos',
      name: 'Photos',
      icon: '🖼️',
      component: Photos,
      defaultWidth: 1000,
      defaultHeight: 700,
    },
    {
      id: 'music',
      name: 'Music',
      icon: '🎵',
      component: Music,
      defaultWidth: 900,
      defaultHeight: 600,
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: '📅',
      component: Calendar,
      defaultWidth: 800,
      defaultHeight: 600,
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: '⚙️',
      component: Settings,
      defaultWidth: 700,
      defaultHeight: 600,
    },
  ]

  return appRegistry
}

export function getAppRegistry(): AppDefinition[] {
  if (appRegistry.length === 0) {
    return initAppRegistry()
  }
  return appRegistry
}
