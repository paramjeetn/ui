'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@//firebase'
import Navbar from '@/components/Navbar'
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (!user && !isPublicRoute(pathname)) {
        router.push('/')
      }
    })

    return () => unsubscribe()
  }, [router, pathname])

  if (loading) {
    return (
      <html lang="en">
      <body>
        <Navbar />
        <p>Loading....</p>
      </body>
    </html>
    )
  }

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto mt-4">
          {children}
        </main>
      </body>
    </html>
  )
}

function isPublicRoute(pathname: string) {
  const publicRoutes = ['/', '/login', '/register']
  return publicRoutes.includes(pathname)
}