'use client'

import Window from './Window'
import { useSystemStore } from '@/store/systemStore'
import { getAppRegistry } from '@/lib/appRegistry'

export default function WindowManager() {
  const { windows } = useSystemStore()
  const apps = getAppRegistry()

  return (
    <>
      {windows.map((window) => {
        const app = apps.find(a => a.id === window.appId)
        if (!app) return null

        const AppComponent = app.component

        return (
          <Window
            key={window.id}
            id={window.id}
            appId={window.appId}
            title={window.title}
            x={window.x}
            y={window.y}
            width={window.width}
            height={window.height}
            zIndex={window.zIndex}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
          >
            <AppComponent windowId={window.id} />
          </Window>
        )
      })}
    </>
  )
}
