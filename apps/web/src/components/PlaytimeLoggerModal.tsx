'use client';

import React, { useState } from 'react';
import { Game } from '../lib/types';
import { X, Clock, Check } from 'lucide-react';

interface PlaytimeLoggerModalProps {
  game: Game | null;
  onClose: () => void;
  onLogPlaytime: (gameId: string, minutes: number) => Promise<void>;
}

export const PlaytimeLoggerModal: React.FC<PlaytimeLoggerModalProps> = ({
  game,
  onClose,
  onLogPlaytime,
}) => {
  const [minutes, setMinutes] = useState<number>(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!game) return null;

  const quickPresets = [
    { label: '+30m', mins: 30 },
    { label: '+1h', mins: 60 },
    { label: '+2h', mins: 120 },
    { label: '+3h', mins: 180 },
    { label: '+5h', mins: 300 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (minutes <= 0) return;
    setIsSubmitting(true);
    try {
      await onLogPlaytime(game.id, minutes);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#0b0e17] shadow-2xl p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                Log Playtime Session
              </h3>
              <p className="text-xs text-slate-400 truncate max-w-[220px]">
                {game.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Quick preset buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Quick Session Duration:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {quickPresets.map((preset) => (
                <button
                  key={preset.mins}
                  type="button"
                  onClick={() => setMinutes(preset.mins)}
                  className={`rounded-xl py-2 text-xs font-bold border transition-all ${
                    minutes === preset.mins
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 ring-2 ring-cyan-400/30'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom minutes input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Custom Minutes:
            </label>
            <input
              type="number"
              min="1"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value, 10) || 0)}
              className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              = {(minutes / 60).toFixed(1)} hours will be added to your profile telemetry.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || minutes <= 0}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-glow-cyan hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Recording...' : 'Save Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
