'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Copy,
  Bookmark,
  Loader2,
  Volume1,
  VolumeX,
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
  onClose: () => void
  isBookmarked: boolean
  onBookmarkToggle: () => void
}

export default function SurahDetailEnhanced({
  surahNumber,
  onClose,
  isBookmarked,
  onBookmarkToggle,
}: SurahDetailProps) {
  const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null)
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [banglaText, setBanglaText] = useState<{ [key: number]: string }>({})
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)
  const [volume, setVolume] = useState(100)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showTranslate, setShowTranslate] = useState(true)
  const [copied, setCopied] = useState(false)

  // Fetch Surah data and translations
  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true)

        // Fetch Arabic text
        const arabicRes = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}`
        )
        const arabicData = await arabicRes.json()

        if (arabicData.code === 200) {
          const surah = arabicData.data
          setSurahInfo({
            number: surah.number,
            name: surah.name,
            englishName: surah.englishName,
            numberOfAyahs: surah.numberOfAyahs,
            revelationType: surah.revelationType,
          })
          setAyahs(
            surah.ayahs.map((ayah: any) => ({
              number: ayah.number,
              text: ayah.text,
              numberInSurah: ayah.numberInSurah,
            }))
          )

          // Set audio URL
          const reciter = 'abdul_basit_murattal'
          setAudioUrl(
            `https://cdn.islamic.network/quran/audio/128/${reciter}/${surahNumber}.mp3`
          )
        }

        // Fetch Bengali translation
        const banglaRes = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}/bn.bengali`
        )
        const banglaData = await banglaRes.json()

        if (banglaData.code === 200) {
          const banglaMap: { [key: number]: string } = {}
          banglaData.data.ayahs.forEach((ayah: any) => {
            banglaMap[ayah.number] = ayah.text
          })
          setBanglaText(banglaMap)
        }
      } catch (error) {
        console.log('[v0] Error fetching surah:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSurah()
  }, [surahNumber])

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const togglePlayPause = async () => {
    if (!audioRef.current || !audioUrl) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log('[v0] Audio play error:', error)
    }
  }

  const handleProgressChange = (values: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = values[0]
      setCurrentTime(values[0])
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl mx-4 p-8 text-center">
          <div className="flex justify-center mb-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <p className="text-foreground">সূরা লোড হচ্ছে...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-auto z-50">
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-4xl mx-auto bg-white/95 dark:bg-card/95 backdrop-blur border border-white/10">
          {/* Header */}
          <div className="border-b border-border/30 p-6 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-card/95 backdrop-blur">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-2 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">ফিরে যান</span>
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {surahInfo?.englishName}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {surahInfo?.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBookmarkToggle}
              className="gap-2"
            >
              <Bookmark
                className={`w-5 h-5 ${
                  isBookmarked
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
              />
            </Button>
          </div>

          {/* Audio Player */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 border-b border-border/30">
            <p className="text-sm font-semibold mb-4 text-foreground">
              সম্পূর্ণ সূরা শুনুন
            </p>

            <div className="space-y-4">
              {/* Play Button and Progress */}
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  onClick={togglePlayPause}
                  className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 flex-shrink-0 shadow-lg"
                  disabled={!audioUrl}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-white ml-0.5" />
                  )}
                </Button>

                <div className="flex-1">
                  <Slider
                    value={[currentTime]}
                    onValueChange={handleProgressChange}
                    max={duration || 0}
                    step={0.1}
                    className="w-full cursor-pointer"
                    disabled={!audioUrl}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                <div className="flex items-center gap-2">
                  {volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Volume1 className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <Slider
                  value={[volume]}
                  onValueChange={(values) => setVolume(values[0])}
                  max={100}
                  step={1}
                  className="w-24 cursor-pointer"
                />
                <span className="text-xs text-muted-foreground min-w-fit w-10">
                  {volume}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTranslate(!showTranslate)}
                  className="ml-auto text-sm"
                >
                  {showTranslate ? 'অনুবাদ লুকান' : 'অনুবাদ দেখান'}
                </Button>
              </div>
            </div>

            <audio
              ref={audioRef}
              src={audioUrl}
              crossOrigin="anonymous"
              onLoadedMetadata={() => console.log('[v0] Audio metadata loaded')}
              onError={(e) => console.log('[v0] Audio error:', e)}
            />
          </div>

          {/* Surah Info */}
          <div className="p-6 border-b border-border/30 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                আয়াত
              </p>
              <p className="text-lg font-bold text-foreground">
                {surahInfo?.numberOfAyahs}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                অবতরণ
              </p>
              <p className="text-lg font-bold text-foreground">
                {surahInfo?.revelationType === 'Meccan'
                  ? 'মক্কী'
                  : 'মাদানী'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                সূরা নম্বর
              </p>
              <p className="text-lg font-bold text-foreground">
                {surahInfo?.number}
              </p>
            </div>
          </div>

          {/* Ayahs */}
          <div className="p-6 space-y-8">
            {ayahs.map((ayah) => (
              <div
                key={ayah.number}
                className="group animate-fade-in border-l-4 border-primary/30 pl-4 py-4 hover:border-primary/60 transition"
              >
                {/* Arabic Text */}
                <div className="mb-4 text-right">
                  <p
                    className="font-amiri text-2xl leading-relaxed text-foreground mb-2 bg-white dark:bg-card/50 p-4 rounded-lg border border-border/30"
                    dir="rtl"
                  >
                    {ayah.text}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    [{surahInfo?.englishName} {ayah.numberInSurah}]
                  </p>
                </div>

                {/* Bengali Translation */}
                {showTranslate && (
                  <div className="bg-accent/5 p-4 rounded-lg mb-4 border-l-4 border-accent animate-fade-in">
                    <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide font-semibold">
                      বাংলা অনুবাদ
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed text-foreground highlight-translation">
                      {banglaText[ayah.number] || 'অনুবাদ পাওয়া যায়নি'}
                    </p>
                  </div>
                )}

                {/* Copy Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      `${ayah.text}\n\n${banglaText[ayah.number] || ''}`
                    )
                  }
                  className="gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <Copy className="w-4 h-4" />
                  <span className="text-xs">
                    {copied ? 'কপি করা হয়েছে' : 'কপি করুন'}
                  </span>
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
