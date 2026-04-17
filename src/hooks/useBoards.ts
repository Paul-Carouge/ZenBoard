'use client'

import { useState, useEffect } from 'react'
import { pb } from '@/lib/pb'
import { TBoard } from '@/types/kanban'

export function useBoards() {
  const [boards, setBoards] = useState<TBoard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBoards = async () => {
    setIsLoading(true)
    try {
      // On récupère les boards dont l'utilisateur est participant ou créateur (via nos API rules)
      const records = await pb.collection('boards').getFullList<TBoard>({
        sort: '-created',
      })
      setBoards(records)
      setError(null)
    } catch (err: any) {
      console.error('Error fetching boards:', err)
      setError(err.message || 'Erreur lors de la récupération des tableaux.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBoards()
  }, [])

  return { boards, isLoading, error, refreshBoards: fetchBoards }
}
