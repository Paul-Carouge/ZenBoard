'use client'

import React, { useState, useRef, useEffect } from 'react'
import { User, LogOut, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const UserMenu = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo('.menu-item', 
        { opacity: 0, y: -10 }, 
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.2, ease: 'power2.out' }
      )
    }
  }, { dependencies: [isOpen], scope: menuRef })

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  return (
    <div className="relative" ref={menuRef}>
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-2 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user.avatar ? (
          <img src={user.avatar} alt={user.name || 'User'} className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        )}
        <span className="hidden sm:inline text-sm font-medium">{user.name || 'User'}</span>
        <ChevronDown size={14} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-[60]">
          <div className="py-1 px-3 mb-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Compte</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 truncate">{user.email}</p>
          </div>
          <div className="h-px bg-slate-100 dark:bg-slate-900 mx-2 mb-1" />
          <button
            onClick={logout}
            className="menu-item flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  )
}

export { UserMenu }
