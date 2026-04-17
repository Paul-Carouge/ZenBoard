'use client'

import { Navbar } from '@/components/layouts/Navbar'
import { Hero } from '@/components/features/Hero'
import { Features } from '@/components/features/Features'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <div className="flex flex-col gap-0 overflow-x-hidden">
        <Hero />
        <Features />
      </div>
    </main>
  )
}
