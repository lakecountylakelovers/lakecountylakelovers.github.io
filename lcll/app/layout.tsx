import './globals.css'
import { Manrope, Source_Serif_4 } from 'next/font/google'

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
})

const headingFont = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-heading',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}