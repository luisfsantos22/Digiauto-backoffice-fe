import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './css/globals.css'
import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import { Providers } from './components/providers'
import GlobalLoadingWrapper from './components/Wrapper/GlobalLoadingWrapper'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Digiauto',
  description: 'O teu assistente digital para o setor automóvel',
  keywords:
    'car;cars;carro;automóveis;veículo;vehicle;assistente;digital;assistente digital',
  authors: [{ name: 'Digiauto', url: 'https://digiauto.pt/' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Digiauto',
    description: 'O teu assistente digital para o setor automóvel',
    url: 'https://digiauto.pt/',
    type: 'website',
  },
}

export default function RootLayout({
  children,
  styles = '',
}: Readonly<{
  children: React.ReactNode
  styles?: string
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${styles}`}
      >
        <Providers>
          <GlobalLoadingWrapper>{children}</GlobalLoadingWrapper>
        </Providers>
      </body>
    </html>
  )
}
