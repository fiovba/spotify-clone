import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import SearchBar from './sidebarComponents/SearchBar';
import CreatePlaylistButton from './sidebarComponents/CreatePlaylistButton';

const Sidebar = ({ isOpen, setIsOpen, playlists, setPlaylists, podcasts, artists }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user, setUser] = useState(null);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const categories = ["Playlists", "Artists", "Podcast"];

  // Load user
  useEffect(() => { 
    setUser(JSON.parse(localStorage.getItem('user'))); 
  }, []);

  // Filtered lists
  useEffect(() => { setFilteredPlaylists(playlists); }, [playlists]);
  useEffect(() => {
    setFilteredArtists(user?.followedArtists?.length > 0
      ? artists.filter(a => user.followedArtists.includes(a.id))
      : []);
  }, [artists, user]);
  useEffect(() => { setFilteredPodcasts(podcasts); }, [podcasts]);

  // Search handler
  const handleSearch = (query) => {
    const q = query.toLowerCase();
    if (!q.trim()) {
      if (activeIndex === 0) setFilteredPlaylists(playlists);
      else if (activeIndex === 1) setFilteredArtists(user?.followedArtists?.length>0 ? artists.filter(a=>user.followedArtists.includes(a.id)) : []);
      else setFilteredPodcasts(podcasts);
    } else {
      if (activeIndex === 0) setFilteredPlaylists(playlists.filter(p=>p.name.toLowerCase().includes(q)));
      else if (activeIndex === 1) setFilteredArtists(artists.filter(a=>user?.followedArtists?.includes(a.id)).filter(a=>a.name.toLowerCase().includes(q)));
      else setFilteredPodcasts(podcasts.filter(p=>p.name.toLowerCase().includes(q)));
    }
  };

  // List renderer
  const renderList = (items, isArtist = false) => items.map(item => (
    <li 
      key={item.id} 
      onClick={() => navigate(isArtist ? `/artists/${item.id}` : `/playlist/${item.id}`)}
      className="rounded p-1 hover:bg-[#333] transition-colors cursor-pointer"
    >
      <div className="flex gap-2">
        <img src={item.image} alt="cover" className={`w-10 h-10 object-cover ${isArtist?'rounded-full':'rounded-sm'}`} />
        {isOpen && (
          <div className="flex flex-col justify-center w-full">
            <p className="text-sm font-medium">{isArtist ? item.name : item.name || item.title}</p>
            <p className="text-xs font-medium text-gray-500">{user.name}</p>
          </div>
        )}
      </div>
    </li>
  ));

  return (
    <div className="transition-all duration-500 text-white p-4 flex flex-col overflow-hidden relative">

      {/* Header + Toggle */}
      <div className={`mb-4 flex ${isOpen ? "justify-between items-center flex-row" : "flex-col items-start gap-2"}`}>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white pl-3 hover:scale-110 transition-transform duration-300">
          {!isOpen ? <LuPanelLeftOpen size={24}/> : <LuPanelRightOpen size={24}/>}
        </button>
        {isOpen && <h2 className="text-md md:text-lg font-bold">Your Library</h2>}
        {isOpen && user && <button onClick={()=>setShowCreateForm(!showCreateForm)} className="text-md p-3 font-bold flex justify-center items-center bg-[#222] hover:bg-[#444] rounded-full transition"><FiPlus size={19}/></button>}
      </div>

      {/* Create Playlist Form */}
      {isOpen && showCreateForm && (
        <div className="fixed left-14 top-35 z-[999] w-60 bg-[#282828] text-white rounded-md shadow-lg py-2 hover:bg-[#3e3e3e]">
          <CreatePlaylistButton playlists={playlists} setPlaylists={setPlaylists} setShowCreateForm={setShowCreateForm} user={user} />
        </div>
      )}

      {/* Guest cards */}
      {!user && isOpen && (
        <div className="bg-[#121212] p-4 rounded-lg text-white w-full max-w-sm mx-auto flex flex-col gap-4">
          <div className="bg-[#242424] rounded-lg p-4 flex flex-col justify-between">
            <div>
              <p className="font-bold text-lg">Create your first playlist</p>
              <p className="text-sm mb-3">It's easy, we'll help you</p>
            </div>
            <button className="bg-white text-xs sm:text-sm text-black font-bold px-4 py-1 sm:px-4 sm:py-2 rounded-full hover:scale-105 transition-transform">Create playlist</button>
          </div>
          <div className="bg-[#242424] rounded-lg p-4 flex flex-col justify-between">
            <div>
              <p className="font-bold text-lg">Let's find some podcasts to follow</p>
              <p className="text-sm mb-3">We'll keep you updated on new episodes</p>
            </div>
            <button className="bg-white text-xs sm:text-sm text-black font-bold px-4 py-1 sm:px-4 sm:py-2 rounded-full hover:scale-105 transition-transform">Browse podcasts</button>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex gap-2 mb-2 overflow-x-auto lg:overflow-hidden scrollbar-hidden">
        {user && isOpen && categories.map((cat,i) => (
          <button key={i} onClick={()=>setActiveIndex(i)} className={`px-4 py-1 font-bold text-sm rounded-full transition-colors duration-200 ${activeIndex===i ? "bg-[#fff] text-black" : "bg-[#3f3f3f]/50 text-white/60"} hover:bg-[#3f3f3f]`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      {user && <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} onSearch={handleSearch}/>}

      {/* Lists */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <ul className="space-y-1">
          {activeIndex === 0 && renderList(filteredPlaylists)}
          {activeIndex === 1 && renderList(filteredArtists, true)}
          {activeIndex === 2 && renderList(filteredPodcasts)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
