'use client'

import React from 'react'
import { KanbanColumn } from './KanbanColumn'
import { TTask, TColumn } from '@/types/kanban'
import { cn } from '@/lib/utils'
import { useTasks } from '@/hooks/useTasks'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { addTaskAction, addColumnAction } from '@/app/actions/kanban-actions'

interface KanbanBoardProps {
  boardId: string
  columns: TColumn[] 
  className?: string
}

const KanbanBoard = ({ boardId, columns, className }: KanbanBoardProps) => {
  const { tasks, isLoading } = useTasks({ boardId })

  // Function to add a task via Server Action
  const handleAddTask = async (columnId: string) => {
    const result = await addTaskAction(boardId, columnId);
    if (!result.success) {
      alert(`Erreur lors de l'ajout : ${result.error}`);
    }
  };

  // Function to add a column via Server Action
  const handleAddColumn = async () => {
    const title = prompt('Nom de la nouvelle liste ?');
    if (!title) return;

    const result = await addColumnAction(boardId, title);
    if (!result.success) {
      alert(`Erreur lors de l'ajout : ${result.error}`);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-[400px]">Chargement du tableau...</div>;
  }

  return (
    <div className={cn("flex gap-6 overflow-x-auto pb-8 items-start", className)}>
      {columns.map((column) => (
        <KanbanColumn 
          key={column.id} 
          id={column.id}
          title={column.title} 
          tasks={tasks.filter(t => column.taskIds.includes(t.id))}
          onAddTask={handleAddTask}
        />
      ))}
      
      <button 
        onClick={handleAddColumn}
        className="w-[320px] min-h-[100px] flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-900 rounded-xl border-2 border-dashed border-transparent hover:border-blue-200 transition-all"
      >
        <Plus size={18} />
        Ajouter une liste
      </button>
    </div>
  )
}

export { KanbanBoard }
