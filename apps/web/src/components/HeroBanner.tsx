'use client';

import React, { useState, useEffect } from 'react';
import { Game } from '../lib/types';
import {
  Play,
  Info,
  Heart,
  Star,
  Clock,
  HardDrive,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface HeroBannerProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  onToggleFavorite: (id: string) => void;
  onLogPlaytime: (game: Game) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  games,
  onSelectGame,
  onToggleFavorite,
  onLogPlaytime,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  if (!games || games.length === 0) return null;

  const currentGame = games[currentIndex] || games[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const formatPlaytime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const m = mins % 60;
    if (hours === 0) return `${m}m`;
    return `${hours}h ${m}m`;
  };

  return (
    <div className="relative mb-14 w-full overflow-hidden rounded-3xl border border-white/10 bg-vault-900 shadow-2xl">
      {/* Background Media: Banner Image with gradient mask */}
      <div className="relative h-[480px] sm:h-[540px] lg:h-[600px] w-full overflow-hidden">
        <img
          src={currentGame.bannerUrl || currentGame.coverUrl}
          alt={currentGame.title}
          className="h-full w-full object-cover object-center filter transition-all duration-700 ease-out transform scale-105"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-transparent w-full md:w-3/4" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Content Box */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-16 max-w-3xl z-10">
          {/* Top Badges */}
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              SPOTLIGHT TITLE
            </span>

            {currentGame.metacriticScore && (
              <span className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                METACRITIC {currentGame.metacriticScore}
              </span>
            )}

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
              {currentGame.developer}
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
              {currentGame.releaseDate?.slice(0, 4) || '2024'}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-md">
            {currentGame.title}
          </h1>

          {/* Description */}
          <p className="mt-4 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base text-slate-300 leading-relaxed drop-shadow">
            {currentGame.shortDescription || currentGame.description}
          </p>

          {/* Metadata chips: Platforms & Playtime */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-cyan-400" />
              <span>
                Playtime: <strong className="text-white">{formatPlaytime(currentGame.playtimeMinutes || 0)}</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <HardDrive className="h-4 w-4 text-indigo-400" />
              <span>
                Size: <strong className="text-white">{currentGame.installSizeGb || 45} GB</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-medium text-emerald-400 uppercase tracking-wider text-[11px]">
                {currentGame.status}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => onSelectGame(currentGame)}
              className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-glow-cyan transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <Play className="h-4 w-4 fill-white" />
              Launch & Play
            </button>

            <button
              onClick={() => onSelectGame(currentGame)}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/30"
            >
              <Info className="h-4 w-4 text-slate-300" />
              Game Intel
            </button>

            <button
              onClick={() => onToggleFavorite(currentGame.id)}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all ${
                currentGame.isFavorite
                  ? 'border-rose-500/50 bg-rose-500/20 text-rose-400'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title={currentGame.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`h-5 w-5 ${currentGame.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
              />
            </button>

            <button
              onClick={() => onLogPlaytime(currentGame)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
            >
              + Log Hours
            </button>
          </div>
        </div>

        {/* Carousel Slide Switcher */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-[#0c0f17]/80 p-2 rounded-2xl border border-white/10 backdrop-blur-lg">
          <button
            onClick={handlePrev}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {games.map((g, idx) => (
              <button
                key={g.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-8 bg-cyan-400 shadow-glow-cyan'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
