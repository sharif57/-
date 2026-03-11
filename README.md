# কুরআন শরীফ - সম্পূর্ণ ডিজিটাল কুরআন অ্যাপ্লিকেশন

A beautiful, modern Islamic-themed Quran application with complete functionality including audio playback, translations, bookmarks, and stunning animated backgrounds.

## Features

### Core Functionality
✅ **সম্পূর্ণ ১১৪ সূরা** - All 114 Surahs with complete Arabic text  
✅ **৬,২৩৬ আয়াত** - Full Quranic text with proper formatting  
✅ **বাংলা অনুবাদ** - Complete Bengali translations for all verses  
✅ **অডিও রেসিটেশন** - High-quality audio recitation by Abdulbasit Mujawwad  
✅ **রিয়েল-টাইম সার্চ** - Instant search by Surah name, English name, or number  

### Audio Player
✅ **Play/Pause Control** - Full audio playback control  
✅ **Progress Bar** - Seekable timeline with current time and duration  
✅ **Volume Control** - Adjustable volume from 0-100% with visual indicator  
✅ **Time Display** - Shows current playback time and total duration  
✅ **Auto-play Handling** - Proper event handling for audio state management  

### Design & UX
✅ **Islamic Animated Background** 
  - Full-screen animated night sky with stars
  - Glowing crescent moon with glow effect
  - Mosque silhouettes with domes and minarets
  - Floating lanterns with smooth animations
  - Islamic geometric patterns

✅ **Glassmorphism UI**
  - Modern frosted glass effect cards
  - Smooth blur backdrop filters
  - Elegant transparency layers
  - Beautiful color overlays

✅ **Smooth Animations**
  - Fade-in animations with staggered delays
  - Hover effects with scale and shadow transitions
  - Twinkling stars in background
  - Floating lantern movement
  - Smooth scroll behavior

✅ **Responsive Design**
  - Mobile-first approach
  - Perfect on all device sizes
  - Touch-friendly controls
  - Adaptive layouts

### Features
✅ **Bookmark System** - Save favorite Surahs (stored in localStorage)  
✅ **Translation Toggle** - Show/hide Bengali translations  
✅ **Copy to Clipboard** - Copy Arabic text and translations  
✅ **Dark/Light Mode** - Complete theme support  
✅ **Auto-translate** - Automatically display translations  

## Technical Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4 with custom animations
- **UI Components**: shadcn/ui components
- **Icons**: Lucide React
- **API**: Al Quran Cloud API (free, no authentication required)
- **Audio**: HTML5 Audio API with full control
- **Canvas**: HTML5 Canvas for animated background
- **Storage**: Browser localStorage for bookmarks

## File Structure

```
components/
├── IslamicBackground.tsx      # Animated background with canvas
├── SurahDetailEnhanced.tsx     # Enhanced surah view with audio
├── SurahList.tsx              # Surah grid with search
├── Header.tsx                 # Navigation header
├── Footer.tsx                 # Footer component
└── ui/                        # shadcn/ui components

app/
├── page.tsx                   # Main home page
├── layout.tsx                 # Root layout with fonts
└── globals.css                # Global styles & animations

lib/
└── quran-utils.ts            # Utility functions
```

## Installation & Setup

### Using shadcn CLI
```bash
npx shadcn-cli@latest init -d
# Select configuration as prompted
```

### Running Locally
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### Building for Production
```bash
npm run build
npm start
```

## API Endpoints Used

All data is fetched from the free **Al Quran Cloud API**:

1. **Get All Surahs**
   - Endpoint: `https://api.alquran.cloud/v1/surah`
   - Returns: List of all 114 Surahs with metadata

2. **Get Surah Text**
   - Endpoint: `https://api.alquran.cloud/v1/surah/{number}`
   - Returns: Arabic text of all verses

3. **Get Bengali Translation**
   - Endpoint: `https://api.alquran.cloud/v1/surah/{number}/bn.bengali`
   - Returns: Bengali translations for all verses

4. **Audio Recitation**
   - Source: `https://cdn.islamic.network/quran/audio/128/{reciter}/{surah}.mp3`
   - Reciter: Abdul Basit Murattal (clear, beautiful recitation)

## Audio Player Implementation

The audio player uses the HTML5 Audio API with complete control:

```typescript
// Key features:
- Real-time progress tracking (timeupdate event)
- Duration fetching (loadedmetadata event)
- Playback state management
- Volume control (0-100%)
- Seek functionality with slider
- Auto-stop on end
- Error handling
```

## Storage & Data Persistence

### Bookmarks (localStorage)
```javascript
// Stored as: 'quran-bookmarks'
// Format: Array of surah numbers
[1, 2, 5, 18, 36, ...]
```

## Colors & Theme

**Light Mode:**
- Primary (Emerald Green): `oklch(0.522 0.174 165.385)`
- Accent (Gold): `oklch(0.718 0.168 41.116)`
- Secondary (Light Orange): `oklch(0.87 0.15 70.08)`
- Background: `oklch(0.99 0.002 142.495)`

**Dark Mode:**
- Primary (Deep Blue): `oklch(0.12 0.01 257.528)`
- Accent (Gold): `oklch(0.718 0.168 41.116)`
- Background: Gradient from dark blue to deep teal

## Fonts

- **Body/UI**: Poppins (Sans-serif)
- **Arabic Text**: Amiri (Traditional Arabic)

## Performance Optimizations

- Canvas animations are optimized with RAF (requestAnimationFrame)
- Lazy loading for images and components
- Efficient event listeners with cleanup
- Minimal re-renders with proper state management
- CSS animations prefer transform and opacity

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Deployment

### Deploy to Vercel (Recommended)
```bash
vercel deploy
```

### Deploy to other platforms
- Supports any Node.js hosting
- Build: `npm run build`
- Start: `npm start`

## License

This project uses the free Al Quran Cloud API. Please respect their terms of service.

## Features Checklist

- [x] All 114 Surahs with complete text
- [x] Bengali translations
- [x] Audio playback with progress bar
- [x] Volume control (0-100%)
- [x] Real-time search
- [x] Bookmark system
- [x] Dark/Light mode
- [x] Islamic animated background
- [x] Glassmorphism UI
- [x] Smooth animations
- [x] Mobile responsive
- [x] Copy to clipboard
- [x] Translation toggle
- [x] Professional design
- [x] Fast performance

## Contact & Support

For issues or suggestions, please check the code or refer to the Al Quran Cloud API documentation.

---

**Made with ❤️ for the Ummah**

سبحان الله وبحمده، سبحان الله العظيم
