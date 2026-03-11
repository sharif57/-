import type { Metadata, Viewport } from 'next'
import { Poppins, Amiri } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['arabic'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'কুরআন - সম্পূর্ণ কুরআন অ্যাপ্লিকেশন',
  description: 'সম্পূর্ণ কুরআন পড়ুন বাংলা অনুবাদ এবং আরবি পাঠসহ। অডিও রেসিটেশন, সার্চ এবং বুকমার্ক বৈশিষ্ট্য সহ।',
  keywords: 'কুরআন, Quran, সূরা, Surah, ইসলাম, Islamic',
}

export const viewport: Viewport = {
  themeColor: '#065f46',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn" dir="ltr">
      <body className={`${poppins.variable} ${amiri.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
