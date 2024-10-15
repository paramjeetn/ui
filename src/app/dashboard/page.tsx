'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email)
      } else {
        // If no user is signed in, redirect to the home page
        router.push('/')
      }
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {userEmail ? (
          <>
            <p className="mb-4">Welcome, {userEmail}!</p>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </>
        ) : (
          <p>No user is currently signed in.</p>
        )}
      </div>
    </div>
  )
}