# Technical Documentation

## Architecture Overview

This macOS-style web operating system is built using a modern React-based architecture with Next.js 16, providing a desktop-like experience in the browser.

## Core Architecture

### 1. Window Manager System

The window management system is the heart of the application, handling all window operations.

**Components:**
- `WindowManager.tsx` - Orchestrates all open windows
- `Window.tsx` - Individual window component with drag/resize logic
- `systemStore.ts` - Zustand store managing window state

**Window State:**
```typescript
interface Window {
  id: string          // Unique identifier
  appId: string       // Reference to app definition
  title: string       // Window title
  x, y: number        // Position
  width, height: number // Dimensions
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number      // Layering
}
```

**Operations:**
- `openWindow()` - Creates new window or focuses existing
- `closeWindow()` - Removes window and updates running apps
- `minimizeWindow()` - Hides window
- `maximizeWindow()` - Toggles fullscreen
- `bringToFront()` - Updates z-index for layering
- `updateWindowPosition()` - Moves window
- `updateWindowSize()` - Resizes window

### 2. App Registry System

The app registry provides a centralized way to manage all applications.

**Location:** `lib/appRegistry.ts`

**App Definition:**
```typescript
interface AppDefinition {
  id: string                    // Unique app ID
  name: string                  // Display name
  icon: string                  // Emoji icon
  component: React.ComponentType // App component
  defaultWidth?: number         // Default window width
  defaultHeight?: number        // Default window height
}
```

**Adding a New App:**

1. Create your app component in `apps/YourApp.tsx`:
```typescript
interface YourAppProps {
  windowId: string  // Required for window identification
}

export default function YourApp({ windowId }: YourAppProps) {
  return (
    <div className="w-full h-full">
      {/* Your app content */}
    </div>
  )
}
```

2. Register in `lib/appRegistry.ts`:
```typescript
import YourApp from '@/apps/YourApp'

// Add to the registry array
{
  id: 'yourapp',
  name: 'Your App',
  icon: '🎯',  // Choose an emoji
  component: YourApp,
  defaultWidth: 800,
  defaultHeight: 600,
}
```

3. The app automatically appears in:
   - The Dock
   - Spotlight search
   - Menu bar when active

### 3. State Management

**Zustand Store (`store/systemStore.ts`):**

```typescript
useSystemStore((state) => ({
  // Windows
  windows: state.windows,
  openWindow: state.openWindow,
  closeWindow: state.closeWindow,
  
  // UI State
  isSpotlightOpen: state.isSpotlightOpen,
  toggleSpotlight: state.toggleSpotlight,
  
  // Settings
  theme: state.theme,
  setTheme: state.setTheme,
  dockSize: state.dockSize,
  setDockSize: state.setDockSize,
}))
```

**Usage in Components:**
```typescript
const { openWindow, windows } = useSystemStore()

// Open an app
openWindow('finder', appDefinition)

// Access windows
windows.map(window => ...)
```

### 4. Keyboard Shortcuts System

**Current Shortcuts:**
- `Cmd/Ctrl + Space` - Toggle Spotlight
- `Escape` - Close Spotlight

**Implementation:**
Located in `components/Desktop.tsx`:

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
      e.preventDefault()
      toggleSpotlight()
    }
  }
  
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [toggleSpotlight])
```

**Adding New Shortcuts:**
1. Add handler in Desktop component
2. Update documentation
3. Consider conflicts with browser shortcuts

### 5. Storage Model

**LocalStorage Usage:**

Currently used for:
- Notes app content (per-window)
- Future: Settings persistence

**Example (Notes app):**
```typescript
// Save
localStorage.setItem(`notes-${windowId}`, content)

// Load
const saved = localStorage.getItem(`notes-${windowId}`)
```

**Future: IndexedDB Integration**

For complex data (files, photos):
```typescript
import { openDB } from 'idb'

