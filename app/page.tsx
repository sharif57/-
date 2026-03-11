'use client'

import { useState, useEffect } from 'react'
import { Bookmark, Clock, Search, Volume2 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SurahList from '@/components/SurahList'
import SurahDetail from '@/components/SurahDetail'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

export default function Home() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [bookmarks, setBookmarks] = useState<number[]>([])

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('quran-bookmarks')
    if (saved) {
      setBookmarks(JSON.parse(saved))
    }
  }, [])

  // Fetch surahs on mount
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah')
        const data = await response.json()
        setSurahs(data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching surahs:', error)
        setLoading(false)
      }
    }

    fetchSurahs()
  }, [])

  const toggleBookmark = (surahNumber: number) => {
    setBookmarks((prev) => {
      const updated = prev.includes(surahNumber)
        ? prev.filter((n) => n !== surahNumber)
        : [...prev, surahNumber]
      localStorage.setItem('quran-bookmarks', JSON.stringify(updated))
      return updated
    })
  }

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.number.toString().includes(searchQuery)
  )

  if (selectedSurah) {
    return (
      <SurahDetail
        surahNumber={selectedSurah}
        onBack={() => setSelectedSurah(null)}
        isBookmarked={bookmarks.includes(selectedSurah)}
        onBookmarkToggle={() => toggleBookmark(selectedSurah)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 animate-fade-in">
            কুরআন শরীফ
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            সম্পূর্ণ কুরআন - বাংলা অনুবাদ এবং আরবি পাঠসহ
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative flex items-center bg-white dark:bg-card rounded-xl shadow-lg overflow-hidden">
                <Search className="w-6 h-6 ml-4 text-primary" />
                <Input
                  type="text"
                  placeholder="সূরার নাম বা নম্বর খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white dark:bg-card rounded-lg p-4 shadow-md hover:shadow-lg transition hover:-translate-y-1">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Volume2 className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">মোট সূরা</span>
              </div>
              <p className="text-2xl font-bold text-primary">১১৪</p>
            </div>
            <div className="bg-white dark:bg-card rounded-lg p-4 shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bookmark className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">বুকমার্ক</span>
              </div>
              <p className="text-2xl font-bold text-accent">{bookmarks.length}</p>
            </div>
            <div className="bg-white dark:bg-card rounded-lg p-4 shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">আয়াত</span>
              </div>
              <p className="text-2xl font-bold text-secondary">৬,২৩৬</p>
            </div>
          </div>
        </div>

        {/* Surah List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <SurahList
            surahs={filteredSurahs}
            onSelectSurah={setSelectedSurah}
            bookmarkedSurahs={bookmarks}
            onToggleBookmark={toggleBookmark}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
