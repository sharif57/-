// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import {
//   ArrowLeft,
//   Play,
//   Pause,
//   Volume2,
//   Copy,
//   Bookmark,
//   Volume1,
//   VolumeX,
//   Check,
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
// import { Slider } from '@/components/ui/slider'

// interface Ayah {
//   number: number
//   text: string
//   numberInSurah: number
// }

// interface SurahInfo {
//   number: number
//   name: string
//   englishName: string
//   numberOfAyahs: number
//   revelationType: string
// }

// interface SurahDetailProps {
//   surahNumber: number
//   onBack: () => void
//   isBookmarked: boolean
//   onBookmarkToggle: () => void
// }

// export default function SurahDetail({
//   surahNumber,
//   onBack,
//   isBookmarked,
//   onBookmarkToggle,
// }: SurahDetailProps) {
//   const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null)
//   const [ayahs, setAyahs] = useState<Ayah[]>([])
//   const [banglaTranslations, setBanglaTranslations] = useState<{ [key: number]: string }>({})
//   const [loading, setLoading] = useState(true)
  
//   // Audio state
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [audioUrl, setAudioUrl] = useState('')
//   const [duration, setDuration] = useState(0)
//   const [currentTime, setCurrentTime] = useState(0)
//   const [volume, setVolume] = useState(100)
//   const [showTranslation, setShowTranslation] = useState(true)
//   const [copied, setCopied] = useState(false)
  
//   const audioRef = useRef<HTMLAudioElement>(null)

//   useEffect(() => {
//     fetchSurahData()
//   }, [surahNumber])

//   // Audio event listeners
//   useEffect(() => {
//     const audio = audioRef.current
//     if (!audio) return

//     const handlePlay = () => setIsPlaying(true)
//     const handlePause = () => setIsPlaying(false)
//     const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
//     const handleLoadedMetadata = () => setDuration(audio.duration)
//     const handleEnded = () => setIsPlaying(false)

//     audio.addEventListener('play', handlePlay)
//     audio.addEventListener('pause', handlePause)
//     audio.addEventListener('timeupdate', handleTimeUpdate)
//     audio.addEventListener('loadedmetadata', handleLoadedMetadata)
//     audio.addEventListener('ended', handleEnded)

//     return () => {
//       audio.removeEventListener('play', handlePlay)
//       audio.removeEventListener('pause', handlePause)
//       audio.removeEventListener('timeupdate', handleTimeUpdate)
//       audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
//       audio.removeEventListener('ended', handleEnded)
//     }
//   }, [])

//   // Volume control
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume / 100
//     }
//   }, [volume])

//   const fetchSurahData = async () => {
//     setLoading(true)
//     try {
//       // Fetch Surah info and Arabic text
//       const infoRes = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
//       const infoData = await infoRes.json()
      
//       if (infoData.code === 200) {
//         setSurahInfo(infoData.data)
//         setAyahs(infoData.data.ayahs)
//         // https://api.alquran.cloud/v1/ayah/22/ar.alafasy
//         // Set audio URL
//         // const audioUrl = `https://cdn.alquran.cloud/media/audio/Abdulbasit/mp3/${surahNumber.toString().padStart(3, '0')}.mp3`
//         const audioUrl = `https://api.alquran.cloud/v1/ayah/22/ar.alafasy`
//         setAudioUrl(audioUrl)
//       }

//       // Fetch Bangla translation
//       const banglaRes = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/bn.bengali`)
//       const banglaData = await banglaRes.json()
      
//       if (banglaData.code === 200) {
//         const translations: { [key: number]: string } = {}
//         banglaData.data.ayahs.forEach((ayah: any) => {
//           translations[ayah.number] = ayah.text
//         })
//         setBanglaTranslations(translations)
//       }
//     } catch (error) {
//       console.error('[v0] Error fetching Surah:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const togglePlayPause = async () => {
//     if (!audioRef.current) return
//     try {
//       if (isPlaying) {
//         audioRef.current.pause()
//       } else {
//         await audioRef.current.play()
//       }
//     } catch (error) {
//       console.error('[v0] Audio play error:', error)
//     }
//   }

