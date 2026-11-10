'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { StatsDashboard } from '../../components/StatsDashboard';
import { GameDetailModal } from '../../components/GameDetailModal';
import { AddGameModal } from '../../components/AddGameModal';
import { PlaytimeLoggerModal } from '../../components/PlaytimeLoggerModal';
import { ReviewComposerModal } from '../../components/ReviewComposerModal';
import {
  fetchStats,
  fetchGameById,
  toggleFavorite,
  updateGameStatus,
  logPlaytime,
  createGame,
  deleteGame,
  submitReview,
  voteHelpful,
} from '../../lib/api';
import { LibraryStats, Game, GameStatus } from '../../lib/types';
import { BarChart3, RefreshCw } from 'lucide-react';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<LibraryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [playtimeGame, setPlaytimeGame] = useState<Game | null>(null);
  const [reviewGame, setReviewGame] = useState<Game | null>(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleSelectGameId = async (id: string) => {
    try {
      const g = await fetchGameById(id);
      setSelectedGame(g);
    } catch (_) {}
  };

  const handleToggleFavorite = async (id: string) => {
    await toggleFavorite(id);
    loadStats();
  };

  const handleUpdateStatus = async (id: string, status: GameStatus) => {
    await updateGameStatus(id, status);
    loadStats();
  };

  const handleLogPlaytime = async (gameId: string, minutes: number) => {
    await logPlaytime(gameId, minutes);
    loadStats();
  };

  const handleAddGame = async (gameData: any) => {
    await createGame(gameData);
    loadStats();
  };

  const handleDeleteGame = async (id: string) => {
    await deleteGame(id);
    loadStats();
    if (selectedGame?.id === id) setSelectedGame(null);
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
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BarChart3 className="h-4 w-4" />
              Telemetry & Insights
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Vault Analytics & Telemetry
            </h1>
          </div>

          <button
            onClick={loadStats}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 self-start sm:self-auto"
          >
            <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
            Refresh Telemetry
          </button>
        </div>

        {loading ? (
          <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-3xl bg-white/[0.03] border border-white/5"
                />
              ))}
            </div>
            <div className="h-80 rounded-3xl bg-white/[0.03] border border-white/5" />
          </div>
        ) : (
          <StatsDashboard stats={stats} onSelectGameId={handleSelectGameId} />
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
