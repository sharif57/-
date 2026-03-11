'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-md bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg transform group-hover:scale-105 transition">
            <span className="text-white font-bold text-lg">ق</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              কুরআন
            </h1>
            <p className="text-xs text-muted-foreground">সম্পূর্ণ কুরআন অ্যাপ</p>
          </div>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full w-10 h-10 hover:bg-primary/10"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-accent" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </Button>
      </div>
    </header>
  )
}
