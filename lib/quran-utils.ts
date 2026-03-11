// Utility functions for Quran app

export const bengaliNumbers = {
  0: '০',
  1: '১',
  2: '২',
  3: '३',
  4: '४',
  5: '५',
  6: '६',
  7: '७',
  8: '८',
  9: '९',
}

export const convertTobengaliNumbers = (num: number | string): string => {
  return String(num)
    .split('')
    .map((digit) => bengaliNumbers[digit as keyof typeof bengaliNumbers] || digit)
    .join('')
}

export const getRevelationType = (type: string): string => {
  return type === 'Meccan' ? 'مكي (মক্কী)' : 'مدني (মদীনী)'
}

export const saveBookmarks = (bookmarks: number[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('quran-bookmarks', JSON.stringify(bookmarks))
  }
}

export const loadBookmarks = (): number[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('quran-bookmarks')
    return saved ? JSON.parse(saved) : []
  }
  return []
}

export const formatAyahText = (text: string): string => {
  // Remove Quranic symbols and format properly
  return text.replace(/[\u06DD\u06E0-\u06EE]/g, '').trim()
}

// Format reading time based on number of ayahs
export const getReadingTime = (numberOfAyahs: number): number => {
  return Math.ceil(numberOfAyahs / 10) // Approximate: 10 ayahs per minute
}
