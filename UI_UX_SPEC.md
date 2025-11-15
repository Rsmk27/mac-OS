# UI/UX Specification

## Design System

### Color Tokens

#### Primary Colors
```css
--color-macos-blue: #007aff     /* Primary accent, buttons, selections */
--color-macos-red: #ff3b30      /* Close button, warnings */
--color-macos-yellow: #ffcc00   /* Minimize button, caution */
--color-macos-green: #34c759    /* Maximize button, success */
```

#### Gray Scale
```css
Gray 50:  #f5f5f7  /* Lightest background */
Gray 100: #e8e8ed  /* Light backgrounds */
Gray 200: #d2d2d7  /* Borders, dividers */
Gray 300: #aeaeb2  /* Secondary text */
Gray 400: #8e8e93  /* Tertiary text */
Gray 500: #636366  /* Icon colors */
Gray 600: #48484a  /* Dark UI elements */
Gray 700: #3a3a3c  /* Darker backgrounds */
Gray 800: #2c2c2e  /* Dark mode backgrounds */
Gray 900: #1c1c1e  /* Darkest backgrounds */
```

#### Accent Color Options (Settings)
- Blue: #007AFF
- Purple: #7C3AED
- Pink: #EC4899
- Red: #EF4444
- Orange: #F59E0B
- Green: #10B981

### Typography

#### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Weights:**
- Light: 300 (large headings)
- Regular: 400 (body text)
- Medium: 500 (subheadings)
- Semibold: 600 (emphasis)
- Bold: 700 (strong emphasis)

#### Font Scales
- **Menu Bar**: 14px (0.875rem)
- **Window Title**: 14px (0.875rem)
- **Body Text**: 14px (0.875rem)
- **Small Text**: 12px (0.75rem)
- **Headings**: 18px-24px (1.125-1.5rem)

### Spacing Scale

Based on 4px base unit:
```
2px  (0.5 unit)  - Minimal spacing
4px  (1 unit)    - Tight spacing
8px  (2 units)   - Small spacing
12px (3 units)   - Default spacing
16px (4 units)   - Medium spacing
20px (5 units)   - Large spacing
24px (6 units)   - Extra large spacing
32px (8 units)   - Section spacing
```

### Border Radius Scale

```css
sm:     4px   /* Small elements */
base:   6px   /* Default */
md:     8px   /* Medium */
lg:     12px  /* Large, windows */
xl:     16px  /* Extra large */
2xl:    24px  /* Dock, spotlight */
full:   9999px /* Circles */
```

### Shadow Presets

#### Window Shadow
```css
.window-shadow {
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 0, 0, 0.1);
}
```

#### Dock Shadow
```css
.dock-shadow {
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}
```

