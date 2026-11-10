'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Gamepad2,
  Library,
  Compass,
  FolderKanban,
  BarChart3,
  Plus,
  Search,
  Sparkles,
  Database,
  Layers,
} from 'lucide-react';

interface NavbarProps {
  onOpenAddGame: () => void;
  onOpenCreateCollection?: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddGame,
  searchQuery,
  setSearchQuery,
}) => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Discover', icon: Compass },
    { href: '/library', label: 'Library', icon: Library },
    { href: '/collections', label: 'Collections', icon: FolderKanban },
    { href: '/stats', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07090e]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-[2px] shadow-glow-cyan transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0c0f17]">
                <Gamepad2 className="h-6 w-6 text-cyan-400 transition-colors group-hover:text-cyan-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-extrabold tracking-wider text-white">
                NEXUS<span className="text-cyan-400">VAULT</span>
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                Enterprise Game Library
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1 rounded-xl bg-white/[0.03] p-1 border border-white/[0.06]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Search & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Global Search Bar */}
          <div className="relative hidden lg:block w-72">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search library, tags, dev..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#10141f]/90 py-2 pl-10 pr-10 text-sm text-slate-200 placeholder-slate-500 transition-all focus:border-cyan-500/60 focus:bg-[#151a29] focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              /
            </kbd>
          </div>

          {/* Backend Status indicator */}
          <div className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px]">NestJS • Postgres</span>
          </div>

          {/* Add Game Button */}
          <button
            onClick={onOpenAddGame}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow-cyan transition-all hover:from-cyan-400 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Game</span>
          </button>
        </div>
      </div>
    </header>
  );
};
