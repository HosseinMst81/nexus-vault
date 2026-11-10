'use client';

import React from 'react';
import { Game, GameStatus } from '../lib/types';
import {
  Star,
  Clock,
  Heart,
  Play,
  Info,
  Laptop,
  Tv,
  CheckCircle2,
  Bookmark,
  Gamepad,
} from 'lucide-react';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
  onToggleFavorite: (id: string) => void;
  onLogPlaytime: (game: Game) => void;
  viewMode?: 'grid' | 'list';
}

const statusConfig: Record<
  GameStatus,
  { label: string; bg: string; border: string; text: string; dot: string }
> = {
  INSTALLED: {
    label: 'Installed',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  PLAYING: {
    label: 'Playing',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    dot: 'bg-cyan-400',
  },
  BACKLOG: {
    label: 'Backlog',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  COMPLETED: {
    label: 'Completed',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-300',
    dot: 'bg-purple-400',
  },
  WISHLIST: {
    label: 'Wishlist',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    dot: 'bg-blue-400',
  },
  DROPPED: {
    label: 'Dropped',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    text: 'text-slate-400',
    dot: 'bg-slate-400',
  },
};

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onSelect,
  onToggleFavorite,
  onLogPlaytime,
  viewMode = 'grid',
}) => {
  const status = statusConfig[game.status] || statusConfig.BACKLOG;

  const formatHours = (mins: number) => {
    const hours = (mins / 60).toFixed(1);
    return `${hours} hrs`;
  };

  const scoreBadgeColor = (score: number) => {
    if (score >= 90) return 'border-amber-500/50 bg-amber-500/20 text-amber-300';
    if (score >= 80) return 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300';
    return 'border-blue-500/50 bg-blue-500/20 text-blue-300';
  };

  if (viewMode === 'list') {
    return (
      <div className="group relative flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-white/10 bg-[#0d111c]/90 p-4 transition-all duration-300 hover:border-cyan-500/40 hover:bg-[#121727] hover:shadow-xl">
        {/* Cover thumbnail */}
        <div
          onClick={() => onSelect(game)}
          className="relative h-28 w-48 sm:h-24 sm:w-40 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10"
        >
          <img
            src={game.coverUrl}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content info */}
        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${status.bg} ${status.border} ${status.text}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>

            {game.metacriticScore && (
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold ${scoreBadgeColor(
                  game.metacriticScore,
                )}`}
              >
                <Star className="h-3 w-3 fill-current" />
                {game.metacriticScore}
              </span>
            )}

            <span className="text-xs text-slate-400">{game.developer}</span>
          </div>

          <h3
            onClick={() => onSelect(game)}
            className="cursor-pointer font-display text-base font-bold text-white transition-colors group-hover:text-cyan-400 truncate"
          >
            {game.title}
          </h3>

          <p className="mt-1 line-clamp-1 text-xs text-slate-400">
            {game.shortDescription || game.description}
          </p>

          <div className="mt-2.5 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              {formatHours(game.playtimeMinutes || 0)}
            </span>
            <span>{game.installSizeGb} GB</span>
            <div className="flex items-center gap-1.5">
              {game.genres?.slice(0, 2).map((g) => (
                <span
                  key={g}
                  className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-300"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => onToggleFavorite(game.id)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              game.isFavorite
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Heart
              className={`h-4 w-4 ${game.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>

          <button
            onClick={() => onSelect(game)}
            className="flex items-center gap-1.5 rounded-xl bg-cyan-500/20 px-3.5 py-2 text-xs font-semibold text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all"
          >
            <Info className="h-3.5 w-3.5" />
            Intel
          </button>
        </div>
      </div>
    );
  }

  // Grid Card View (Super Modern & Rich Hierarchy)
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d111c] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10">
      {/* Cover Image Container */}
      <div
        onClick={() => onSelect(game)}
        className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-vault-950"
      >
        <img
          src={game.coverUrl}
          alt={game.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d111c] via-transparent to-black/40" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Favorite button (pointer enabled) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(game.id);
            }}
            className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-xl backdrop-blur-md transition-all ${
              game.isFavorite
                ? 'bg-rose-500/80 text-white shadow-lg shadow-rose-500/30'
                : 'bg-black/50 text-white/70 hover:bg-black/80 hover:text-white'
            }`}
          >
            <Heart
              className={`h-4 w-4 ${game.isFavorite ? 'fill-white text-white' : ''}`}
            />
          </button>

          {/* Metacritic Badge */}
          {game.metacriticScore && (
            <div
              className={`flex items-center gap-1 rounded-lg border px-2 py-0.5 text-xs font-bold backdrop-blur-md ${scoreBadgeColor(
                game.metacriticScore,
              )}`}
            >
              <Star className="h-3 w-3 fill-current" />
              {game.metacriticScore}
            </div>
          )}
        </div>

        {/* Status indicator badge (bottom left of image) */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md ${status.bg} ${status.border} ${status.text}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        {/* Hover Quick Action overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(game)}
              className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-glow-cyan hover:bg-cyan-400 transition-all"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Open Intel
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLogPlaytime(game);
              }}
              className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-all"
            >
              + Hours
            </button>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title & Developer */}
        <div className="mb-2">
          <h3
            onClick={() => onSelect(game)}
            className="cursor-pointer font-display text-base font-bold text-white transition-colors group-hover:text-cyan-400 line-clamp-1"
          >
            {game.title}
          </h3>
          <p className="text-xs text-slate-400 truncate">{game.developer}</p>
        </div>

        {/* Genres tag pills */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {game.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="rounded-md border border-white/5 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-slate-300"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Footer: Playtime & Size */}
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>{formatHours(game.playtimeMinutes || 0)}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>{game.installSizeGb} GB</span>
            {game.platforms?.length > 0 && (
              <span className="font-mono text-slate-400">
                {game.platforms[0].split(' ')[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
