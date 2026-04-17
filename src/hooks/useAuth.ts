'use client'

import { useState, useEffect } from 'react'
import { pb } from '@/lib/pb'
import type { RecordModel } from 'pocketbase'

interface AuthContextType {
  user: RecordModel | null
  isLoading: boolean
  login: (email?: string, password?: string) => Promise<void>
  register: (email?: string, password?: string, name?: string) => Promise<void>
  logout: () => void
}

export function useAuth() {
  const [user, setUser] = useState<RecordModel | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initial check
    const checkAuth = async () => {
      try {
        if (pb.authStore.isValid) {
          setUser(pb.authStore.model as RecordModel)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error checking auth state:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Listen to real-time auth changes from PocketBase SDK
    const unsubscribe = pb.authStore.onChange((token, model) => {
      if (model) {
        setUser(model as RecordModel)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const logout = async () => {
    pb.authStore.clear()
    setUser(null)
  }

  return { user, isLoading, logout }
}
