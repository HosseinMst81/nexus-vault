'use client';

import React from 'react';
import { GameStatus } from '../lib/types';
import {
  LayoutGrid,
  List,
  Filter,
  ArrowUpDown,
  Search,
  Sparkles,
  Gamepad,
} from 'lucide-react';

interface FilterBarProps {
  statusFilter: GameStatus | 'ALL' | 'FAVORITES';
  setStatusFilter: (status: any) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  genres: string[];
  platforms: string[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  totalGames: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  statusFilter,
  setStatusFilter,
  selectedGenre,
  setSelectedGenre,
  selectedPlatform,
  setSelectedPlatform,
  sortBy,
  setSortBy,
  genres,
  platforms,
  viewMode,
  setViewMode,
  totalGames,
}) => {
  const statusTabs = [
    { id: 'ALL', label: 'All Titles' },
    { id: 'PLAYING', label: 'Playing' },
    { id: 'INSTALLED', label: 'Installed' },
    { id: 'BACKLOG', label: 'Backlog' },
    { id: 'COMPLETED', label: 'Completed' },
    { id: 'WISHLIST', label: 'Wishlist' },
    { id: 'FAVORITES', label: '★ Favorites' },
  ];

  return (
    <div className="mb-8 space-y-4">
      {/* Top Row: Status Tabs Carousel */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 overflow-x-auto no-scrollbar gap-2">
        <div className="flex items-center gap-1.5 min-w-max">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`relative rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* View Mode Switcher */}
        <div className="hidden sm:flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-lg p-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`rounded-lg p-1.5 transition-all ${
              viewMode === 'list'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="List View"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Second Row: Dropdown Filters & Sorters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Genre filter */}
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="appearance-none rounded-xl border border-white/10 bg-[#0e1320] px-3.5 py-2 pr-8 text-xs font-medium text-slate-300 focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Platform filter */}
          <div className="relative">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="appearance-none rounded-xl border border-white/10 bg-[#0e1320] px-3.5 py-2 pr-8 text-xs font-medium text-slate-300 focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              <option value="">All Platforms</option>
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Clear filters if active */}
          {(selectedGenre || selectedPlatform) && (
            <button
              onClick={() => {
                setSelectedGenre('');
                setSelectedPlatform('');
              }}
              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Sorting & Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            Showing <strong className="text-white">{totalGames}</strong> games
          </span>

          <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#0e1320] px-3 py-1.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="metacriticScore" className="bg-[#0e1320]">
                Highest Metacritic
              </option>
              <option value="playtimeMinutes" className="bg-[#0e1320]">
                Most Played
              </option>
              <option value="createdAt" className="bg-[#0e1320]">
                Recently Added
              </option>
              <option value="releaseDate" className="bg-[#0e1320]">
                Release Date
              </option>
              <option value="title" className="bg-[#0e1320]">
                Title (A-Z)
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
