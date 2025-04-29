"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        className="w-full bg-white/30 dark:bg-slate-700/30 backdrop-blur-md text-white placeholder-white/70 border-0 rounded-lg py-3 px-4 pr-12 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        aria-label="Search city"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/20 transition-all"
        aria-label="Search"
      >
        <Search size={20} />
      </button>
    </form>
  )
}