//   const handleProgressChange = (values: number[]) => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = values[0]
//     }
//   }

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return '0:00'
//     const mins = Math.floor(seconds / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${mins}:${secs.toString().padStart(2, '0')}`
//   }

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
//         <Card className="p-8 text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
//           <p className="text-foreground">সূরা লোড হচ্ছে...</p>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto z-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 pb-20">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={onBack}
//             className="gap-2"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             ফিরে যান
//           </Button>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={onBookmarkToggle}
//           >
//             <Bookmark
//               className={`w-5 h-5 ${
//                 isBookmarked
//                   ? 'fill-accent text-accent'
//                   : 'text-muted-foreground'
//               }`}
//             />
//           </Button>
//         </div>

//         {/* Surah Info Card */}
//         <Card className="mb-6 p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
//           <div className="text-center mb-6">
//             <h1 className="text-4xl font-bold text-primary font-amiri mb-2">
//               {surahInfo?.name}
//             </h1>
//             <p className="text-lg text-foreground mb-4">{surahInfo?.englishName}</p>
//             <div className="flex flex-wrap justify-center gap-4 text-sm">
//               <div className="bg-white dark:bg-card rounded-lg px-4 py-2">
//                 <span className="text-muted-foreground">আয়াত: </span>
//                 <span className="font-semibold">{surahInfo?.numberOfAyahs}</span>
//               </div>
//               <div className="bg-white dark:bg-card rounded-lg px-4 py-2">
//                 <span className="text-muted-foreground">প্রকার: </span>
//                 <span className="font-semibold">
//                   {surahInfo?.revelationType === 'Meccan' ? 'মক্কী' : 'মাদানী'}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Audio Player */}
//           <div className="bg-white dark:bg-card rounded-lg p-4 space-y-4">
//             {/* Play Button and Progress */}
//             <div className="flex items-center gap-4">
//               <Button
//                 onClick={togglePlayPause}
//                 className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 flex-shrink-0"
//               >
//                 {isPlaying ? (
//                   <Pause className="w-6 h-6 text-white" />
//                 ) : (
//                   <Play className="w-6 h-6 text-white fill-white ml-0.5" />
//                 )}
//               </Button>
              
//               <div className="flex-1">
//                 <Slider
//                   value={[currentTime]}
//                   onValueChange={handleProgressChange}
//                   max={duration || 0}
//                   step={0.1}
//                   className="w-full"
//                 />
//                 <div className="flex justify-between text-xs text-muted-foreground mt-1">
//                   <span>{formatTime(currentTime)}</span>
//                   <span>{formatTime(duration)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Volume Control */}
//             <div className="flex items-center gap-3 pt-2 border-t border-border/30">
//               {volume === 0 ? (
//                 <VolumeX className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//               ) : (
//                 <Volume1 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
//               )}
//               <Slider
//                 value={[volume]}
//                 onValueChange={(values) => setVolume(values[0])}
//                 max={100}
//                 step={1}
//                 className="w-20"
//               />
//               <span className="text-xs text-muted-foreground w-10">{volume}%</span>
              
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setShowTranslation(!showTranslation)}
//                 className="ml-auto text-sm"
//               >
//                 {showTranslation ? 'অনুবাদ লুকান' : 'অনুবাদ দেখান'}
//               </Button>
//             </div>

//             <audio
//               ref={audioRef}
//               src={audioUrl}
//               crossOrigin="anonymous"
//               onError={(e) => console.log('[v0] Audio error:', e)}
//             />
//           </div>
//         </Card>

//         {/* Ayahs */}
//         <div className="space-y-4">
//           {ayahs.map((ayah, index) => (
//             <Card key={ayah.number} className="p-6 hover:shadow-lg transition-shadow">
//               {/* Ayah Number */}
//               <div className="text-right mb-4">
//                 <span className="inline-block bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
//                   {ayah.numberInSurah}
//                 </span>
//               </div>

//               {/* Arabic Text */}
//               <p className="text-right text-xl leading-loose font-amiri text-foreground mb-6 p-4 bg-gradient-to-l from-primary/5 to-transparent rounded-lg">
//                 {ayah.text}
//               </p>

