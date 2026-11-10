'use client';

import React, { useState, useEffect } from 'react';
import { Game, GameStatus, Review, Collection } from '../lib/types';
import { fetchCollections, addGameToCollection } from '../lib/api';
import {
  X,
  Star,
  Clock,
  Heart,
  Play,
  Share2,
  Trash2,
  Trophy,
  Cpu,
  Package,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  ExternalLink,
  Plus,
  FolderPlus,
} from 'lucide-react';

interface GameDetailModalProps {
  game: Game | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: GameStatus) => void;
  onToggleFavorite: (id: string) => void;
  onLogPlaytime: (game: Game) => void;
  onOpenReviewModal: (game: Game) => void;
  onDeleteGame: (id: string) => void;
  onVoteHelpful: (reviewId: string) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  onClose,
  onUpdateStatus,
  onToggleFavorite,
  onLogPlaytime,
  onOpenReviewModal,
  onDeleteGame,
  onVoteHelpful,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'achievements' | 'specs' | 'dlcs' | 'reviews'
  >('overview');
  const [activeMedia, setActiveMedia] = useState<'video' | 'screenshots'>('video');
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [chosenCollectionId, setChosenCollectionId] = useState<string>('');
  const [collectionStatusMsg, setCollectionStatusMsg] = useState<string>('');

  useEffect(() => {
    fetchCollections()
      .then((cols) => {
        setCollections(cols || []);
        if (cols && cols.length > 0) setChosenCollectionId(cols[0].id);
      })
      .catch(() => {});
  }, []);

  const handleAddGameToChosenCollection = async () => {
    if (!chosenCollectionId || !game) return;
    try {
      await addGameToCollection(chosenCollectionId, game.id);
      setCollectionStatusMsg('Added to collection!');
      setTimeout(() => setCollectionStatusMsg(''), 3000);
    } catch (err: any) {
      setCollectionStatusMsg(err.message || 'Already in collection');
      setTimeout(() => setCollectionStatusMsg(''), 3000);
    }
  };

  if (!game) return null;

  const unlockedAchievementsCount =
    game.achievements?.filter((a) => a.isUnlocked).length || 0;
  const totalAchievements = game.achievements?.length || 0;
  const achievementPercentage =
    totalAchievements > 0
      ? Math.round((unlockedAchievementsCount / totalAchievements) * 100)
      : 0;

  const formatHours = (mins: number) => {
    const hours = (mins / 60).toFixed(1);
    return `${hours} hrs`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl border border-white/15 bg-[#0b0e17] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-slate-300 backdrop-blur-md transition-all hover:bg-black/90 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero Header Media */}
        <div className="relative h-72 sm:h-96 w-full flex-shrink-0 overflow-hidden bg-vault-950">
          <img
            src={game.bannerUrl || game.coverUrl}
            alt={game.title}
            className="h-full w-full object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e17] via-[#0b0e17]/50 to-transparent" />

          {/* Floating Game Quick Info Header */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-5">
              {/* Cover Art Inset */}
              <img
                src={game.coverUrl}
                alt={game.title}
                className="hidden sm:block h-36 w-28 rounded-2xl border-2 border-white/20 object-cover shadow-2xl"
              />
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {game.metacriticScore && (
                    <span className="flex items-center gap-1 rounded-lg border border-amber-500/50 bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      METACRITIC {game.metacriticScore}
                    </span>
                  )}
                  <span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                    USER {game.userScore || 9.0}/10
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {game.developer}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-black text-white">
                  {game.title}
                </h2>
              </div>
            </div>

            {/* Quick Actions Header */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onToggleFavorite(game.id)}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-md transition-all ${
                  game.isFavorite
                    ? 'border-rose-500/50 bg-rose-500/20 text-rose-400'
                    : 'border-white/20 bg-black/40 text-slate-300 hover:text-white'
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${game.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
                />
              </button>

              <button
                onClick={() => onLogPlaytime(game)}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/40 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-black/60 transition-all"
              >
                <Clock className="h-4 w-4 text-cyan-400" />
                Log Time
              </button>

              <button
                onClick={() =>
                  alert(`Launching session for "${game.title}"... Have fun!`)
                }
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-glow-cyan hover:from-cyan-400 hover:to-indigo-500 transition-all"
              >
                <Play className="h-4 w-4 fill-white" />
                Play Now
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#0e121e] px-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Media' },
            {
              id: 'achievements',
              label: `Achievements (${unlockedAchievementsCount}/${totalAchievements})`,
            },
            { id: 'specs', label: 'System Requirements' },
            { id: 'dlcs', label: `DLCs (${game.dlcs?.length || 0})` },
            {
              id: 'reviews',
              label: `Community Reviews (${game.reviews?.length || 0})`,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`border-b-2 px-5 py-4 text-xs font-bold transition-all uppercase tracking-wider whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300 bg-white/[0.02]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Synopsis, Trailer, Screenshots */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                    About The Game
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {game.description || game.shortDescription}
                  </p>
                </div>

                {/* Video Trailer / Screenshots Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Media Showcase
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveMedia('video')}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                          activeMedia === 'video'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Trailer
                      </button>
                      <button
                        onClick={() => setActiveMedia('screenshots')}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                          activeMedia === 'screenshots'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Gallery
                      </button>
                    </div>
                  </div>

                  {activeMedia === 'video' ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
                      <video
                        controls
                        muted
                        autoPlay
                        loop
                        src={
                          game.trailerUrl ||
                          'https://assets.mixkit.co/videos/preview/mixkit-game-animation-of-a-futuristic-robot-41584-large.mp4'
                        }
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {(game.screenshots?.length
                        ? game.screenshots
                        : [game.bannerUrl, game.coverUrl]
                      ).map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedScreenshot(img)}
                          className="relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-white/10 hover:border-cyan-400 transition-all"
                        >
                          <img
                            src={img}
                            alt={`Screenshot ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Metadata & Library Management */}
              <div className="space-y-6">
                {/* Library Management Box */}
                <div className="rounded-2xl border border-white/10 bg-[#121625] p-5 space-y-4">
                  <h4 className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
                    Library Management
                  </h4>

                  {/* Status Dropdown */}
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      Current Library Status:
                    </label>
                    <select
                      value={game.status}
                      onChange={(e) =>
                        onUpdateStatus(game.id, e.target.value as GameStatus)
                      }
                      className="w-full rounded-xl border border-white/15 bg-[#0e121e] px-3.5 py-2.5 text-xs font-semibold text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="INSTALLED">Installed</option>
                      <option value="PLAYING">Currently Playing</option>
                      <option value="BACKLOG">In Backlog</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="WISHLIST">On Wishlist</option>
                      <option value="DROPPED">Dropped</option>
                    </select>
                  </div>

                  {/* Add to Collection feature */}
                  {collections.length > 0 && (
                    <div className="pt-2 border-t border-white/5">
                      <label className="text-xs text-slate-400 block mb-1">
                        Add to Curated Collection:
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={chosenCollectionId}
                          onChange={(e) => setChosenCollectionId(e.target.value)}
                          className="flex-1 rounded-xl border border-white/15 bg-[#0e121e] px-3 py-2 text-xs font-medium text-white focus:border-cyan-400 focus:outline-none"
                        >
                          {collections.map((col) => (
                            <option key={col.id} value={col.id}>
                              {col.name}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={handleAddGameToChosenCollection}
                          className="flex items-center gap-1 rounded-xl bg-cyan-500/20 px-3 py-2 text-xs font-bold text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
                        >
                          <FolderPlus className="h-3.5 w-3.5" />
                          Add
                        </button>
                      </div>
                      {collectionStatusMsg && (
                        <p className="mt-1 text-[11px] text-cyan-400 font-semibold animate-pulse">
                          {collectionStatusMsg}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Playtime stats */}
                  <div className="rounded-xl bg-white/[0.03] p-3 text-xs space-y-2 border border-white/5">
                    <div className="flex justify-between text-slate-300">
                      <span>Total Playtime:</span>
                      <strong className="text-white">
                        {formatHours(game.playtimeMinutes || 0)}
                      </strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Last Played:</span>
                      <span className="text-slate-400">
                        {game.lastPlayedAt
                          ? new Date(game.lastPlayedAt).toLocaleDateString()
                          : 'Never'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technical Information Box */}
                <div className="rounded-2xl border border-white/10 bg-[#121625] p-5 space-y-3 text-xs text-slate-300">
                  <h4 className="font-bold tracking-wider text-slate-400 uppercase">
                    Specifications
                  </h4>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Developer</span>
                    <span className="text-white font-medium">{game.developer}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Publisher</span>
                    <span className="text-white font-medium">{game.publisher}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Release Date</span>
                    <span className="text-white font-medium">{game.releaseDate}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Storage Size</span>
                    <span className="text-white font-medium">{game.installSizeGb} GB</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Platforms</span>
                    <span className="text-cyan-400 font-medium">
                      {game.platforms?.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Delete Game Option */}
                <button
                  onClick={() => {
                    if (
                      confirm(`Are you sure you want to delete "${game.title}" from your library?`)
                    ) {
                      onDeleteGame(game.id);
                    }
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 py-2.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove from Vault
                </button>
              </div>
            </div>
          )}

          {/* TAB: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              {/* Progress Summary Card */}
              <div className="rounded-2xl border border-white/10 bg-[#121625] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="h-5 w-5 text-amber-400" />
                    <h3 className="font-display text-lg font-bold text-white">
                      Achievement Progress
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    You have unlocked {unlockedAchievementsCount} out of {totalAchievements} trophies.
                  </p>
                </div>

                <div className="w-full sm:w-64 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>{achievementPercentage}% Completed</span>
                    <span className="text-amber-400">
                      {game.achievements?.reduce(
                        (acc, cur) => (cur.isUnlocked ? acc + cur.points : acc),
                        0,
                      ) || 0}{' '}
                      Points
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 transition-all duration-700"
                      style={{ width: `${achievementPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Achievements Grid */}
              <div className="space-y-3">
                {game.achievements?.map((ach) => (
                  <div
                    key={ach.id}
                    className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                      ach.isUnlocked
                        ? 'border-cyan-500/30 bg-cyan-500/[0.04]'
                        : 'border-white/5 bg-white/[0.02] opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                          ach.isUnlocked
                            ? 'border-amber-400/40 bg-amber-400/10 text-amber-300'
                            : 'border-white/10 bg-white/5 text-slate-500'
                        }`}
                      >
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-white">
                          {ach.title}
                        </h4>
                        <p className="text-xs text-slate-400">{ach.description}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-amber-300">
                        +{ach.points} XP
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {ach.rarityPercentage}% players
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SYSTEM REQUIREMENTS */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Minimum */}
              <div className="rounded-2xl border border-white/10 bg-[#121625] p-6 space-y-4">
                <h4 className="font-display text-base font-bold text-cyan-400 flex items-center gap-2">
                  <Cpu className="h-5 w-5" /> Minimum Specification
                </h4>
                <div className="space-y-3 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Operating System</span>
                    <strong className="text-white">
                      {game.systemRequirements?.minimum?.os || 'Windows 10 64-bit'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Processor (CPU)</span>
                    <strong className="text-white">
                      {game.systemRequirements?.minimum?.cpu || 'Intel Core i5-8400 / AMD Ryzen 5 1600'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Memory (RAM)</span>
                    <strong className="text-white">
                      {game.systemRequirements?.minimum?.ram || '12 GB RAM'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Graphics (GPU)</span>
                    <strong className="text-white">
                      {game.systemRequirements?.minimum?.gpu || 'NVIDIA GTX 1060 (6GB) / AMD RX 580'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Storage</span>
                    <strong className="text-white">
                      {game.systemRequirements?.minimum?.storage || `${game.installSizeGb} GB available space`}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Recommended */}
              <div className="rounded-2xl border border-cyan-500/30 bg-[#121625] p-6 space-y-4 shadow-glow-cyan/10">
                <h4 className="font-display text-base font-bold text-emerald-400 flex items-center gap-2">
                  <Cpu className="h-5 w-5" /> Recommended Specification (Ultra Ray-Tracing)
                </h4>
                <div className="space-y-3 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Operating System</span>
                    <strong className="text-white">
                      {game.systemRequirements?.recommended?.os || 'Windows 11 64-bit'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Processor (CPU)</span>
                    <strong className="text-white">
                      {game.systemRequirements?.recommended?.cpu || 'Intel Core i7-13700K / AMD Ryzen 7 7800X3D'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Memory (RAM)</span>
                    <strong className="text-white">
                      {game.systemRequirements?.recommended?.ram || '32 GB High-Speed DDR5'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Graphics (GPU)</span>
                    <strong className="text-white">
                      {game.systemRequirements?.recommended?.gpu || 'NVIDIA GeForce RTX 4080 / AMD RX 7900 XTX'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Storage</span>
                    <strong className="text-white">
                      {game.systemRequirements?.recommended?.storage || `${game.installSizeGb} GB NVMe Gen4 SSD`}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DLCs */}
          {activeTab === 'dlcs' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                Official Expansions & Add-Ons
              </h4>

              {game.dlcs && game.dlcs.length > 0 ? (
                <div className="space-y-3">
                  {game.dlcs.map((dlc) => (
                    <div
                      key={dlc.id}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-[#121625] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-indigo-400" />
                        <div>
                          <h5 className="text-sm font-bold text-white">{dlc.title}</h5>
                          <span className="text-xs text-slate-400">
                            Released {dlc.releaseDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-emerald-400">
                          ${dlc.price}
                        </span>
                        <span className="rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                          Installed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-slate-400 text-sm">
                  No separate downloadable content registered for this title yet.
                </div>
              )}
            </div>
          )}

          {/* TAB: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Player Reviews
                  </h3>
                  <p className="text-xs text-slate-400">
                    Community evaluations and feedback from verified library owners.
                  </p>
                </div>
                <button
                  onClick={() => onOpenReviewModal(game)}
                  className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-glow-cyan hover:bg-cyan-400"
                >
                  <Plus className="h-4 w-4" />
                  Write Review
                </button>
              </div>

              {game.reviews && game.reviews.length > 0 ? (
                <div className="space-y-4">
                  {game.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="rounded-2xl border border-white/10 bg-[#121625] p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.authorAvatar}
                            alt={rev.authorName}
                            className="h-9 w-9 rounded-full border border-white/10 bg-black/40"
                          />
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {rev.authorName}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {rev.hoursPlayed} hrs on record
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                      </div>

                      <h5 className="font-display text-sm font-bold text-slate-200">
                        {rev.title}
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {rev.content}
                      </p>

                      {/* Pros & Cons chips */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {rev.pros?.map((pro, idx) => (
                          <span
                            key={idx}
                            className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300"
                          >
                            + {pro}
                          </span>
                        ))}
                        {rev.cons?.map((con, idx) => (
                          <span
                            key={idx}
                            className="rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] text-rose-300"
                          >
                            - {con}
                          </span>
                        ))}
                      </div>

                      {/* Helpful votes */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-3">
                        <span className="text-[11px] text-slate-500">
                          {rev.createdAt
                            ? new Date(rev.createdAt).toLocaleDateString()
                            : 'Recent'}
                        </span>
                        <button
                          onClick={() => onVoteHelpful(rev.id)}
                          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-white/10"
                        >
                          <ThumbsUp className="h-3.5 w-3.5 text-cyan-400" />
                          Helpful ({rev.helpfulVotes || 0})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-slate-400 text-sm">
                  No community reviews yet for this title. Be the first to share your thoughts!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
