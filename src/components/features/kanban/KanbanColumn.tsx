'use client'

import React from 'react'
import { TTask } from '@/types/kanban'
import { KanbanCard } from './KanbanCard'
import { Button } from '@/components/ui/Button'
import { Plus, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'

interface KanbanColumnProps {
  id: string
  title: string
  tasks: TTask[]
  onAddTask?: (columnId: string) => void
  className?: string
}

const ColumnContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col w-[320px] min-h-[500px]", className)}>{children}</div >
}

const KanbanColumn = ({ id, title, tasks, onAddTask, className }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: id
  })

  return (
    <ColumnContainer className={className}>
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
          <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal size={18} />
        </Button>
      </div>

      <div 
        ref={setNodeRef}
        className="flex-1 bg-slate-100/50 dark:bg-slate-900/30 rounded-xl p-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors min-h-[200px]"
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </SortableContext>
        
        {onAddTask && (
          <button 
            onClick={() => onAddTask(id)}
            className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-900 rounded-lg transition-all mt-2 border border-dashed border-transparent hover:border-blue-200"
          >
            <Plus size={16} />
            Ajouter une tâche
          </button>
        )}
      </div>
    </ColumnContainer>
  )
}

export { KanbanColumn }
