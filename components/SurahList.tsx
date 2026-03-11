'use client'

import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

interface SurahListProps {
  surahs: Surah[]
  onSelectSurah: (surahNumber: number) => void
  bookmarkedSurahs: number[]
  onToggleBookmark: (surahNumber: number) => void
}

export default function SurahList({
  surahs,
  onSelectSurah,
  bookmarkedSurahs,
  onToggleBookmark,
}: SurahListProps) {
  if (surahs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground mb-4">কোনো সূরা খুঁজে পাওয়া যায়নি</p>
        <p className="text-sm text-muted-foreground">অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs.map((surah, index) => (
        <Card
          key={surah.number}
          className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-card border border-border/50 hover:border-primary/50 animate-fade-in"
          onClick={() => onSelectSurah(surah.number)}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="p-6 relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">সূরা #{surah.number}</div>
                  <h3 className="text-2xl font-bold text-primary mb-1 font-amiri">{surah.name}</h3>
                  <p className="text-sm text-muted-foreground">{surah.englishName}</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleBookmark(surah.number)
                  }}
                  className="mt-0"
                >
                  <Bookmark 
                    className={`w-5 h-5 ${
                      bookmarkedSurahs.includes(surah.number)
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground hover:text-accent'
                    }`}
                  />
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{surah.englishNameTranslation}</p>

                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                  <span className="text-xs font-medium text-muted-foreground">
                    {surah.numberOfAyahs} আয়াত
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    surah.revelationType === 'Meccan'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-accent/10 text-accent'
                  }`}>
                    {surah.revelationType === 'Meccan' ? 'মক্কী' : 'মদীনী'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
