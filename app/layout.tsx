import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'User & Post List from API',
  description: 'User & Post List from API',
}

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
