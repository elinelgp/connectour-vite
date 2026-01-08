import { useState, useCallback, useEffect } from "react";
import { Artist, GenreMusic } from "../domain";
import { mockArtists } from "../mocks/data";

interface UseArtistsReturn {
  artists: Artist[];
  loading: boolean;
  error: string | null;

  // Actions
  followArtist: (artistId: string) => Promise<boolean>;
  unfollowArtist: (artistId: string) => Promise<boolean>;
  verifyArtist: (artistId: string) => Promise<boolean>;
  unverifyArtist: (artistId: string) => Promise<boolean>;
  addGenre: (artistId: string, genre: GenreMusic) => Promise<boolean>;
  removeGenre: (artistId: string, genre: GenreMusic) => Promise<boolean>;
  updateRating: (artistId: string, rating: number, reviewCount: number) => Promise<boolean>;

  // Filtres
  findByGenre: (genre: GenreMusic) => Artist[];
  findVerified: () => Artist[];
  findTopRated: (limit?: number) => Artist[];
  findByUserId: (userId: string) => Artist | undefined;
  findById: (id: string) => Artist | undefined;
  search: (query: string) => Artist[];

  refresh: () => Promise<void>;
}

export function useArtists(): UseArtistsReturn {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArtists = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      setArtists([...mockArtists]);
    } catch (err) {
      setError('Erreur lors du chargement des artistes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArtists();
  }, [loadArtists]);

  // === ACTIONS ===

  const followArtist = useCallback(async (artistId: string): Promise<boolean> => {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return false;

    artist.follow();
    await new Promise(resolve => setTimeout(resolve, 200));
    setArtists([...artists]);
    return true;
  }, [artists]);

  const unfollowArtist = useCallback(async (artistId: string): Promise<boolean> => {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return false;

    artist.unfollow();
    await new Promise(resolve => setTimeout(resolve, 200));
    setArtists([...artists]);
    return true;
  }, [artists]);

  const verifyArtist = useCallback(async (artistId: string): Promise<boolean> => {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return false;

    artist.verify();
    await new Promise(resolve => setTimeout(resolve, 200));
    setArtists([...artists]);
    return true;
  }, [artists]);

  const unverifyArtist = useCallback(async (artistId: string): Promise<boolean> => {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return false;

    artist.unverify();
    await new Promise(resolve => setTimeout(resolve, 200));
    setArtists([...artists]);
    return true;
  }, [artists]);

  const addGenre = useCallback(async (artistId: string, genre: GenreMusic): Promise<boolean> => {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return false;

    const success = artist.addGenre(genre);
    if (!success) return false;

    await new Promise(resolve => setTimeout(resolve, 200));
    setArtists([...artists]);
    return true;
  }, [artists]);

  const removeGenre = useCallback(async (artistId: string, genre: GenreMusic): Promise<boolean> => {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return false;

    const success = artist.removeGenre(genre);
    if (!success) return false;

    await new Promise(resolve => setTimeout(resolve, 200));
    setArtists([...artists]);
    return true;
  }, [artists]);

  const updateRating = useCallback(async (
    artistId: string,
    rating: number,
    reviewCount: number
  ): Promise<boolean> => {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return false;

    artist.updateRating(rating, reviewCount);
    await new Promise(resolve => setTimeout(resolve, 200));
    setArtists([...artists]);
    return true;
  }, [artists]);

  // === FILTRES ===

  const findByGenre = useCallback((genre: GenreMusic) => {
    return artists.filter(a => a.genres.includes(genre));
  }, [artists]);

  const findVerified = useCallback(() => {
    return artists.filter(a => a.isVerified);
  }, [artists]);

  const findTopRated = useCallback((limit: number = 10) => {
    return [...artists]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }, [artists]);

  const findByUserId = useCallback((userId: string) => {
    return artists.find(a => a.userId === userId);
  }, [artists]);

  const findById = useCallback((id: string) => {
    return artists.find(a => a.id === id);
  }, [artists]);

  const search = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return artists.filter(
      a =>
        a.stageName.toLowerCase().includes(lowerQuery) ||
        a.bio.toLowerCase().includes(lowerQuery)
    );
  }, [artists]);

  return {
    artists,
    loading,
    error,
    followArtist,
    unfollowArtist,
    verifyArtist,
    unverifyArtist,
    addGenre,
    removeGenre,
    updateRating,
    findByGenre,
    findVerified,
    findTopRated,
    findByUserId,
    findById,
    search,
    refresh: loadArtists,
  };
}

/**
 * Hook pour un artiste unique
 */
export function useArtist(artistId: string) {
  const {
    artists,
    loading,
    error,
    followArtist,
    unfollowArtist,
    verifyArtist,
    unverifyArtist,
    addGenre,
    removeGenre,
    updateRating,
  } = useArtists();

  const artist = artists.find(a => a.id === artistId);

  return {
    artist,
    loading,
    error,
    follow: () => followArtist(artistId),
    unfollow: () => unfollowArtist(artistId),
    verify: () => verifyArtist(artistId),
    unverify: () => unverifyArtist(artistId),
    addGenre: (genre: GenreMusic) => addGenre(artistId, genre),
    removeGenre: (genre: GenreMusic) => removeGenre(artistId, genre),
    updateRating: (rating: number, count: number) => updateRating(artistId, rating, count),
  };
}
