'use client';

import React, { useState } from 'react';
import { X, FolderPlus, Sparkles } from 'lucide-react';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCollection: (colData: any) => Promise<void>;
}

export const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  isOpen,
  onClose,
  onCreateCollection,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [colorGradient, setColorGradient] = useState(
    'from-indigo-600 to-purple-800',
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const gradientPresets = [
    { label: 'Cyber Violet', val: 'from-violet-600 to-indigo-900' },
    { label: 'Neon Cyan', val: 'from-cyan-600 to-blue-900' },
    { label: 'Blood Moon', val: 'from-rose-600 to-slate-900' },
    { label: 'Amber Gold', val: 'from-amber-600 to-stone-900' },
    { label: 'Emerald Forest', val: 'from-emerald-600 to-teal-950' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Collection name is required');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      await onCreateCollection({
        name: name.trim(),
        description: description.trim(),
        colorGradient,
        isPublic: true,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create collection');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#0b0e17] shadow-2xl p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <FolderPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                Create Collection
              </h3>
              <p className="text-xs text-slate-400">
                Curate custom playlists and thematic vaults.
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

        {error && (
          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Collection Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Co-op Friday Nights"
              className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What unites this playlist?"
              className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Atmosphere Color Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {gradientPresets.map((grad) => (
                <button
                  key={grad.val}
                  type="button"
                  onClick={() => setColorGradient(grad.val)}
                  className={`flex items-center gap-2.5 rounded-xl border p-2 text-xs font-semibold transition-all ${
                    colorGradient === grad.val
                      ? 'border-cyan-400 bg-white/10 text-white'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-gradient-to-r ${grad.val}`}
                  />
                  <span>{grad.label}</span>
                </button>
              ))}
            </div>
          </div>

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
              disabled={isSubmitting}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-glow-cyan hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Collection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
