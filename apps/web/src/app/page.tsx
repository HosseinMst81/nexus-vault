'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { HeroBanner } from '../components/HeroBanner';
import { GameCard } from '../components/GameCard';
import { GameDetailModal } from '../components/GameDetailModal';
import { AddGameModal } from '../components/AddGameModal';
import { PlaytimeLoggerModal } from '../components/PlaytimeLoggerModal';
import { ReviewComposerModal } from '../components/ReviewComposerModal';
import {
  fetchGames,
  fetchFeaturedGames,
  fetchGameById,
  toggleFavorite,
  updateGameStatus,
  logPlaytime,
  createGame,
  deleteGame,
  submitReview,
  voteHelpful,
} from '../lib/api';
import { Game, GameStatus } from '../lib/types';
import {
  Sparkles,
  Flame,
  Star,
  ChevronRight,
  Gamepad2,
  Clock,
  Trophy,
  Compass,
  ArrowRight,
  ShieldCheck,
  FolderKanban,
  Search,
} from 'lucide-react';

export default function DiscoverPage() {
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [playtimeGame, setPlaytimeGame] = useState<Game | null>(null);
  const [reviewGame, setReviewGame] = useState<Game | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [featuredRes, gamesRes] = await Promise.all([
        fetchFeaturedGames(),
        fetchGames({ limit: 50, sortBy: 'metacriticScore', sortOrder: 'DESC' }),
      ]);
      setFeaturedGames(featuredRes || []);
      setAllGames(gamesRes.items || []);
    } catch (err) {
      console.error('Failed to load discover data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectGame = async (game: Game) => {
    try {
      const detailed = await fetchGameById(game.id);
      setSelectedGame(detailed);
    } catch (_) {
      setSelectedGame(game);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const updated = await toggleFavorite(id);
      setAllGames((prev) =>
        prev.map((g) => (g.id === id ? { ...g, isFavorite: updated.isFavorite } : g)),
      );
      if (selectedGame && selectedGame.id === id) {
        setSelectedGame((prev) =>
          prev ? { ...prev, isFavorite: updated.isFavorite } : null,
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id: string, status: GameStatus) => {
    try {
      const updated = await updateGameStatus(id, status);
      setAllGames((prev) =>
        prev.map((g) => (g.id === id ? { ...g, status: updated.status } : g)),
      );
      if (selectedGame && selectedGame.id === id) {
        setSelectedGame((prev) =>
          prev ? { ...prev, status: updated.status } : null,
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogPlaytime = async (gameId: string, minutes: number) => {
    try {
      const updated = await logPlaytime(gameId, minutes);
      setAllGames((prev) =>
        prev.map((g) =>
          g.id === gameId
            ? {
                ...g,
                playtimeMinutes: updated.playtimeMinutes,
                status: updated.status,
              }
            : g,
        ),
      );
      if (selectedGame && selectedGame.id === gameId) {
        setSelectedGame(updated);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddGame = async (gameData: any) => {
    const created = await createGame(gameData);
    setAllGames((prev) => [created, ...prev]);
  };

  const handleDeleteGame = async (id: string) => {
    await deleteGame(id);
    setAllGames((prev) => prev.filter((g) => g.id !== id));
    if (selectedGame?.id === id) {
      setSelectedGame(null);
    }
  };

  const handleSubmitReview = async (reviewData: any) => {
    await submitReview(reviewData);
    if (selectedGame) {
      const refreshed = await fetchGameById(selectedGame.id);
      setSelectedGame(refreshed);
    }
  };

  const handleVoteHelpful = async (reviewId: string) => {
    await voteHelpful(reviewId);
    if (selectedGame) {
      const refreshed = await fetchGameById(selectedGame.id);
      setSelectedGame(refreshed);
    }
  };

  // Filtered games if search is typed
  const displayedGames = searchQuery.trim()
    ? allGames.filter(
        (g) =>
          g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.genres?.some((gen) =>
            gen.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    : allGames;

  // Filter by high Metacritic (>= 90)
  const hallOfFame = allGames.filter((g) => g.metacriticScore >= 90);

  // Original AI Concepts
  const originalConcepts = allGames.filter(
    (g) =>
      g.slug.includes('chronos') ||
      g.slug.includes('eldritch') ||
      g.slug.includes('astral'),
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#07090e]">
      {/* Top Navigation */}
      <Navbar
        onOpenAddGame={() => setIsAddModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* If user is searching, show direct search results */}
        {searchQuery.trim() ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                <Search className="h-6 w-6 text-cyan-400" />
                Search Results for &ldquo;{searchQuery}&rdquo;
              </h2>
              <span className="text-xs text-slate-400">
                Found {displayedGames.length} titles
              </span>
            </div>

            {displayedGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onSelect={handleSelectGame}
                    onToggleFavorite={handleToggleFavorite}
                    onLogPlaytime={(g) => setPlaytimeGame(g)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-[#0e121e] p-12 text-center text-slate-400">
                No games matched your query. Try searching for a different keyword,
                or register a new game with the top &ldquo;Add Game&rdquo; button.
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Spotlight Hero Marquee Banner */}
            <HeroBanner
              games={featuredGames.length > 0 ? featuredGames : allGames.slice(0, 4)}
              onSelectGame={handleSelectGame}
              onToggleFavorite={handleToggleFavorite}
              onLogPlaytime={(g) => setPlaytimeGame(g)}
            />

            {/* Quick Discover Metric Bar */}
            <div className="mb-14 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-3xl border border-white/10 bg-[#0c101c]/90 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3 px-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Gamepad2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">
                    {allGames.length} Titles
                  </div>
                  <span className="text-[11px] text-slate-400">Digital Vault</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3 border-l border-white/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">
                    {Math.round(
                      allGames.reduce((acc, g) => acc + (g.playtimeMinutes || 0), 0) /
                        60,
                    )}{' '}
                    Hours
                  </div>
                  <span className="text-[11px] text-slate-400">Logged In-Game</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3 border-l border-white/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">
                    {
                      allGames.filter((g) => g.status === 'COMPLETED').length
                    }{' '}
                    Mastered
                  </div>
                  <span className="text-[11px] text-slate-400">Completed Games</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3 border-l border-white/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">Verified</div>
                  <span className="text-[11px] text-slate-400">Cloud Sync Active</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: Original Concept Works (Generated Art Showcase) */}
            {originalConcepts.length > 0 && (
              <section className="mb-14">
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <Sparkles className="h-4 w-4" />
                      Original Concept Works
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                      Nexus High-Fidelity Exclusives
                    </h2>
                  </div>
                  <Link
                    href="/library"
                    className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    View in Library <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {originalConcepts.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => handleSelectGame(game)}
                      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#0d111c] transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/11] w-full overflow-hidden">
                        <img
                          src={game.coverUrl}
                          alt={game.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d111c] via-[#0d111c]/30 to-transparent" />
                        <span className="absolute top-4 left-4 rounded-full border border-cyan-400/40 bg-black/60 px-3 py-1 text-[11px] font-bold text-cyan-300 backdrop-blur-md">
                          ORIGINAL ARTWORK
                        </span>
                        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-lg border border-amber-500/40 bg-black/60 px-2 py-0.5 text-xs font-bold text-amber-300 backdrop-blur-md">
                          <Star className="h-3 w-3 fill-current" />
                          {game.metacriticScore}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {game.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs text-slate-400 leading-relaxed">
                          {game.shortDescription}
                        </p>
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                          <span className="text-slate-400 font-medium">
                            {game.genres?.slice(0, 2).join(' • ')}
                          </span>
                          <span className="font-bold text-cyan-400">
                            Explore Lore &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION 2: Hall of Fame (Metacritic 90+) */}
            <section className="mb-14">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Star className="h-4 w-4 fill-amber-400" />
                    Critically Acclaimed
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    Hall of Fame (90+ Metascore)
                  </h2>
                </div>
                <Link
                  href="/library"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Explore All <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {hallOfFame.slice(0, 4).map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onSelect={handleSelectGame}
                    onToggleFavorite={handleToggleFavorite}
                    onLogPlaytime={(g) => setPlaytimeGame(g)}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 3: All Vault Titles */}
            <section className="mb-14">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Compass className="h-4 w-4" />
                    Complete Catalog
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    All Installed & Backlog Titles
                  </h2>
                </div>
                <Link
                  href="/library"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-all"
                >
                  Go to Library Manager &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allGames.slice(0, 8).map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onSelect={handleSelectGame}
                    onToggleFavorite={handleToggleFavorite}
                    onLogPlaytime={(g) => setPlaytimeGame(g)}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#06080d] py-10 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Gamepad2 className="h-5 w-5 text-cyan-400" />
            <span className="font-display text-sm font-bold text-white">
              Nexus Vault Architecture
            </span>
            <span className="text-xs text-slate-500">
              • NestJS, Next.js, PostgreSQL & Docker
            </span>
          </div>
          <div className="text-xs text-slate-400">
            Engineered with Senior Software Design & Solid Principles.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GameDetailModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onUpdateStatus={handleUpdateStatus}
        onToggleFavorite={handleToggleFavorite}
        onLogPlaytime={(g) => setPlaytimeGame(g)}
        onOpenReviewModal={(g) => setReviewGame(g)}
        onDeleteGame={handleDeleteGame}
        onVoteHelpful={handleVoteHelpful}
      />

      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />

      <PlaytimeLoggerModal
        game={playtimeGame}
        onClose={() => setPlaytimeGame(null)}
        onLogPlaytime={handleLogPlaytime}
      />

      <ReviewComposerModal
        game={reviewGame}
        onClose={() => setReviewGame(null)}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
}
