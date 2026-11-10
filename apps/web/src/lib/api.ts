import {
  Game,
  Collection,
  Review,
  LibraryStats,
  FilterParams,
  GameStatus,
} from './types';

const API_BASE = '/api/v1';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text();
    let message = `API request failed with status ${res.status}`;
    try {
      const parsed = JSON.parse(errorText);
      message = parsed.error?.message || parsed.message || message;
    } catch (_) {}
    throw new Error(message);
  }
  const json = await res.json();
  return json.data;
}

export async function fetchGames(params: FilterParams = {}): Promise<{
  items: Game[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}> {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.genre) query.append('genre', params.genre);
  if (params.platform) query.append('platform', params.platform);
  if (params.status && params.status !== 'ALL') query.append('status', params.status);
  if (typeof params.isFavorite === 'boolean')
    query.append('isFavorite', params.isFavorite.toString());
  if (params.sortBy) query.append('sortBy', params.sortBy);
  if (params.sortOrder) query.append('sortOrder', params.sortOrder);

  const res = await fetch(`${API_BASE}/games?${query.toString()}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to load games');
  const json = await res.json();
  return {
    items: json.data || [],
    meta: json.meta || { total: 0, page: 1, limit: 20, totalPages: 1 },
  };
}

export async function fetchFeaturedGames(): Promise<Game[]> {
  const res = await fetch(`${API_BASE}/games/featured`, { cache: 'no-store' });
  return handleResponse<Game[]>(res);
}

export async function fetchGameById(id: string): Promise<Game> {
  const res = await fetch(`${API_BASE}/games/${id}`, { cache: 'no-store' });
  return handleResponse<Game>(res);
}

export async function createGame(data: Partial<Game>): Promise<Game> {
  const res = await fetch(`${API_BASE}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Game>(res);
}

export async function updateGame(
  id: string,
  data: Partial<Game>,
): Promise<Game> {
  const res = await fetch(`${API_BASE}/games/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Game>(res);
}

export async function deleteGame(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/games/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<{ success: boolean }>(res);
}

export async function toggleFavorite(id: string): Promise<Game> {
  const res = await fetch(`${API_BASE}/games/${id}/favorite`, {
    method: 'PATCH',
  });
  return handleResponse<Game>(res);
}

export async function updateGameStatus(
  id: string,
  status: GameStatus,
): Promise<Game> {
  const res = await fetch(`${API_BASE}/games/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse<Game>(res);
}

export async function logPlaytime(
  id: string,
  additionalMinutes: number,
): Promise<Game> {
  const res = await fetch(`${API_BASE}/games/${id}/playtime`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ additionalMinutes }),
  });
  return handleResponse<Game>(res);
}

export async function fetchGenres(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/games/genres`, { cache: 'no-store' });
  return handleResponse<string[]>(res);
}

export async function fetchPlatforms(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/games/platforms`, { cache: 'no-store' });
  return handleResponse<string[]>(res);
}

export async function fetchCollections(): Promise<Collection[]> {
  const res = await fetch(`${API_BASE}/collections`, { cache: 'no-store' });
  return handleResponse<Collection[]>(res);
}

export async function fetchCollectionById(id: string): Promise<Collection> {
  const res = await fetch(`${API_BASE}/collections/${id}`, { cache: 'no-store' });
  return handleResponse<Collection>(res);
}

export async function createCollection(
  data: Partial<Collection>,
): Promise<Collection> {
  const res = await fetch(`${API_BASE}/collections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Collection>(res);
}

export async function addGameToCollection(
  collectionId: string,
  gameId: string,
): Promise<Collection> {
  const res = await fetch(`${API_BASE}/collections/${collectionId}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId }),
  });
  return handleResponse<Collection>(res);
}

export async function removeGameFromCollection(
  collectionId: string,
  gameId: string,
): Promise<{ success: boolean }> {
  const res = await fetch(
    `${API_BASE}/collections/${collectionId}/games/${gameId}`,
    { method: 'DELETE' },
  );
  return handleResponse<{ success: boolean }>(res);
}

export async function fetchReviews(gameId: string): Promise<Review[]> {
  const res = await fetch(`${API_BASE}/reviews/game/${gameId}`, {
    cache: 'no-store',
  });
  return handleResponse<Review[]>(res);
}

export async function submitReview(data: Partial<Review>): Promise<Review> {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Review>(res);
}

export async function voteHelpful(reviewId: string): Promise<Review> {
  const res = await fetch(`${API_BASE}/reviews/${reviewId}/helpful`, {
    method: 'PATCH',
  });
  return handleResponse<Review>(res);
}

export async function fetchStats(): Promise<LibraryStats> {
  const res = await fetch(`${API_BASE}/stats`, { cache: 'no-store' });
  return handleResponse<LibraryStats>(res);
}
