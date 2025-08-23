import React, { useEffect, useState } from "react";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";

// query stringləri oxumaq üçün funksiya
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  // parent layoutdan gələn datalar
  const { songs, artists, playlists } = useOutletContext();

  // url-dən "q" parametrini götür
  const query = useQuery().get("q") || "";

  // filterlənmiş nəticələr üçün state-lər
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);

  // input value üçün ayrıca state
  const [search, setSearch] = useState(query);

  // url dəyişmək üçün navigate
  const navigate = useNavigate();

  // query dəyişəndə filterləmə
  useEffect(() => {
    if (!query.trim()) {
      setFilteredSongs([]);
      setFilteredArtists([]);
      setFilteredPlaylists([]);
      return;
    }

    setFilteredSongs(
      songs.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredArtists(
      artists.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredPlaylists(
      playlists.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, songs, artists, playlists]);

  // input dəyişəndə həm state dəyişir, həm də url yenilənir
  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  // search boşdursa göstəriləcək rəngli category-lər
  const categories = [
    { id: 1, name: "Pop", color: "bg-pink-500" },
    { id: 2, name: "Hip-Hop", color: "bg-yellow-500" },
    { id: 3, name: "Rock", color: "bg-red-600" },
    { id: 4, name: "Jazz", color: "bg-blue-500" },
    { id: 5, name: "Classical", color: "bg-green-600" },
    { id: 6, name: "Podcasts", color: "bg-purple-600" },
    { id: 7, name: "Charts", color: "bg-orange-500" },
    { id: 8, name: "New Releases", color: "bg-indigo-500" },
  ];

  return (
    <div className="bg-[#121212] text-white min-h-screen p-6">
      {/* mobil üçün input */}
      <div className="mb-6 md:hidden">
        <input
          type="text"
          placeholder="What do you want to play?"
          value={search}
          onChange={handleChange}
          className="w-full bg-[#1e1e1e] text-white px-4 py-3 rounded-full outline-none placeholder:text-gray-400 focus:ring focus:ring-gray-500"
        />
      </div>

      {/* əgər query boşdursa Spotify kimi rəngli categorylər göstər */}
      {!query.trim() && (
        <>
          <h2 className="text-2xl font-bold mb-4">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`${cat.color} p-6 rounded-lg font-bold text-lg cursor-pointer hover:opacity-90`}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </>
      )}

      {/* query varsa nəticələr göstər */}
      {query.trim() && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Search results for "{query}"
          </h2>

          {/* songs nəticələri */}
          {filteredSongs.length > 0 && (
            <>
              <h3 className="text-xl font-bold mb-2">Songs</h3>
              {filteredSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center gap-3 p-2 bg-[#181818] rounded-md mb-2 hover:bg-[#282828]"
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-12 h-12 rounded-md"
                  />
                  <div>
                    <div className="font-semibold">{song.title}</div>
                    <div className="text-sm text-gray-400">{song.artist}</div>
                  </div>
                  <span className="ml-auto text-sm text-gray-400">
                    {song.duration}
                  </span>
                </div>
              ))}
            </>
          )}

          {/* artists nəticələri */}
          {filteredArtists.length > 0 && (
            <>
              <h3 className="text-xl font-bold mt-6 mb-2">Artists</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredArtists.map((artist) => (
                  <div
                    key={artist.id}
                    className="text-center bg-[#181818] p-4 rounded-lg hover:bg-[#282828]"
                  >
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-24 h-24 rounded-full mx-auto mb-3"
                    />
                    <div className="font-semibold">{artist.name}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* playlists nəticələri */}
          {filteredPlaylists.length > 0 && (
            <>
              <h3 className="text-xl font-bold mt-6 mb-2">Playlists</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="text-center bg-[#181818] p-4 rounded-lg hover:bg-[#282828]"
                  >
                    <img
                      src={playlist.image}
                      alt={playlist.name}
                      className="w-24 h-24 rounded-md mx-auto mb-3"
                    />
                    <div className="font-semibold">{playlist.name}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SearchPage;
