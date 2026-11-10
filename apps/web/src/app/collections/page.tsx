'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { CreateCollectionModal } from '../../components/CreateCollectionModal';
import { GameDetailModal } from '../../components/GameDetailModal';
import { AddGameModal } from '../../components/AddGameModal';
import { PlaytimeLoggerModal } from '../../components/PlaytimeLoggerModal';
import { ReviewComposerModal } from '../../components/ReviewComposerModal';
import {
  fetchCollections,
  fetchCollectionById,
  createCollection,
  fetchGameById,
  toggleFavorite,
  updateGameStatus,
  logPlaytime,
  createGame,
  deleteGame,
  submitReview,
  voteHelpful,
} from '../../lib/api';
import { Collection, Game, GameStatus } from '../../lib/types';
import {
  FolderKanban,
  Plus,
  Layers,
  Sparkles,
  ChevronRight,
  Gamepad2,
  Trash2,
} from 'lucide-react';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [playtimeGame, setPlaytimeGame] = useState<Game | null>(null);
  const [reviewGame, setReviewGame] = useState<Game | null>(null);

  const loadCollections = async () => {
    try {
      setLoading(true);
      const data = await fetchCollections();
      setCollections(data || []);
      if (data && data.length > 0 && !activeCollection) {
        // Fetch full collection with games
        const full = await fetchCollectionById(data[0].id);
        setActiveCollection(full);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const handleSelectCollection = async (col: Collection) => {
    try {
      const full = await fetchCollectionById(col.id);
      setActiveCollection(full);
    } catch (_) {
      setActiveCollection(col);
    }
  };

  const handleCreateCollection = async (data: any) => {
    const created = await createCollection(data);
    setCollections((prev) => [created, ...prev]);
    setActiveCollection(created);
  };

  const handleSelectGame = async (game: Game) => {
    try {
      const detailed = await fetchGameById(game.id);
      setSelectedGame(detailed);
    } catch (_) {
      setSelectedGame(game);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    await toggleFavorite(id);
    if (activeCollection) {
      const refreshed = await fetchCollectionById(activeCollection.id);
      setActiveCollection(refreshed);
    }
  };

  const handleUpdateStatus = async (id: string, status: GameStatus) => {
    await updateGameStatus(id, status);
    if (activeCollection) {
      const refreshed = await fetchCollectionById(activeCollection.id);
      setActiveCollection(refreshed);
    }
  };

  const handleLogPlaytime = async (gameId: string, minutes: number) => {
    await logPlaytime(gameId, minutes);
    if (activeCollection) {
      const refreshed = await fetchCollectionById(activeCollection.id);
      setActiveCollection(refreshed);
    }
  };

  const handleAddGame = async (gameData: any) => {
    await createGame(gameData);
    loadCollections();
  };

  const handleDeleteGame = async (id: string) => {
    await deleteGame(id);
    if (activeCollection) {
      const refreshed = await fetchCollectionById(activeCollection.id);
      setActiveCollection(refreshed);
    }
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
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <FolderKanban className="h-4 w-4" />
              Curated Vaults
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Game Collections & Playlists
            </h1>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-glow-cyan hover:from-cyan-400 hover:to-indigo-500"
          >
            <Plus className="h-4 w-4" />
            New Collection
          </button>
        </div>

        {/* Collections Overview Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {collections.map((col) => {
            const isSelected = activeCollection?.id === col.id;
            return (
              <div
                key={col.id}
                onClick={() => handleSelectCollection(col)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-[#121727] shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                    : 'border-white/10 bg-[#0d101a] hover:border-white/20 hover:bg-[#101422]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`h-3 w-8 rounded-full bg-gradient-to-r ${
                      col.colorGradient || 'from-indigo-600 to-purple-800'
                    }`}
                  />
                  <span className="text-xs font-semibold text-slate-400">
                    {col.items?.length || 0} games
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {col.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-400 leading-relaxed">
                  {col.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active Collection Content */}
        {activeCollection && (
          <div className="rounded-3xl border border-white/10 bg-[#0c101c] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Active Collection
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {activeCollection.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  {activeCollection.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                  {activeCollection.items?.length || 0} Titles Included
                </span>
              </div>
            </div>

            {/* Games in Collection */}
            {activeCollection.items && activeCollection.items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {activeCollection.items.map((item) => {
                  const game = item.game;
                  if (!game) return null;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectGame(game)}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#121625] p-3.5 hover:border-cyan-400/50 hover:bg-[#161c2e] transition-all cursor-pointer"
                    >
                      <img
                        src={game.coverUrl}
                        alt={game.title}
                        className="h-20 w-16 rounded-xl object-cover border border-white/10 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-semibold text-cyan-400 uppercase">
                            {game.status}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            • Metascore {game.metacriticScore}
                          </span>
                        </div>
                        <h4 className="font-display text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                          {game.title}
                        </h4>
                        <span className="text-xs text-slate-400 truncate block mt-0.5">
                          {game.developer}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-sm">
                No games added to this collection yet.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      <CreateCollectionModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreateCollection={handleCreateCollection}
      />

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
