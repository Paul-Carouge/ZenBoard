'use client'

import React from 'react'
import { CheckCircle2, Zap, ShieldCheck, Layout } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:shadow-xl transition-all duration-300">
    <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
  </div>
)

const Features = () => {
  const features = [
    {
      title: 'Real-time Sync',
      description: 'Changes reflect instantly across all devices thanks to PocketBase real-time subscriptions.',
      icon: <Zap size={24} />,
    },
    {
      title: 'Intuitive Kanban',
      description: 'Drag and drop tasks between columns with a fluid, high-performance interface.',
      icon: <Layout size={24} />,
    },
    {
      title: 'Secure by Design',
      description: 'Enterprise-grade security with granular access control for every collection and record.',
      icon: <ShieldCheck size={24} />,
    },
  ]

  return (
    <section id="features" className="py-24 px-6 bg-slate-50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to scale</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Powerful features designed to help your team focus on what truly matters.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  )
}

export { Features }