const db = await openDB('macos-web', 1, {
  upgrade(db) {
    db.createObjectStore('files')
    db.createObjectStore('photos')
  }
})
```

### 6. Theming Engine

**Color System:**

Defined in `app/globals.css`:
```css
:root {
  --color-macos-blue: #007aff;
  --color-macos-red: #ff3b30;
  --color-macos-yellow: #ffcc00;
  --color-macos-green: #34c759;
}
```

**Tailwind CSS v4:**
Using CSS-based configuration with `@import "tailwindcss"`

**Theme Switching:**
```typescript
const { theme, setTheme } = useSystemStore()
setTheme('dark') // 'light' | 'dark' | 'auto'
```

**Custom Utilities:**
- `.glass-effect` - Translucent blur effect
- `.window-shadow` - Elevated shadow
- `.dock-shadow` - Dock shadow
- `.no-select` - Disable text selection

### 7. Animation System

**Framer Motion:**

**Window Animations:**
```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
>
```

**Dock Magnification:**
```typescript
<motion.div
  animate={{ scale }}
  transition={{ 
    type: 'spring', 
    stiffness: 400, 
    damping: 25 
  }}
>
```

**Custom Animations:**
Defined in Tailwind config (future implementation for v3):
- `windowOpen` - Window opening
- `windowMinimize` - Minimize to dock
- `dockBounce` - Dock icon bounce

## Component Hierarchy

```
App (layout.tsx)
└── Desktop
    ├── MenuBar
    │   ├── System Menu
    │   ├── Active App Menu
    │   └── Status Icons
    ├── WindowManager
    │   └── Window[] (multiple instances)
    │       └── App Component
    ├── Dock
    │   └── App Icons[]
    └── Spotlight (conditional)
        └── Search Results[]
```

## Performance Optimizations

### 1. Code Splitting
Next.js automatically splits each app component.

### 2. Memoization
Use React.memo for expensive components:
```typescript
export default React.memo(Window)
```

### 3. Event Handler Optimization
Debounce resize/drag handlers if needed:
```typescript
const debouncedUpdate = useMemo(
  () => debounce((x, y) => updateWindowPosition(id, x, y), 16),
  [id, updateWindowPosition]
)
```

### 4. Zustand Selectors
Use selective subscriptions:
```typescript
const windows = useSystemStore((state) => state.windows)
// Only re-renders when windows change
```

## Security Considerations

### 1. Browser App Sandboxing
```typescript
<iframe
  src={url}
  sandbox="allow-scripts allow-same-origin"
/>
```

### 2. XSS Prevention
- All user input is sanitized
- No `dangerouslySetInnerHTML` used
- Content Security Policy recommended

### 3. LocalStorage Limits
- 5-10MB limit per domain
- Implement quota checking for large data

## PWA Implementation

### Current Status
- Basic manifest.json
- App icons needed (192x192, 512x512)

### Future Implementation
Create `public/sw.js`:
```javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/app/globals.css',
        // Add critical assets
      ])
    })
  )
})
```

Register in layout.tsx:
```typescript
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
  }
}, [])
```

## Accessibility

### Current Implementation
- Semantic HTML elements
- Keyboard navigation for Spotlight
- ARIA labels on buttons

### Future Improvements
- Full keyboard navigation for all windows
- Screen reader announcements
- Focus management
- ARIA live regions for notifications
- Contrast ratios: WCAG AA compliance

## Browser Compatibility

**Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Features:**
- CSS backdrop-filter
- Framer Motion (React 18+)
- Modern JavaScript (ES2020)

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy .next folder
```

### Environment Variables
None required currently.

### Build Output
- Static export possible with `output: 'export'` in next.config.js
- Current: Server-side rendering capable

## Troubleshooting

### Issue: Windows not draggable
- Check z-index conflicts
- Ensure event handlers are attached
- Verify window state in Zustand

### Issue: Dock icons not showing
- Check appRegistry initialization
- Verify emoji rendering in browser
- Check Dock component mounting

### Issue: Build fails
- Clear `.next` folder
- Run `npm install` again
- Check Node.js version (18+)

### Issue: Animations stuttering
- Check Framer Motion version
- Reduce number of animated elements
- Use `will-change` CSS property

## API Reference

See inline TypeScript types for complete API documentation. All major functions are typed and include JSDoc comments where needed.
