'use client';

import React, { useState } from 'react';
import { GameStatus } from '../lib/types';
import { X, Plus, Sparkles, Image as ImageIcon, Check } from 'lucide-react';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGame: (gameData: any) => Promise<void>;
}

export const AddGameModal: React.FC<AddGameModalProps> = ({
  isOpen,
  onClose,
  onAddGame,
}) => {
  const [title, setTitle] = useState('');
  const [developer, setDeveloper] = useState('');
  const [publisher, setPublisher] = useState('');
  const [releaseDate, setReleaseDate] = useState('2024');
  const [price, setPrice] = useState('59.99');
  const [metacriticScore, setMetacriticScore] = useState('88');
  const [shortDescription, setShortDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [status, setStatus] = useState<GameStatus>('BACKLOG');
  const [installSizeGb, setInstallSizeGb] = useState('45');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'PC',
    'PlayStation 5',
  ]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    'Action RPG',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const availablePlatforms = [
    'PC',
    'PlayStation 5',
    'Xbox Series X',
    'Nintendo Switch',
    'Steam Deck',
    'VR',
  ];

  const availableGenres = [
    'Action RPG',
    'Souls-like',
    'Sci-Fi',
    'Open World',
    'Roguelike',
    'FPS',
    'Cyberpunk',
    'Fantasy',
    'Horror',
    'Indie',
    'Strategy',
    'Racing',
  ];

  const presetArtworks = [
    { label: 'Cyberpunk Concept', url: '/art/chronos.jpg' },
    { label: 'Dark Souls Concept', url: '/art/eldritch.jpg' },
    { label: 'Interstellar Concept', url: '/art/astral.jpg' },
    {
      label: 'Neon Skyline',
      url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop',
    },
    {
      label: 'Cyber Mech',
      url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900&auto=format&fit=crop',
    },
    {
      label: 'Dark Knight',
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=900&auto=format&fit=crop',
    },
  ];

  const togglePlatform = (p: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p],
    );
  };

  const toggleGenre = (g: string) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    const finalCover =
      coverUrl.trim() ||
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=900&auto=format&fit=crop';

    setIsSubmitting(true);
    setError('');

    try {
      await onAddGame({
        title: title.trim(),
        developer: developer.trim() || 'Independent Studio',
        publisher: publisher.trim() || developer.trim() || 'Self-published',
        releaseDate: releaseDate.trim() || '2024',
        price: parseFloat(price) || 0,
        metacriticScore: parseInt(metacriticScore, 10) || 85,
        userScore: 9.0,
        shortDescription:
          shortDescription.trim() ||
          `Epic gaming adventure featuring ${selectedGenres.join(', ')}.`,
        description:
          shortDescription.trim() ||
          `An incredible title offering dozens of hours of deep exploration and adrenaline-pumping gameplay.`,
        coverUrl: finalCover,
        bannerUrl: bannerUrl.trim() || finalCover,
        status,
        platforms: selectedPlatforms.length ? selectedPlatforms : ['PC'],
        genres: selectedGenres.length ? selectedGenres : ['Action'],
        tags: [...selectedGenres, 'Singleplayer'],
        installSizeGb: parseFloat(installSizeGb) || 40,
        playtimeMinutes: 0,
        systemRequirements: {
          minimum: {
            os: 'Windows 10 64-bit',
            cpu: 'Intel Core i5 / AMD Ryzen 5',
            ram: '16 GB RAM',
            gpu: 'NVIDIA GTX 1060 / AMD RX 580',
            storage: `${installSizeGb} GB`,
          },
          recommended: {
            os: 'Windows 11 64-bit',
            cpu: 'Intel Core i7 / AMD Ryzen 7',
            ram: '32 GB RAM',
            gpu: 'NVIDIA RTX 3070 / AMD RX 6700 XT',
            storage: `${installSizeGb} GB NVMe SSD`,
          },
        },
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to add game');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-[#0b0e17] shadow-2xl overflow-hidden my-auto p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Register Game to Vault
              </h3>
              <p className="text-xs text-slate-400">
                Add an indie, digital, or AAA title to your personal collection.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Title & Developer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Game Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Ghostrunner II"
                className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Developer Studio
              </label>
              <input
                type="text"
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                placeholder="e.g. One More Level"
                className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Artwork Preset Chooser */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select Cover Artwork Preset or Paste URL:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {presetArtworks.map((art, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCoverUrl(art.url);
                    setBannerUrl(art.url);
                  }}
                  className={`group relative aspect-[3/2] overflow-hidden rounded-xl border transition-all ${
                    coverUrl === art.url
                      ? 'border-cyan-400 ring-2 ring-cyan-400/40'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img
                    src={art.url}
                    alt={art.label}
                    className="h-full w-full object-cover"
                  />
                  {coverUrl === art.url && (
                    <div className="absolute inset-0 bg-cyan-500/30 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="Or paste custom image URL (https://...)"
              className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Platforms Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Platforms
            </label>
            <div className="flex flex-wrap gap-2">
              {availablePlatforms.map((plat) => {
                const isSelected = selectedPlatforms.includes(plat);
                return (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => togglePlatform(plat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {plat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Genres Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Genres
            </label>
            <div className="flex flex-wrap gap-2">
              {availableGenres.map((gen) => {
                const isSelected = selectedGenres.includes(gen);
                return (
                  <button
                    key={gen}
                    type="button"
                    onClick={() => toggleGenre(gen)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
                      isSelected
                        ? 'border-purple-400 bg-purple-500/20 text-purple-300'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {gen}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metrics: Metacritic, Install Size, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Metacritic Score
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={metacriticScore}
                onChange={(e) => setMetacriticScore(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Install Size (GB)
              </label>
              <input
                type="number"
                min="1"
                step="0.5"
                value={installSizeGb}
                onChange={(e) => setInstallSizeGb(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Initial Library Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as GameStatus)}
                className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="BACKLOG">Backlog</option>
                <option value="PLAYING">Currently Playing</option>
                <option value="INSTALLED">Installed</option>
                <option value="COMPLETED">Completed</option>
                <option value="WISHLIST">Wishlist</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief pitch about gameplay and lore..."
              className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
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
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-glow-cyan hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Registering...' : 'Add to Vault'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
