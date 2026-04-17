'use client'

import { TTask } from '@/types/kanban'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { MoreHorizontal, GripVertical } from 'lucide-react'

interface KanbanCardProps {
  task: TTask
}

const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="group bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing mb-3">
      <div className="flex items-start justify-between gap-2">
        <span className={cn(
          "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
          task.priority === 'high' ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
          task.priority === 'medium' ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" :
          "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        )}>
          {task.priority}
        </span>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={14} />
        </Button>
      </div>

      <div className="mt-2">
        <h4 className="font-medium text-slate-900 dark:text-white leading-snug">{task.title}</h4>
        {task.description && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex -space-x-2">
           <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900" />
           <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-white dark:border-slate-900" />
        </div>
        <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
          ID-{task.id.slice(0, 4)}
        </div>
      </div>
    </div>
  )
}

export { KanbanCard }
