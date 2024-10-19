'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { auth } from '@/firebase' // Assume you have this set up
import { signInWithEmailAndPassword } from 'firebase/auth'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit">Login</Button>
        </form>
        {/* <div className="mt-4 text-center">
          <p>Don't have an account?</p>
          <Button variant="link" onClick={onSwitchToRegister}>Register</Button>
        </div> */}
      </DialogContent>
    </Dialog>
  )
}