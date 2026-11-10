'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { FilterBar } from '../../components/FilterBar';
import { GameCard } from '../../components/GameCard';
import { GameDetailModal } from '../../components/GameDetailModal';
import { AddGameModal } from '../../components/AddGameModal';
import { PlaytimeLoggerModal } from '../../components/PlaytimeLoggerModal';
import { ReviewComposerModal } from '../../components/ReviewComposerModal';
import {
  fetchGames,
  fetchGenres,
  fetchPlatforms,
  fetchGameById,
  toggleFavorite,
  updateGameStatus,
  logPlaytime,
  createGame,
  deleteGame,
  submitReview,
  voteHelpful,
} from '../../lib/api';
import { Game, GameStatus } from '../../lib/types';
import { Library, Plus, Search, Sparkles } from 'lucide-react';

export default function LibraryPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<
    GameStatus | 'ALL' | 'FAVORITES'
  >('ALL');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [sortBy, setSortBy] = useState('metacriticScore');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [playtimeGame, setPlaytimeGame] = useState<Game | null>(null);
  const [reviewGame, setReviewGame] = useState<Game | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const isFav = statusFilter === 'FAVORITES' ? true : undefined;
      const st =
        statusFilter !== 'ALL' && statusFilter !== 'FAVORITES'
          ? (statusFilter as GameStatus)
          : undefined;

      const [gamesRes, genresRes, platformsRes] = await Promise.all([
        fetchGames({
          limit: 100,
          search: searchQuery.trim() || undefined,
          genre: selectedGenre || undefined,
          platform: selectedPlatform || undefined,
          status: st,
          isFavorite: isFav,
          sortBy: sortBy || 'metacriticScore',
          sortOrder: 'DESC',
        }),
        fetchGenres(),
        fetchPlatforms(),
      ]);

      setGames(gamesRes.items || []);
      setGenres(genresRes || []);
      setPlatforms(platformsRes || []);
    } catch (err) {
      console.error('Failed to load library', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, selectedGenre, selectedPlatform, sortBy, searchQuery]);

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
      setGames((prev) =>
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
      setGames((prev) =>
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
      setGames((prev) =>
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
    setGames((prev) => [created, ...prev]);
  };

  const handleDeleteGame = async (id: string) => {
    await deleteGame(id);
    setGames((prev) => prev.filter((g) => g.id !== id));
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

  return (
    <div className="flex min-h-screen flex-col bg-[#07090e]">
      <Navbar
        onOpenAddGame={() => setIsAddModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Header Title & Quick Count */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Library className="h-4 w-4" />
              Vault Vault Collection
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              My Game Library
            </h1>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-glow-cyan hover:from-cyan-400 hover:to-indigo-500 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Add Game
          </button>
        </div>

        {/* Filter Bar with Tabs & Dropdowns */}
        <FilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          sortBy={sortBy}
          setSortBy={setSortBy}
          genres={genres}
          platforms={platforms}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalGames={games.length}
        />

        {/* Game Cards Grid / List */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-white/[0.03] border border-white/5"
              />
            ))}
          </div>
        ) : games.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onSelect={handleSelectGame}
                  onToggleFavorite={handleToggleFavorite}
                  onLogPlaytime={(g) => setPlaytimeGame(g)}
                  viewMode="grid"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onSelect={handleSelectGame}
                  onToggleFavorite={handleToggleFavorite}
                  onLogPlaytime={(g) => setPlaytimeGame(g)}
                  viewMode="list"
                />
              ))}
            </div>
          )
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#0e121e] p-12 text-center text-slate-400">
            No games found matching your current filter criteria.
          </div>
        )}
      </main>

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
