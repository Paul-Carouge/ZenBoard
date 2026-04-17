'use client'

import { useState } from 'react'
import { pb } from '@/lib/pb'
import { TBoard } from '@/types/kanban'
import { BoardList } from '@/components/features/kanban/BoardList'
import { KanbanBoard } from '@/components/features/kanban/KanbanBoard'
import { CreateBoardModal } from '@/components/features/kanban/CreateBoardModal'
import { Button } from '@/components/ui/Button'
import { Plus, ArrowLeft } from 'lucide-react'
import { useBoards } from '@/hooks/useBoards'

export default function DashboardPage() {
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // On remonte l'appel du hook ici pour piloter le rafraîchissement global
  const { boards, isLoading, error, refreshBoards } = useBoards()

  const handleCreateBoard = async (name: string, color: string) => {
    try {
      const authStore = pb.authStore.model
      if (!authStore) throw new Error("Vous devez être connecté.")

      await pb.collection('boards').create({
        name,
        color,
        creator: authStore.id,
        participants: [authStore.id],
      })
      
      // On déclenche le re-fetch immédiat après la création réussie
      await refreshBoards()
    } catch (err: any) {
      console.error('Erreur lors de la création du tableau:', err)
      alert(`Erreur: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      {/* Header / Navigation */}
      <header className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        {selectedBoardId ? (
          <>
            <button 
              onClick={() => setSelectedBoardId(null)}
              className="flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
               ← Retour à la liste
            </button>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Tableau actif
            </h1>
          </>
        ) : (
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mes Tableaux
          </h1>
        )}

        {!selectedBoardId && (
           <Button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center gap-2 shadow-lg shadow-blue-500/20"
           >
             <Plus size={18} />
             Nouveau tableau
           </Button>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {selectedBoardId === 'new' ? (
          null // Géré par la modale
        ) : selectedBoardId ? (
          <KanbanBoard />
        ) : (
          <BoardList 
            boards={boards} 
            isLoading={isLoading} 
            error={error} 
            onSelectBoard={(id) => setSelectedBoardId(id)} 
          />
        )}
      </main>

      {/* Modale de création */}
      <CreateBoardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateBoard}
      />
    </div>
  )
}
