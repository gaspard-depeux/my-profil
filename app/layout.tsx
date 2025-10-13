import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/animations.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FlowTrack - Gestion financière intelligente',
  description: 'Transformez votre budget tracking en une expérience ludique et motivante avec FlowTrack.',
  keywords: ['budget', 'finance', 'épargne', 'gestion financière', 'gamification'],
  authors: [{ name: 'FlowTrack Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#6366F1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}