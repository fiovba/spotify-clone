import React, { useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import DuplicateSongModal from "./DuplicateSongModal";
import Toast from "../Toast"; 
import { updatePlaylist } from "../../service/service";

const SongCard = ({
  songs,
  song,
  setCurrentSong,
  setCurrentPlaylistSongs,
  playlists,
  setPlaylists,
  setIsTrackPanelOpen,
  user,
  setShowToast,
  showToast,
  onPlay
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicatePlaylistName, setDuplicatePlaylistName] = useState("");

  const handleAddToPlaylist = async (playlistId) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist) return;

    const newSongs = [...(playlist.songs || [])];

    if (newSongs.includes(song.id)) {
      setDuplicatePlaylistName(playlist.name);
      setShowDuplicateModal(true);
      return;
    }

    newSongs.push(song.id);

    const updated = {
      ...playlist,
      songs: newSongs,
    };

    await updatePlaylist(playlistId, updated);
    setPlaylists((prev) =>
      prev.map((p) => (p.id === playlistId ? updated : p))
    );

    setShowDropdown(false);
  };
const handlePlayClick = (e) => {
  if (e) e.stopPropagation();

  if (!user) {
    setShowToast(true);
    return;
  }

  setCurrentSong(song);
  setCurrentPlaylistSongs(songs);


  if (onPlay) {
    onPlay(song);
  }

  setIsTrackPanelOpen(true);
};


  return (
    <div
      onClick={handlePlayClick}
      className="relative w-50  md:w-56 flex-shrink-0 rounded-md px-2 hover:bg-[#1a1a1a] transition-all group cursor-pointer"
    >
      <div className="relative">
        <img
          src={song.cover}
          alt={song.title}
          className="rounded-md w-full h-48 sm:h-52 md:h-56 object-cover"
        />

        {/* Play Button */}
        <button
          onClick={(e) => handlePlayClick(e)}
          className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full text-sm sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
        >
          <FaPlay />
        </button>

        {/* + Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm"
          >
            <FaPlus size={12} />
          </button>

          {showDropdown && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 mt-2 w-44 bg-neutral-900 border border-neutral-700 rounded shadow-lg z-10"
            >
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => handleAddToPlaylist(playlist.id)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-800 text-white"
                  >
                    {playlist.name}
                  </button>
                ))
              ) : (
                <p className="text-sm px-4 py-2 text-white/60">
                  No playlists found
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-white text-sm font-semibold truncate">
          {song.title}
        </h3>
        <p className="text-gray-400 text-xs truncate">{song.artist}</p>
      </div>

      <DuplicateSongModal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        playlistName={duplicatePlaylistName}
      />

      <Toast show={showToast} setShowToast={setShowToast} />
    </div>
  );
};

export default SongCard;
