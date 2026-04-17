'use client'

import React from 'react'
import { TTask } from '@/types/kanban'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'

interface BoardListProps {
  boards: any[] // Using any temporarily to avoid complex type mismatch during refactor, but will refine if needed
  isLoading: boolean
  error: string | null
  onSelectBoard: (boardId: string) => void
}

const BoardList = ({ boards, isLoading, error, onSelectBoard }: BoardListProps) => {
  if (isLoading) {
    return <div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
  }

  if (error) return <p className="text-red-500 text-center">{error}</p>

  if (boards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center px-6">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 mb-4">
          <Plus size={32} />
        </div >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Aucun tableau trouvé</h3>
        <p className="text-sm text-slate-500 mt-1 mb-6">Commencez par créer votre premier projet.</p>
        {/* The parent handles the creation via modal, so we don't put button here to avoid confusion */}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {boards.map((board) => (
        <button
          key={board.id}
          onClick={() => onSelectBoard(board.id)}
          className="group relative flex flex-col items-start p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left"
        >
          <div 
            className="w-10 h-10 rounded-lg mb-4 shadow-inner" 
            style={{ backgroundColor: board.color || '#3b82f6' }} 
          />
          <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
            {board.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{/* Placeholder for task count */}</p>
          
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
             <Plus size={18} className="text-slate-400" />
          </div >
        </button>
      ))}

      <button 
        onClick={() => onSelectBoard('new')}
        className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:bg-white dark:hover:bg-slate-900 transition-all group min-h-[140px]"
      >
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all mb-2">
          <Plus size={24} />
        </div >
        <span className="font-medium text-sm text-slate-500 group-hover:text-blue-600">Nouveau tableau</span>
      </button>
    </div>
  )
}

export { BoardList }
