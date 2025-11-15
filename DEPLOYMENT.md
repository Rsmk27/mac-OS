# Deployment Guide

## Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- Git

## Local Development

### Initial Setup

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

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## Production Deployment

### Option 1: Vercel (Recommended)

Vercel is the recommended platform as Next.js is created by Vercel.

#### Deploy from GitHub

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click "Deploy"

#### Deploy from CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

**Custom Domain:**
```bash
vercel domains add yourdomain.com
```

**Environment Variables:**
None currently required, but can be added in Vercel dashboard.

### Option 2: Netlify

#### Deploy from GitHub

1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Choose your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

#### Deploy from CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

**Netlify Configuration (`netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Option 3: Self-Hosted (Node.js Server)

#### Build and Run

```bash
# Build the application
npm run build

# Start production server (port 3000)
npm start
```

#### Using PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "macos-web" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

#### Nginx Reverse Proxy

Create `/etc/nginx/sites-available/macos-web`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/macos-web /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### SSL with Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Option 4: Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'
services:
  macos-web:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

#### Build and Run

```bash
# Build image
docker build -t macos-web .

# Run container
docker run -p 3000:3000 macos-web

# Or use docker-compose
docker-compose up -d
```

### Option 5: Static Export

For static hosting (GitHub Pages, S3, etc.):

#### Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

#### Build Static Files

```bash
npm run build
```

Output will be in the `out` directory.

#### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d out"

# Deploy
npm run deploy
```

## Environment Variables

Currently, no environment variables are required. If you need to add any:

### Create `.env.local`

```bash
# Example (not currently used)
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Access in Code

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

### Configure in Vercel

Vercel Dashboard → Project → Settings → Environment Variables

## Performance Optimization

### Enable Compression

Most platforms enable this by default. For self-hosted:

```javascript
// server.js (if using custom server)
const compression = require('compression')
app.use(compression())
```

### CDN Setup

#### Vercel
Automatic global CDN with edge caching.

#### Cloudflare
Add Cloudflare in front of your deployment:
1. Add site to Cloudflare
2. Update nameservers
3. Enable caching rules

### Caching Headers

Next.js handles this automatically. Custom headers can be added in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/public/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ]
}
```

## PWA Setup

### Generate Icons

```bash
# Install PWA asset generator
npm install -g pwa-asset-generator

# Generate icons (requires a source image)
pwa-asset-generator source-logo.png public --icon-only
```

### Service Worker (Future Implementation)

Create `public/sw.js`:

```javascript
const CACHE_NAME = 'macos-web-v1'
const urlsToCache = [
  '/',
  '/app/globals.css',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  )
})
```

Register in `app/layout.tsx`:

```typescript
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
  }
}, [])
```

## Monitoring & Analytics

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Google Analytics (Example)

```typescript
// lib/gtag.ts
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
```

## Troubleshooting

### Build Errors

**Error: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: Type errors**
```bash
npx tsc --noEmit
# Fix reported errors
```

### Runtime Errors

**Hydration mismatch**
- Check for client-only code in server components
- Ensure useState/useEffect are properly used

**Window not defined**
- Wrap client code in useEffect
- Use dynamic imports with ssr: false

```typescript
const Component = dynamic(() => import('./Component'), {
  ssr: false
})
```

### Performance Issues

**Slow initial load**
- Enable compression
- Use CDN
- Optimize images (already set to unoptimized for static export)

**Slow animations**
- Check browser DevTools Performance tab
- Reduce number of animated elements
- Use `will-change` CSS property sparingly

## Security

### Headers

Add security headers in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ]
}
```

### Content Security Policy

```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com;"
}
```

## Backup & Updates

### Backup
```bash
# Backup source code
git push origin main

# Backup database (if added later)
# Add backup scripts here
```

### Updates
```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Update Next.js
npm install next@latest react@latest react-dom@latest
```

## Support

For deployment issues:
- Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Vercel Support: https://vercel.com/support
- Netlify Support: https://www.netlify.com/support/

## Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test in production mode locally (`npm start`)
- [ ] Check all features work
- [ ] Verify responsive design
- [ ] Test on multiple browsers
- [ ] Run lighthouse audit
- [ ] Add custom domain (if desired)
- [ ] Set up monitoring/analytics
- [ ] Configure security headers
- [ ] Test PWA functionality
- [ ] Update README with deployment URL
