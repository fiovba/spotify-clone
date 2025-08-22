import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { LuCirclePlus, LuLibrary, LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
} from '../service/service';
import { FaMusic } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import SearchBar from './sidebarComponents/SearchBar';
import CreatePlaylistButton from './sidebarComponents/CreatePlaylistButton';

const Sidebar = ({ isOpen, setIsOpen, playlists, setPlaylists, podcasts, artists }) => {
  const [newPlaylist, setNewPlaylist] = useState({ name: '', image: '' });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user, setUser] = useState(null);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const categories = ["Playlists", "Artists", "Podcast"];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    setFilteredPlaylists(playlists);
  }, [playlists]);

  useEffect(() => {
    if (user?.followedArtists?.length > 0) {
      const filtered = artists.filter(artist => user.followedArtists.includes(artist.id));
      setFilteredArtists(filtered);
    } else {
      setFilteredArtists([]);
    }
  }, [artists, user]);

  useEffect(() => {
    setFilteredPodcasts(podcasts);
  }, [podcasts]);

  const handleSearch = (query) => {
    if (!query.trim()) {
      if (activeIndex === 0) setFilteredPlaylists(playlists);
      else if (activeIndex === 1) {
        if (user?.followedArtists?.length > 0) {
          setFilteredArtists(artists.filter(artist => user.followedArtists.includes(artist.id)));
        } else {
          setFilteredArtists([]);
        }
      } else if (activeIndex === 2) {
        setFilteredPodcasts(podcasts);
      }
    } else {
      if (activeIndex === 0) {
        setFilteredPlaylists(
          playlists.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        );
      } else if (activeIndex === 1) {
        setFilteredArtists(
          artists
            .filter(artist => user?.followedArtists?.includes(artist.id))
            .filter(artist => artist.name.toLowerCase().includes(query.toLowerCase()))
        );
      } else if (activeIndex === 2) {
        setFilteredPodcasts(
          podcasts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        );
      }
    }
  };

  return (
    <div className={`transition-all duration-500 text-white p-4 flex flex-col overflow-hidden relative`}>

      <div className={`mb-4 flex ${isOpen ? "justify-between items-center flex-row" : "flex-col items-start gap-2"}`}>
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white pl-3 hover:scale-110 transition-transform duration-300"
          >
            {!isOpen ? (
              <LuPanelLeftOpen size={24} />
            ) : (
              <span className="group relative inline-block">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <LuPanelRightOpen size={24} />
                </span>
              </span>
            )}
          </button>

          {isOpen && (
            <h2 className="text-md md:text-lg font-bold">Your Library</h2>
          )}
        </div>


        {isOpen && user && (
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className={`text-md p-3 font-bold  flex justify-center items-center bg-[#222] hover:bg-[#444] rounded-full transition ${isOpen ? "mt-0" : "mt-2"}`}
          >
            <FiPlus size={19} />
          </button>

        )}
      </div>
      {isOpen && showCreateForm && (
        <div className="fixed left-14 top-35 z-[999]  w-60 bg-[#282828]  text-white rounded-md shadow-lg py-2 hover:bg-[#3e3e3e]">

          <CreatePlaylistButton
            playlists={playlists}
            setPlaylists={setPlaylists}
            setShowCreateForm={setShowCreateForm}
            user={user}
          />
        </div>
      )}


     {!user && isOpen && (
  <div className="bg-[#121212] p-4 rounded-lg text-white w-full max-w-sm mx-auto flex flex-col gap-4">
    
    {/* Playlist Card */}
    <div className="bg-[#242424] rounded-lg p-4 flex flex-col justify-between">
      <div>
        <p className="font-bold text-lg">Create your first playlist</p>
        <p className="text-sm mb-3">It's easy, we'll help you</p>
      </div>
      <button className="bg-white text-xs sm:text-sm text-black font-bold px-4 py-1 sm:px-4 sm:py-2 rounded-full hover:scale-105 transition-transform">
        Create playlist
      </button>
    </div>

    {/* Podcast Card */}
    <div className="bg-[#242424] rounded-lg p-4 flex flex-col justify-between">
      <div>
        <p className="font-bold text-lg">Let's find some podcasts to follow</p>
        <p className="text-sm mb-3">We'll keep you updated on new episodes</p>
      </div>
      <button className="bg-white text-xs sm:text-sm text-black font-bold px-4 py-1 sm:px-4 sm:py-2 rounded-full hover:scale-105 transition-transform">
        Browse podcasts
      </button>
    </div>
  </div>
)}


      <div className="flex gap-2 mb-2 overflow-x-auto lg:overflow-hidden scrollbar-hidden">
        {user && isOpen && categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`px-4 py-1 font-bold text-sm rounded-full transition-colors duration-200 
              ${activeIndex === i ? "bg-[#fff] text-black" : "bg-[#3f3f3f]/50 text-white/60"} 
              hover:bg-[#3f3f3f]`}
          >
            {cat}
          </button>
        ))}
      </div>

      {user && <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} onSearch={handleSearch} />}

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <ul className="space-y-1">
          {activeIndex === 0 && user && filteredPlaylists.map(playlist => (
            <li onClick={() => navigate(`/playlist/${playlist.id}`)} key={playlist.id} className="rounded p-1 hover:bg-[#333] transition-colors">
              <div className="flex gap-2">
                <img src={playlist.image} alt="playlist" className="w-10 rounded-sm h-10 object-cover" />
                {isOpen && (
                  <div className="flex flex-col justify-center w-full">
                    <p className="text-sm font-medium">{playlist.name}</p>
                    <p className="text-xs font-medium text-gray-500">{user.name}</p>
                  </div>
                )}
              </div>
            </li>
          ))}

          {activeIndex === 1 && user && filteredArtists.map(artist => (
            <li onClick={() => navigate(`/artists/${artist.id}`)} key={artist.id} className="rounded p-1 hover:bg-[#333] transition-colors">
              <div className="flex gap-2">
                <img src={artist.image} alt="artist" className="w-10 rounded-full h-10 object-cover" />
                {isOpen && (
                  <div className="flex flex-col justify-center w-full">
                    <p className="text-sm font-medium">{artist.name}</p>
                    <p className="text-xs font-medium text-gray-500">{user.name}</p>
                  </div>
                )}
              </div>
            </li>
          ))}

          {activeIndex === 2 && filteredPodcasts.map(podcast => (
            <li onClick={() => navigate(`/playlist/${podcast.id}`)} key={podcast.id} className="rounded p-1 hover:bg-[#333] transition-colors">
              <div className="flex gap-2">
                <img src={podcast.image} alt="podcast" className="w-10 rounded-sm h-10 object-cover" />
                {isOpen && (
                  <div className="flex flex-col justify-center w-full">
                    <p className="text-sm font-medium">{podcast.title}</p>
                    <p className="text-xs font-medium text-gray-500">{user.name}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;