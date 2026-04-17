'use client'

import React from 'react'
import { KanbanColumn } from './KanbanColumn'
import { TTask } from '@/types/kanban'

const MOCK_TASKS: TTask[] = [
  { id: '1', title: 'Design landing page', description: 'Create a beautiful hero section with GSAP animations.', priority: 'high', columnId: 'todo' },
  { id: '2', title: 'Setup PocketBase', description: 'Configure the backend and auth flow.', priority: 'medium', columnId: 'in-progress' },
  { id: '3', title: 'Implement Auth UI', description: 'Build login and register pages.', priority: 'low', columnId: 'done' },
]

const MOCK_COLUMNS = [
  { id: 'todo', title: 'À faire', taskIds: ['1', '2'] },
  { id: 'in-progress', title: 'En cours', taskIds: ['2'] },
  { id: 'done', title: 'Terminé', taskIds: ['3'] },
]

interface KanbanBoardProps {
  className?: string
}

const KanbanBoard = ({ className }: KanbanBoardProps) => {
  // In a real app, we would fetch this data from PocketBase
  const columnsData = MOCK_COLUMNS.map(col => ({
    ...col,
    tasks: MOCK_TASKS.filter(task => col.taskIds.includes(task.id))
  }))

  return (
    <div className={cn("flex gap-6 overflow-x-auto pb-8 items-start", className)}>
      {columnsData.map((column) => (
        <KanbanColumn 
          key={column.id} 
          title={column.title} 
          tasks={column.tasks} 
        />
      ))}
    </div>
  )
}

import { cn } from '@/lib/utils' // Import for the classname prop if needed, though I added it above to avoid issues

export { KanbanBoard }
