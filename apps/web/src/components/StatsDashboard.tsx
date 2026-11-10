'use client';

import React from 'react';
import { LibraryStats } from '../lib/types';
import {
  Gamepad2,
  Clock,
  DollarSign,
  Trophy,
  CheckCircle,
  HardDrive,
  BarChart,
  Layers,
  Sparkles,
} from 'lucide-react';

interface StatsDashboardProps {
  stats: LibraryStats | null;
  onSelectGameId?: (gameId: string) => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  stats,
  onSelectGameId,
}) => {
  if (!stats) return null;

  const {
    summary,
    statusDistribution,
    platformDistribution,
    topGenres,
    topPlayed,
  } = stats;

  const maxGenreHours = Math.max(...topGenres.map((g) => g.hours), 1);

  return (
    <div className="space-y-8">
      {/* 4 Hero KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Games */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0e121e] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Games In Vault
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Gamepad2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-white">
              {summary.totalGames}
            </span>
            <span className="text-xs font-medium text-cyan-400">titles registered</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle className="h-3 w-3" />
              {statusDistribution.COMPLETED || 0} completed
            </span>
            <span>•</span>
            <span>{statusDistribution.PLAYING || 0} active</span>
          </div>
        </div>

        {/* Total Playtime */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0e121e] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Playtime
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-white">
              {summary.totalPlaytimeHours}
            </span>
            <span className="text-xs font-medium text-blue-400">hours logged</span>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            ≈ {(summary.totalPlaytimeHours / 24).toFixed(1)} full days of epic adventures
          </div>
        </div>

        {/* Library Value */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0e121e] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Catalog Value
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-white">
              ${summary.totalEstimatedValueUsd}
            </span>
            <span className="text-xs font-medium text-emerald-400">retail USD</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <HardDrive className="h-3.5 w-3.5 text-slate-500" />
            <span>{summary.totalStorageGb} GB total disk space</span>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0e121e] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Completion Rate
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Trophy className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-white">
              {summary.completionRate}%
            </span>
            <span className="text-xs font-medium text-purple-400">beaten</span>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            {summary.achievements.unlocked} / {summary.achievements.total} achievements ({summary.achievements.percentage}%)
          </div>
        </div>
      </div>

      {/* Middle Section: Top Genres Playtime & Platform Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Playtime by Genre */}
        <div className="rounded-3xl border border-white/10 bg-[#0e121e] p-6 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <BarChart className="h-5 w-5 text-cyan-400" />
              Hours Logged by Genre
            </h3>
            <span className="text-xs text-slate-400">Based on telemetry</span>
          </div>

          <div className="space-y-4 pt-2">
            {topGenres.map((g) => {
              const widthPct = Math.min(
                100,
                Math.round((g.hours / maxGenreHours) * 100),
              );
              return (
                <div key={g.genre} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{g.genre}</span>
                    <span className="text-cyan-400">
                      {g.hours} hrs <span className="text-slate-500">({g.count} titles)</span>
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform Ecosystem */}
        <div className="rounded-3xl border border-white/10 bg-[#0e121e] p-6 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-400" />
              Platform Distribution
            </h3>
            <span className="text-xs text-slate-400">Library hardware split</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-2">
            {Object.entries(platformDistribution).map(([plat, count]) => (
              <div
                key={plat}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-between"
              >
                <span className="text-xs font-semibold text-slate-300">
                  {plat}
                </span>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="font-display text-2xl font-black text-white">
                    {count}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {Math.round((count / (summary.totalGames || 1)) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Status Breakdown Pills */}
          <div className="pt-4 border-t border-white/5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Play State Distribution
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.entries(statusDistribution).map(([st, c]) => (
                <div
                  key={st}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 flex items-center gap-2"
                >
                  <span className="text-slate-400 capitalize">
                    {st.toLowerCase()}:
                  </span>
                  <strong className="text-white">{c}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Top 5 Most Played Leaderboard */}
      <div className="rounded-3xl border border-white/10 bg-[#0e121e] p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            Most Played Titles Leaderboard
          </h3>
          <span className="text-xs text-slate-400">All-time hours recorded</span>
        </div>

        <div className="space-y-3 pt-2">
          {topPlayed.map((game, idx) => (
            <div
              key={game.id}
              onClick={() => onSelectGameId && onSelectGameId(game.id)}
              className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:p-4 hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span
                  className={`font-display text-lg font-black w-6 text-center ${
                    idx === 0
                      ? 'text-amber-400'
                      : idx === 1
                      ? 'text-slate-300'
                      : idx === 2
                      ? 'text-amber-600'
                      : 'text-slate-500'
                  }`}
                >
                  #{idx + 1}
                </span>

                <img
                  src={game.coverUrl}
                  alt={game.title}
                  className="h-12 w-16 sm:h-14 sm:w-20 rounded-xl object-cover border border-white/10 flex-shrink-0"
                />

                <div className="min-w-0">
                  <h4 className="font-display text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                    {game.title}
                  </h4>
                  <span className="text-xs text-slate-400">
                    Status: <strong className="text-slate-200 capitalize">{game.status.toLowerCase()}</strong>
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0 pl-4">
                <div className="font-display text-base font-black text-cyan-400">
                  {game.playtimeHours} hrs
                </div>
                <span className="text-[11px] text-slate-400">
                  {game.playtimeMinutes} mins
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
