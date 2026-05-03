import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Podcast Platform - Discover & Stream Podcasts',
  description: 'Enterprise podcast streaming platform with global reach',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Podcast Platform</h1>
            </div>
            <nav className="flex items-center gap-4">
              <a href="/discover" className="text-sm font-medium">Discover</a>
              <a href="/library" className="text-sm font-medium">Library</a>
              <a href="/search" className="text-sm font-medium">Search</a>
              <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Sign In
              </button>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t py-6">
          <div className="container text-center text-sm text-muted-foreground">
            © 2026 Podcast Platform. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
