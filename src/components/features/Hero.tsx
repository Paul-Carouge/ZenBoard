'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface HeroProps {
  className?: string
}

const Hero = ({ className }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } })

    tl.from('.hero-title', { y: 50, opacity: 0, stagger: 0.2 })
      .from('.hero-subtitle', { y: 30, opacity: 0 }, '-=0.6')
      .from('.hero-cta', { scale: 0.9, opacity: 0 }, '-=0.4')
  }, { scope: containerRef })

  return (
    <section 
      ref={containerRef}
      className={cn(
        'relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 px-6 text-center',
        className
      )}
    >
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="max-w-4xl mx-auto z-10">
        <h1 className="hero-title text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
          Organize your work <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            with ZenBoard
          </span>
        </h1>
        
        <p className="hero-subtitle text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultra-fast, real-time Kanban board for modern teams. 
          Streamline workflows and boost productivity without the clutter.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="px-8 py-6 text-base shadow-lg shadow-blue-500/20">
            Start building free
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-6 text-base">
            Watch Demo
          </Button>
        </div>

        {/* Mockup Placeholder */}
        <div className="mt-16 relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-2 backdrop-blur-sm shadow-2xl overflow-hidden max-w-5xl mx-auto group">
           <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 italic transition-transform duration-700 group-hover:scale-[1.01]">
              [ Dashboard Preview Placeholder ]
           </div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
