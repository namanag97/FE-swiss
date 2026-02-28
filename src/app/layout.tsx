import type { Metadata } from 'next'
import { inter, mono, caslon } from '@/lib/fonts'
import { site } from '@/config/site'
import { Banner } from '@/components/layout/Banner'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} ${caslon.variable}`}>
        <Banner />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
