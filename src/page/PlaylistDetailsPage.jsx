import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { deletePlaylist, getPlaylistById, removeSongFromPlaylist } from "../service/service";
import { FaPlay, FaRegClock, FaHeart } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { TbDots } from "react-icons/tb";
import { LuCircleMinus } from "react-icons/lu";
import EditModal from "../component/EditModal";
import DetailsFooter from "../component/DetailsFooter";
import { useDominantColor } from "../hook/useDominantColor";

const PlaylistDetailsPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [songDropdownOpen, setSongDropdownOpen] = useState(null);
  const navigate = useNavigate();

  const {
    playlists,
    setPlaylists,
    user,
    songs,
    setCurrentSong,
    setCurrentPlaylistSongs,
  } = useOutletContext();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylistById(id);
        setPlaylist(data);
      } catch (error) {
        console.error("Playlist yüklənərkən xəta:", error);
      }
    };
    fetchPlaylist();
  }, [id]);

  const imgSrc = playlist?.image || null;
  const bgColor = useDominantColor(imgSrc, 1, [34, 34, 34]);

  function getPlaylistDurationInHours(song) {
    if (!song || song.length === 0) return 0;
    let totalSeconds = 0;
    song.forEach(song => {
      if (!song.duration) return;
      const [min, sec] = song.duration.split(":").map(Number);
      totalSeconds += min * 60 + (sec || 0);
    });
    return Math.round(totalSeconds / 3600);
  }

  const handleDelete = async () => {
    const index = playlists.findIndex(p => p.id === playlist.id);
    const previous = index > 0 ? playlists[index - 1] : playlists[index + 1];

    try {
      await deletePlaylist(playlist.id);
      setPlaylists(prev => prev.filter(p => p.id !== playlist.id));
      navigate(previous ? `/playlist/${previous.id}` : "/");
      setIsOpen(false);
    } catch (error) {
      console.error("Playlist silinərkən xəta:", error);
    }
  };

  const handleRemoveSong = async (songId) => {
    if (!playlist) return;
    try {
      const updatedPlaylist = await removeSongFromPlaylist(playlist.id, songId);
      setPlaylist(updatedPlaylist);
      setPlaylists(prev =>
        prev.map(p => (p.id === updatedPlaylist.id ? updatedPlaylist : p))
      );
      setSongDropdownOpen(null);
    } catch (error) {
      console.error("Mahnını silərkən xəta:", error);
    }
  };

  const playlistSongs = playlist?.songs
    ?.map(songId => songs.find(song => song.id === songId))
    .filter(Boolean);

  if (!playlist) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen w-full text-white"

    >
      {/* Header */}
      <div
        className="flex flex-col md:flex-row items-center md:items-end gap-6 px-6 pt-8 pb-12"
        style={{
          background: `linear-gradient(rgb(${bgColor.join(",")}), #121212)`,
        }}
      >
        {/* Playlist Image */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={playlist.image}
            alt="playlist"
            crossOrigin="anonymous"
            className="w-48 h-48 md:w-52 md:h-52 rounded shadow-lg object-cover"
          />

          {/* User info (Mobile) */}
          <div className="flex flex-col items-center mt-4 md:hidden">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={user?.image}
              alt=""
            />
            <span className="text-sm mt-1">{user?.name || "User"}</span>
          </div>
        </div>

        {/* Playlist Info */}
        <div className="flex flex-col justify-end text-center md:text-left">
          <p className="text-xs md:text-sm font-semibold uppercase">Playlist</p>

          <h1
            className="poppins-extrabold mt-2 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 6vw, 5rem)" }}
          >
            {playlist?.name}
          </h1>

          {/* Mobile info */}
          <p className="text-sm text-gray-300 mt-2 md:hidden">
            {playlist?.artists?.join(", ")} and more
          </p>

          {/* Desktop info */}
          <div className="hidden md:flex gap-2 pt-2 items-center text-sm text-white/80">
            <div className="flex items-center gap-2">
              <img
                className="w-6 h-6 rounded-full object-cover"
                src={user?.image}
                alt=""
              />
              <span>{user?.name || "User"}</span>
            </div>
            · {playlist.songs?.length || 0} songs,
            about {getPlaylistDurationInHours(playlistSongs)} hours
          </div>
        </div>
      </div>


      {/* Actions */}
      <div className="flex items-center justify-between px-8 pb-6">
        <div className="flex gap-6 text-2xl items-center">
          <FaHeart className="text-green-500" />
          <TbDots onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />
          {isOpen && (
            <div className="absolute mt-10 w-44 flex flex-col bg-[#121212] rounded-md shadow-lg z-50 border border-white/10">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-3 p-3 text-white hover:bg-[#222] text-sm"
              >
                <FiEdit2 /> Edit Details
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-3 p-3 text-white hover:bg-[#222] text-sm"
              >
                <LuCircleMinus /> Delete
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            setCurrentPlaylistSongs(playlistSongs);
            setCurrentSong(playlistSongs[0]);
          }}
          className="bg-green-500 hover:bg-green-400 text-black p-4 rounded-full shadow-lg"
        >
          <FaPlay size={24} />
        </button>
      </div>

      {/* Song List */}
      <div className="px-4 md:px-8">
        <div className="hidden md:grid grid-cols-12 py-2 border-b border-white/10 text-xs uppercase tracking-widest text-white/90">
          <div className="col-span-1">#</div>
          <div className="col-span-10">Title</div>
          <div className="col-span-1 flex justify-end"><FaRegClock /></div>
        </div>

        {playlistSongs?.map((song, index) => (
          <div
            onClick={() => setCurrentSong(song)}
            key={song.id}
            className="grid grid-cols-11 md:grid-cols-12 p-2 rounded-sm hover:bg-white/10 transition items-center text-white/90"
          >
            <div className="hidden md:block col-span-1">{index + 1}</div>
            <div className="col-span-10 flex items-center gap-3">
              <img src={song.cover} alt={song.title} className="w-12 h-12 rounded object-cover" />
              <div>
                <p className="font-medium text-sm md:text-base">{song.title}</p>
                <p className="text-xs md:text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>

            {/* Desktop duration + dots */}
            <div className="hidden md:flex col-span-1 text-xs gap-4 items-center justify-end">
              {song.duration || "-"}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSongDropdownOpen(songDropdownOpen === song.id ? null : song.id);
                  }}
                >
                  <TbDots size={18} className="text-white" />
                </button>
                {songDropdownOpen === song.id && (
                  <div
                    className="absolute bottom-[30px] right-0 w-44 flex flex-col bg-[#121212] rounded-md shadow-lg z-50 border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleRemoveSong(song.id)}
                      className="flex items-center gap-3 p-3 text-white hover:bg-[#222] text-sm"
                    >
                      <LuCircleMinus /> Remove from Playlist
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="w-full border-t border-[#222] mt-6">
        <DetailsFooter />
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <EditModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setPlaylists={setPlaylists}
          playlist={playlist}
          setPlaylist={setPlaylist}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default PlaylistDetailsPage;
