'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Plus, X } from 'lucide-react'

interface CreateBoardModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string, color: string) => Promise<void>
}

const CreateBoardModal = ({ isOpen, onClose, onCreate }: CreateBoardModalProps) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#3b82f6')
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onCreate(name, color)
      setName('')
      onClose()
    } catch (err) {
      console.error('Error creating board:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Nouveau Tableau</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nom du tableau</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
              placeholder="Ex: Projet Marketing"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Couleur d'accentuation</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-12 p-0 border-none bg-transparent cursor-pointer rounded-lg overflow-hidden"
              />
              <span className="text-sm font-mono text-slate-500 uppercase">{color}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Annuler</Button>
            <Button type="submit" disabled={isLoading || !name} className="flex-1">
              {isLoading ? 'Création...' : 'Créer le tableau'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { CreateBoardModal }
