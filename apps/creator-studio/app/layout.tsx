import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Podcast Platform - Creator Studio',
  description: 'Manage your podcasts and episodes',
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
              <h1 className="text-xl font-bold">Creator Studio</h1>
            </div>
            <nav className="flex items-center gap-4">
              <a href="/dashboard" className="text-sm font-medium">Dashboard</a>
              <a href="/podcasts" className="text-sm font-medium">Podcasts</a>
              <a href="/episodes" className="text-sm font-medium">Episodes</a>
              <a href="/analytics" className="text-sm font-medium">Analytics</a>
              <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Profile
              </button>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