//               {/* Bangla Translation */}
//               {showTranslation && (
//                 <div className="bg-accent/5 p-4 rounded-lg mb-4 border-l-4 border-accent">
//                   <p className="text-base leading-relaxed text-foreground">
//                     {banglaTranslations[ayah.number] || 'অনুবাদ পাওয়া যায়নি'}
//                   </p>
//                 </div>
//               )}

//               {/* Copy Button */}
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => copyToClipboard(ayah.text)}
//                 className="text-xs gap-2"
//               >
//                 {copied ? (
//                   <>
//                     <Check className="w-4 h-4" />
//                     কপি হয়েছে
//                   </>
//                 ) : (
//                   <>
//                     <Copy className="w-4 h-4" />
//                     কপি করুন
//                   </>
//                 )}
//               </Button>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Copy,
  Bookmark,
  Volume1,
  VolumeX,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

interface Ayah {
  number: number
  text: string
  numberInSurah: number
}

interface SurahInfo {
  number: number
  name: string
  englishName: string
  numberOfAyahs: number
  revelationType: string
}

interface SurahDetailProps {
  surahNumber: number
  onBack: () => void
  isBookmarked: boolean
  onBookmarkToggle: () => void
}

export default function SurahDetail({
  surahNumber,
  onBack,
  isBookmarked,
  onBookmarkToggle,
}: SurahDetailProps) {
  const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null)
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [banglaTranslations, setBanglaTranslations] = useState<{ [key: number]: string }>({})
  const [ayahAudioUrls, setAyahAudioUrls] = useState<{ [key: number]: string }>({})
  const [loading, setLoading] = useState(true)

  // Audio state
  const [currentAyahPlaying, setCurrentAyahPlaying] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(100)
  const [showTranslation, setShowTranslation] = useState(true)
  const [copied, setCopied] = useState<number | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    fetchSurahData()
  }, [surahNumber])

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration || 0)

    const handleEnded = () => {
      setIsPlaying(false)
      // Play next ayah automatically
      if (currentAyahPlaying !== null) {
        const currentIndex = ayahs.findIndex(a => a.numberInSurah === currentAyahPlaying)
        if (currentIndex < ayahs.length - 1) {
          const nextAyah = ayahs[currentIndex + 1]
          playAyah(nextAyah.numberInSurah)
        } else {
          setCurrentAyahPlaying(null)
        }
      }
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [ayahs, currentAyahPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const fetchSurahData = async () => {
    setLoading(true)
    try {
      // 1. Arabic + basic info
      const infoRes = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
      const infoData = await infoRes.json()

      if (infoData.code === 200) {
        setSurahInfo(infoData.data)
        setAyahs(infoData.data.ayahs)
      }

      // 2. Bangla translation
      const banglaRes = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/bn.bengali`)
      const banglaData = await banglaRes.json()

      if (banglaData.code === 200) {
        const translations: { [key: number]: string } = {}
        banglaData.data.ayahs.forEach((ayah: any) => {
          translations[ayah.number] = ayah.text
        })
        setBanglaTranslations(translations)
      }

      // 3. Fetch audio URLs for each ayah (ar.alafasy)
      const audioPromises = Array.from({ length: infoData.data.numberOfAyahs }, (_, i) => {
        const ayahInSurah = i + 1
        return fetch(`https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahInSurah}/ar.alafasy`)
          .then(res => res.json())
          .then(data => {
            if (data.code === 200 && data.data?.audio) {
              return { numberInSurah: ayahInSurah, url: data.data.audio }
            }
            return null
          })
          .catch(() => null)
      })

      const audioResults = await Promise.all(audioPromises)
      const urlsMap: { [key: number]: string } = {}

      audioResults.forEach(result => {
        if (result) urlsMap[result.numberInSurah] = result.url
      })

      setAyahAudioUrls(urlsMap)
    } catch (error) {
      console.error('Error fetching Surah data:', error)
    } finally {
      setLoading(false)
    }
  }

  const playAyah = (ayahNumberInSurah: number) => {
    if (!audioRef.current) return

    const url = ayahAudioUrls[ayahNumberInSurah]
    if (!url) {
      console.warn(`No audio URL for ayah ${ayahNumberInSurah}`)
      return
    }

    // If already playing this ayah → just toggle pause/play
    if (currentAyahPlaying === ayahNumberInSurah) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(e => console.error('Play error:', e))
      }
      return
    }

    // Change to new ayah
    setCurrentAyahPlaying(ayahNumberInSurah)
    audioRef.current.src = url
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(e => console.error('Auto-play prevented:', e))
  }

  const togglePlayPauseCurrent = () => {
    if (!audioRef.current || currentAyahPlaying === null) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.error(e))
    }
  }

  const handleProgressChange = (values: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = values[0]
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const copyToClipboard = (text: string, ayahNumber: number) => {
    navigator.clipboard.writeText(text)
    setCopied(ayahNumber)
    setTimeout(() => setCopied(null), 2000)
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-foreground">সূরা লোড হচ্ছে...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto z-50 py-8">
      <div className="max-w-4xl mx-auto px-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            ফিরে যান
          </Button>
          <Button variant="ghost" size="sm" onClick={onBookmarkToggle}>
            <Bookmark
              className={`w-5 h-5 ${isBookmarked ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
            />
          </Button>
        </div>

        {/* Surah Info Card */}
        <Card className="mb-6 p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-primary font-amiri mb-2">{surahInfo?.name}</h1>
            <p className="text-lg text-foreground mb-4">{surahInfo?.englishName}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white dark:bg-card rounded-lg px-4 py-2">
                <span className="text-muted-foreground">আয়াত: </span>
                <span className="font-semibold">{surahInfo?.numberOfAyahs}</span>
              </div>
              <div className="bg-white dark:bg-card rounded-lg px-4 py-2">
                <span className="text-muted-foreground">প্রকার: </span>
                <span className="font-semibold">
                  {surahInfo?.revelationType === 'Meccan' ? 'মক্কী' : 'মাদানী'}
                </span>
              </div>
            </div>
          </div>

          {/* Global Audio Controls */}
          <div className="bg-white dark:bg-card rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={togglePlayPauseCurrent}
                disabled={currentAyahPlaying === null}
                className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                )}
              </Button>

              <div className="flex-1">
                <Slider
                  value={[currentTime]}
                  onValueChange={handleProgressChange}
                  max={duration || 0}
                  step={0.1}
                  disabled={currentAyahPlaying === null}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-border/30">
              {volume === 0 ? (
                <VolumeX className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : volume < 50 ? (
                <Volume1 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <Volume2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
              <Slider
                value={[volume]}
                onValueChange={v => setVolume(v[0])}
                max={100}
                step={1}
                className="w-20"
              />
              <span className="text-xs text-muted-foreground w-10">{volume}%</span>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
                className="ml-auto text-sm"
              >
                {showTranslation ? 'অনুবাদ লুকান' : 'অনুবাদ দেখান'}
              </Button>
            </div>

            <audio
              ref={audioRef}
              crossOrigin="anonymous"
              onError={e => console.log('Audio error:', e)}
            />
          </div>
        </Card>

        {/* Ayahs */}
        <div className="space-y-4">
          {ayahs.map(ayah => (
            <Card key={ayah.number} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="inline-block bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  {ayah.numberInSurah}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => playAyah(ayah.numberInSurah)}
                  className={currentAyahPlaying === ayah.numberInSurah ? 'text-primary' : ''}
                >
                  {currentAyahPlaying === ayah.numberInSurah && isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
              </div>

              <p className="text-right text-xl leading-loose font-amiri text-foreground mb-6 p-4 bg-gradient-to-l from-primary/5 to-transparent rounded-lg">
                {ayah.text}
              </p>

              {showTranslation && (
                <div className="bg-accent/5 p-4 rounded-lg mb-4 border-l-4 border-accent">
                  <p className="text-base leading-relaxed text-foreground">
                    {banglaTranslations[ayah.number] || 'অনুবাদ পাওয়া যায়নি'}
                  </p>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(ayah.text, ayah.number)}
                className="text-xs gap-2"
              >
                {copied === ayah.number ? (
                  <>
                    <Check className="w-4 h-4" />
                    কপি হয়েছে
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    কপি করুন
                  </>
                )}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}