import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TodoProvider } from '@/context/TodoContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo List',
  description: 'Generated by create next app with TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <TodoProvider>
          {children}
        </TodoProvider>
      </body>
    </html>
  )
}
