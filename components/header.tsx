import React from 'react'
import { Badge } from './ui/badge'

export default function Header() {
  return (
    <header
      className="fixed z-50 w-full px-4 border-b border-white/10 bg-black/20 backdrop-blur-sm md:px-20">
      <div className="container py-4 mx-auto ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Gumball Stream</h1>
          <Badge variant="secondary" className="text-white bg-purple-600">
            20 Episodes
          </Badge>
        </div>
      </div>
    </header>
  )
}