#### Button Hover
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
```

### Glass Morphism Effect

```css
.glass-effect {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.dark .glass-effect {
  background: rgba(0, 0, 0, 0.3);
}
```

### Animation Curves

#### Easing Functions
```typescript
// Smooth entrance
easeOut: cubic-bezier(0.16, 1, 0.3, 1)

// Interactive elements
easeInOut: cubic-bezier(0.4, 0, 0.2, 1)

// Quick exit
easeIn: cubic-bezier(0.4, 0, 1, 1)

// Spring (Framer Motion)
spring: { stiffness: 400, damping: 25 }
```

#### Duration Scale
```
Fast:     150ms  /* Hover effects */
Base:     200ms  /* Default transitions */
Medium:   300ms  /* Window animations */
Slow:     500ms  /* Major transitions */
```

## Component Specifications

### Menu Bar

**Dimensions:**
- Height: 32px (2rem)
- Padding: 0 16px

**Appearance:**
- Background: Glass effect with blur
- Border: Bottom 1px rgba(0, 0, 0, 0.1)
- Z-index: 50

**Elements:**
- System icon: 20px × 20px
- Status icons: 16px × 16px
- Text: 14px medium weight
- Spacing: 16px between elements

### Dock

**Dimensions:**
- Default icon size: 64px (configurable 48-96px)
- Padding: 8px
- Margin from bottom: 8px
- Border radius: 24px

**Behavior:**
- Magnification: 1.0-2.0x (configurable)
- Hover distance: Adjacent icons at 50% magnification
- Animation: Spring with stiffness 400, damping 25

**Appearance:**
- Background: Glass effect
- Shadow: Prominent with inner border
- Icon spacing: 8px

**Running Indicator:**
- Size: 4px diameter
- Position: 4px below icon
- Color: Gray 700 / Gray 300 (dark mode)

### Windows

**Dimensions:**
- Minimum: 400px × 300px
- Maximum: Viewport size
- Default varies by app (800×600 typical)

**Title Bar:**
- Height: 40px
- Padding: 0 16px
- Background: Gray 100 / Gray 700 (dark)
- Border bottom: 1px

**Control Buttons:**
- Size: 12px diameter
- Spacing: 8px apart
- Colors: Red (#FF3B30), Yellow (#FFCC00), Green (#34C759)
- Hover: Slight brightness increase

**Window Body:**
- Background: White / Gray 800 (dark)
- Padding: Varies by app
- Overflow: Auto with custom scrollbar

**Resize Handles:**
- Corner: 12px × 12px
- Edge: 4px thick
- Cursor: Appropriate resize cursor

### Spotlight

**Dimensions:**
- Width: 640px max (90% on mobile)
- Max height: 384px
- Position: Top 128px, centered
- Padding: 16px

**Input:**
- Height: 48px
- Font size: 24px (1.5rem)
- Padding: 16px
- Border: None
- Focus: No outline (design choice)

**Results:**
- Item height: 48px
- Padding: 12px 16px
- Icon size: 40px × 40px
- Hover: Background Gray 100 / Gray 700
- Selected: Background Blue 50 / Blue 900/30

**Animation:**
- Entrance: Scale 0.9 → 1.0, opacity 0 → 1
- Duration: 200ms
- Easing: easeOut

### Buttons

#### Primary Button
```css
background: #007AFF;
color: white;
padding: 8px 16px;
border-radius: 6px;
font-weight: 500;
transition: all 200ms;

&:hover {
  background: #0056CC;
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
}
```

#### Secondary Button
```css
background: transparent;
color: #007AFF;
border: 1px solid #007AFF;
padding: 8px 16px;
border-radius: 6px;

&:hover {
  background: rgba(0, 122, 255, 0.1);
}
```

#### Icon Button
```css
width: 32px;
height: 32px;
border-radius: 6px;
display: flex;
align-items: center;
justify-content: center;

&:hover {
  background: rgba(0, 0, 0, 0.05);
}
```

### Forms

#### Text Input
```css
height: 36px;
padding: 0 12px;
border: 1px solid #D2D2D7;
border-radius: 6px;
font-size: 14px;
transition: border-color 200ms;

&:focus {
  border-color: #007AFF;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}
```

#### Checkbox
```css
width: 20px;
height: 20px;
border: 2px solid #D2D2D7;
border-radius: 4px;

&:checked {
  background: #007AFF;
  border-color: #007AFF;
}
```

#### Range Slider
```css
height: 4px;
border-radius: 2px;
background: #E8E8ED;

&::-webkit-slider-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #007AFF;
  cursor: pointer;
}
```

## Interaction States

### Hover States
- Buttons: Background darkens 10%
- Dock icons: Scale up with spring animation
- List items: Background Gray 100/700

### Active/Pressed States
- Buttons: Background darkens 20%
- Scale: 0.98 (slight depression)

### Focus States
- Keyboard focus: 3px blue ring with opacity 0.5
- No focus on click (mouse users)

### Disabled States
- Opacity: 0.5
- Cursor: not-allowed
- Remove hover effects

## Responsive Behavior

### Breakpoints
```css
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

### Mobile Adaptations
- Dock: Smaller icons (48px)
- Windows: Full screen on mobile
- Menu bar: Condensed or hidden
- Spotlight: Full width minus 32px margin

## Accessibility Specifications

### Contrast Ratios (WCAG AA)

- **Normal Text**: Minimum 4.5:1
  - Example: #48484A on #FFFFFF = 9.1:1 ✅
  
- **Large Text** (18px+): Minimum 3:1
  - Example: #8E8E93 on #FFFFFF = 4.6:1 ✅

- **UI Components**: Minimum 3:1
  - Border: #D2D2D7 on #FFFFFF = 1.6:1 ⚠️ (use darker border on focus)

### Focus Indicators
```css
*:focus-visible {
  outline: 3px solid rgba(0, 122, 255, 0.5);
  outline-offset: 2px;
}
```

### Keyboard Navigation
- Tab order: Logical (menu → windows → dock)
- Arrow keys: Spotlight navigation
- Escape: Close modals
- Cmd+W: Close window (planned)

### Screen Reader
- ARIA labels on all icon buttons
- ARIA live regions for notifications
- Semantic HTML structure
- Alt text for all images

## Motion & Animation

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Examples

#### Window Open
```typescript
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.3, ease: 'easeOut' }}
```

#### Dock Magnification
```typescript
whileHover={{ scale: 1.5 }}
transition={{ type: 'spring', stiffness: 400, damping: 25 }}
```

#### Spotlight Appear
```typescript
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.2 }}
```

## Dark Mode

### Color Adjustments
- Backgrounds: Inverted (white → dark gray)
- Text: Inverted contrast
- Borders: Lighter (better visibility)
- Shadows: More pronounced

### Implementation
```css
.dark {
  color-scheme: dark;
}

.dark .glass-effect {
  background: rgba(0, 0, 0, 0.3);
}
```

### Auto Mode
Follows system preference:
```typescript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
```

## Icon System

### Emoji Icons
Using Unicode emojis for all system apps:
- 📁 Folder/Finder
- 🌐 Browser
- 📝 Notes
- ⌨️ Terminal
- 🖼️ Photos
- 🎵 Music
- 📅 Calendar
- ⚙️ Settings

### Size Guidelines
- Dock: 32px (emoji font-size)
- Menu bar: 20px
- Spotlight: 40px
- Window title: 16px

## Performance Guidelines

### Animation Performance
- Use `transform` and `opacity` only
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Target 60fps (16.67ms per frame)

### Render Optimization
- Memoize expensive components
- Use React.memo for pure components
- Lazy load apps (code splitting)
- Virtualize long lists

This specification ensures a consistent, accessible, and performant user experience across the entire application.
