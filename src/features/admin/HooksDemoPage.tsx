/**
 * Composant Démonstration Simple - Tester un Hook à la Fois
 * Utile pour vérifier qu'un hook fonctionne correctement de manière isolée
 */

import React, { useState } from "react";
import { useArtists } from "../../hooks/useArtists";
import { GenreMusic } from "../../domain";

export function HooksDemoPage() {
  const [activeDemo, setActiveDemo] = useState<"artists" | "events" | "venues">("artists");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">🎯 Hooks Demo - Live Testing</h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveDemo("artists")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeDemo === "artists"
                ? "bg-orange-500 text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Artists Demo
          </button>
          <button
            onClick={() => setActiveDemo("events")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeDemo === "events"
                ? "bg-orange-500 text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Events Demo
          </button>
          <button
            onClick={() => setActiveDemo("venues")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeDemo === "venues"
                ? "bg-orange-500 text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Venues Demo
          </button>
        </div>

        {activeDemo === "artists" && <ArtistsDemoComponent />}
        {activeDemo === "events" && <EventsDemoComponent />}
        {activeDemo === "venues" && <VenuesDemoComponent />}
      </div>
    </div>
  );
}

/**
 * Démo du hook useArtists avec interactions en temps réel
 */
function ArtistsDemoComponent() {
  const { artists, loading, findByGenre, findVerified, findTopRated, search } = useArtists();
  const [selectedGenre, setSelectedGenre] = useState<GenreMusic | "">("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showTopOnly, setShowTopOnly] = useState(false);

  let displayedArtists = artists;

  if (searchTerm) {
    displayedArtists = search(searchTerm);
  } else if (selectedGenre) {
    displayedArtists = findByGenre(selectedGenre);
  } else if (showVerifiedOnly) {
    displayedArtists = findVerified();
  } else if (showTopOnly) {
    displayedArtists = findTopRated(10);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4">🎤 Artists Hook Demo</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem label="Total" value={artists.length} />
          <StatItem label="Verified" value={findVerified().length} />
          <StatItem label="Top Rated" value={findTopRated(1).length} />
          <StatItem label="Loading" value={loading ? "⏳" : "✅"} />
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
        <h3 className="text-xl font-bold text-white">🔧 Controls</h3>

        {/* Search */}
        <div>
          <label className="block text-white mb-2 font-semibold">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search artist name..."
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Genre Filter */}
        <div>
          <label className="block text-white mb-2 font-semibold">Filter by Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value as GenreMusic | "")}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Genres</option>
            {Object.values(GenreMusic).map((genre) => (
              <option key={genre} value={genre}>
                {genre.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              showVerifiedOnly
                ? "bg-green-500 text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Verified Only
          </button>
          <button
            onClick={() => setShowTopOnly(!showTopOnly)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              showTopOnly ? "bg-blue-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Top Rated
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4">
          📊 Results ({displayedArtists.length})
        </h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {displayedArtists.length > 0 ? (
            displayedArtists.map((artist) => (
              <div key={artist.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-white flex items-center gap-2">
                      {artist.stageName}
                      {artist.isVerified && <span className="text-blue-400">✓</span>}
                    </div>
                    <div className="text-sm text-purple-300 mt-1">{artist.genres.join(", ")}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-400 font-bold">⭐ {artist.rating.toFixed(1)}</div>
                    <div className="text-xs text-purple-300">
                      {artist.followerCount.toLocaleString()} followers
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-purple-300 py-8">No artists found</div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Démo du hook useEvents
 */
function EventsDemoComponent() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4">📅 Events Hook Demo</h2>
      <p className="text-purple-200">Coming soon...</p>
    </div>
  );
}

/**
 * Démo du hook useVenues
 */
function VenuesDemoComponent() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4">🏛️ Venues Hook Demo</h2>
      <p className="text-purple-200">Coming soon...</p>
    </div>
  );
}

/**
 * Composant utilitaire
 */
function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
      <div className="text-purple-300 text-xs font-semibold">{label}</div>
      <div className="text-2xl font-bold text-white mt-1">{value}</div>
    </div>
  );
}
