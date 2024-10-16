'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false)
      } else {
        router.push('/')
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Assume navbar height is 64px, adjust if different */}
      <div className="flex-grow overflow-auto bg-gray-100 pt-16">
        {children}
      </div>
    </div>
  )
}