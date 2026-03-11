'use client'

import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/50 bg-gradient-to-t from-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">কুরআন অ্যাপ</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              এটি একটি সম্পূর্ণ বিনামূল্যে কুরআন পড়ার প্ল্যাটফর্ম যেখানে আপনি আরবি পাঠ, বাংলা অনুবাদ এবং অডিও রেসিটেশন পেতে পারেন।
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">বৈশিষ্ট্য</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ সম্পূর্ণ কুরআন পাঠ</li>
              <li>✓ বাংলা অনুবাদ</li>
              <li>✓ অডিও রেসিটেশন</li>
              <li>✓ বুকমার্ক সংরক্ষণ</li>
              <li>✓ দ্রুত সার্চ</li>
            </ul>
          </div>

          {/* API Credit */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">ডেটা উৎস</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              এই অ্যাপ্লিকেশন Al Quran Cloud API ব্যবহার করে নির্মিত। সকল তথ্য বিনামূল্যে এবং খোলা উৎস থেকে পাওয়া হয়।
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 pt-8">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>তৈরি করা হয়েছে</span>
            <Heart className="w-4 h-4 fill-accent text-accent" />
            <span>ইসলাম ভালোবাসার জন্য</span>
          </div>
          <p className="text-center text-xs text-muted-foreground/70 mt-4">
            © ২০২৪ কুরআন অ্যাপ। সকল অধিকার সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  )
}
