'use client'

import { useState, useEffect } from 'react'
import { pb } from '@/lib/pb'
import { TTask } from '@/types/kanban'

interface UseTasksProps {
  boardId: string
}

export function useTasks({ boardId }: UseTasksProps) {
  const [tasks, setTasks] = useState<TTask[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true)
        // Filter tasks by the specific board ID
        const records = await pb.collection('tasks').getFullList<TTask>({
          filter: `boardId = "${boardId}"`,
          sort: '+created',
        })
        setTasks(records)
        setError(null)
      } catch (err: any) {
        console.error('Error fetching tasks:', err)
        setError(err.message || 'Erreur lors de la récupération des tâches.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()

    // Real-time subscription to task changes within this board
    const subscription = pb.collection('tasks').subscribe('*', (e: any) => {
      if (!e.record || !e.record.id) return;
      
      const record = e.record as TTask;

      if (e.action === 'create' || e.action === 'update') {
        setTasks((prev) => {
          const exists = prev.find((t) => t.id === record.id);
          if (exists) {
            return prev.map((t) => (t.id === record.id ? record : t));
          }
          // Check if the task belongs to our board before adding
          if (record.boardId === boardId) {
             return [...prev, record];
          }
          return prev;
        });
      } else if (e.action === 'delete') {
        setTasks((prev) => prev.filter((t) => t.id !== record.id));
      }
    });

    return () => {
      if (typeof subscription === 'function') {
        subscription();
      } else if ((subscription as any)?.unsubscribe) {
        (subscription as any).unsubscribe();
      }
    };
  }, [boardId])

  return { tasks, isLoading, error }
}
