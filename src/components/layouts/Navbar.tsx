'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface NavbarProps {
  className?: string
}

const Navbar = ({ className }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4',
        isScrolled ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm' : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight text-blue-600">
          ZenBoard<span className="text-slate-900 dark:text-white">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">How it works</Link>
          <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Log in
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </nav>
  )
}

export { Navbar }
