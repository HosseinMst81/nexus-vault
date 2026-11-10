'use client';

import React, { useState } from 'react';
import { Game } from '../lib/types';
import { X, Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

interface ReviewComposerModalProps {
  game: Game | null;
  onClose: () => void;
  onSubmitReview: (reviewData: any) => Promise<void>;
}

export const ReviewComposerModal: React.FC<ReviewComposerModalProps> = ({
  game,
  onClose,
  onSubmitReview,
}) => {
  const [authorName, setAuthorName] = useState('Nexus Commander');
  const [rating, setRating] = useState(5);
  const [recommended, setRecommended] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hoursPlayed, setHoursPlayed] = useState(
    Math.round((game?.playtimeMinutes || 600) / 60),
  );
  const [prosText, setProsText] = useState('Atmospheric art, Combat fluidity');
  const [consText, setConsText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!game) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Please provide a review headline and written feedback.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const pros = prosText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const cons = consText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await onSubmitReview({
        gameId: game.id,
        authorName: authorName.trim() || 'Player',
        rating,
        recommended,
        title: title.trim(),
        content: content.trim(),
        hoursPlayed: Number(hoursPlayed) || 10,
        pros,
        cons,
      });

      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-[#0b0e17] shadow-2xl p-6 sm:p-8 my-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Submit Player Evaluation
              </h3>
              <p className="text-xs text-slate-400">{game.title}</p>
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Star Rating & Recommendation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Star Rating:
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Recommendation:
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRecommended(true)}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold border transition-all ${
                    recommended
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                      : 'border-white/10 bg-white/5 text-slate-400'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" /> Recommend
                </button>
                <button
                  type="button"
                  onClick={() => setRecommended(false)}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold border transition-all ${
                    !recommended
                      ? 'border-rose-500 bg-rose-500/20 text-rose-300'
                      : 'border-white/10 bg-white/5 text-slate-400'
                  }`}
                >
                  <ThumbsDown className="h-4 w-4" /> Do Not
                </button>
              </div>
            </div>
          </div>

          {/* Author Name & Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Your Gamer Tag
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Hours Played at Review
              </label>
              <input
                type="number"
                min="1"
                value={hoursPlayed}
                onChange={(e) => setHoursPlayed(parseInt(e.target.value, 10) || 0)}
                className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Headline Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Stunning visual direction and tight parry mechanics"
              className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Detailed Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Review Feedback *
            </label>
            <textarea
              rows={3}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Explain what made this game memorable or where it fell short..."
              className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-400 mb-1">
                Pros (comma-separated)
              </label>
              <input
                type="text"
                value={prosText}
                onChange={(e) => setProsText(e.target.value)}
                placeholder="Boss design, Soundtrack, Lore"
                className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-1.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-rose-400 mb-1">
                Cons (comma-separated)
              </label>
              <input
                type="text"
                value={consText}
                onChange={(e) => setConsText(e.target.value)}
                placeholder="Stuttering in busy areas"
                className="w-full rounded-xl border border-white/10 bg-[#121625] px-3.5 py-1.5 text-xs text-white focus:border-rose-400 focus:outline-none"
              />
            </div>
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
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-glow-purple hover:from-purple-400 hover:to-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Posting...' : 'Publish Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
