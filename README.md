# macOS Web Operating System

An immersive, high-fidelity macOS-style web operating system that runs entirely in your browser.

## ⚠️ Disclaimer

**This is an educational demo project. Not affiliated with Apple Inc.**

All UI elements are inspired by macOS but redesigned to be original and avoid copyright issues. No Apple assets, fonts, or branding are used.

## ✨ Features

### Core UI Components
- **Desktop Environment**: Clean wallpaper with gradient background
- **Menu Bar**: Translucent, blurred top bar with system menus and status icons
- **Dock**: Fully functional dock with:
  - Smooth magnification on hover
  - Running app indicators
  - Customizable size and magnification

### Window Management
- **Draggable Windows**: Click and drag from title bar
- **Resizable**: Resize from any edge or corner
- **Window Controls**: Close, minimize, maximize buttons
- **Smooth Animations**: Powered by Framer Motion
- **Multi-window Support**: Open multiple apps simultaneously

### System Apps

1. **Finder** 📁
   - File/folder browser
   - Grid and list views
   - Search functionality
   - Mock file system

2. **Browser** 🌐
   - Minimal web browser with iframe
   - URL navigation
   - Basic controls (back, forward, reload)

3. **Notes** 📝
   - Simple text editor
   - Auto-save functionality
   - Clean, minimal interface

4. **Terminal** ⌨️
   - Simulated command shell
   - Pre-defined commands: ls, cd, echo, help, clear, date, whoami
   - Command history

5. **Photos** 🖼️
   - Image grid view
   - Upload photos from local device
   - Full-screen image viewer
   - Placeholder images included

6. **Music** 🎵
   - Music player interface
   - Play/pause controls
   - Track listing
   - Sample tracks

7. **Calendar** 📅
   - Monthly and list views
   - Event management
   - Month navigation

8. **Settings** ⚙️
   - Theme selection (Light/Dark/Auto)
   - Accent color customization
   - Dock size and magnification controls
   - Auto-hide dock option

### Global Features

- **Spotlight Search** (Cmd/Ctrl + Space)
  - Quick app launcher
  - Keyboard navigation
  - Fuzzy search

- **Keyboard Shortcuts**
  - Cmd/Ctrl + Space: Open Spotlight
  - ESC: Close Spotlight

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Rsmk27/mac-OS.git
cd mac-OS

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Storage**: LocalStorage (for notes)
- **Icons**: Emoji-based (original, no Apple assets)

## 📁 Project Structure

```
mac-OS/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Desktop.tsx        # Main desktop component
│   ├── MenuBar.tsx        # Top menu bar
│   ├── Dock.tsx           # Bottom dock
│   ├── Window.tsx         # Window component
│   ├── WindowManager.tsx  # Window management
│   └── Spotlight.tsx      # Spotlight search
├── apps/                  # System applications
│   ├── Finder.tsx
│   ├── Browser.tsx
│   ├── Notes.tsx
│   ├── Terminal.tsx
│   ├── Photos.tsx
│   ├── Music.tsx
│   ├── Calendar.tsx
│   └── Settings.tsx
├── store/                 # State management
│   └── systemStore.ts     # Zustand store
├── lib/                   # Utilities
│   └── appRegistry.ts     # App registry
└── public/                # Static assets
    └── manifest.json      # PWA manifest
```

## 🎨 Design Tokens

### Colors
- **macOS Blue**: #007AFF
- **macOS Gray Scale**: 50-900 with custom shades
- Custom accent colors available in Settings

### Animations
- Window open/close: 0.3s ease-out
- Dock magnification: Spring animation (stiffness: 400, damping: 25)

### Shadows
- Window shadow: Elevated with border
- Dock shadow: Prominent with glass effect

## 🔧 Adding New Apps

1. Create a new component in `apps/`:
```typescript
interface MyAppProps {
  windowId: string
}

export default function MyApp({ windowId }: MyAppProps) {
  return <div>My App Content</div>
}
```

2. Register in `lib/appRegistry.ts`:
```typescript
{
  id: 'myapp',
  name: 'My App',
  icon: '🎯',
  component: MyApp,
  defaultWidth: 800,
  defaultHeight: 600,
}
```

## 🎯 Performance

- Code-splitting for all apps
- Optimized re-renders with Zustand
- Smooth 60fps animations
- Lazy loading of components

## ♿ Accessibility

- Keyboard navigation support
- Semantic HTML structure
- ARIA labels (to be expanded)
- Proper focus management

## 🔒 Security

- Sandboxed iframes for Browser app
- No external dependencies with known vulnerabilities
- Client-side only (no backend required)

## 📝 License

ISC License - Educational purposes only

## 🙏 Acknowledgments

Inspired by macOS design principles but completely reimagined with original assets and code.

## 🐛 Known Limitations

- Browser app has limited functionality due to iframe restrictions
- No persistent storage for Finder files (uses mock data)
- Audio player doesn't have actual audio files (placeholder UI only)
- PWA features are basic (service worker not fully implemented)

## 🚧 Future Enhancements

- Mission Control (window overview)
- Notifications Center
- Multi-desktop support (Spaces)
- Drag-and-drop between apps
- Virtual file system with export/import
- Boot animation and login screen
- Full PWA offline support
- Advanced keyboard shortcuts
- More system preferences

## 📧 Contact

For issues, questions, or contributions, please open an issue on GitHub.

---

**Remember**: This is a demo project for educational purposes. Not affiliated with or endorsed by Apple Inc.
