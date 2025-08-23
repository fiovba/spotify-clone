import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Sidebar from '../component/Sidebar';
import TrackInfoPanel from '../component/TrackInfoPanel';
import { Outlet } from 'react-router-dom';
import { getArtists, getEpisodes, getPlaylists, getPodcasts, getSongs } from '../service/service';
import { useAutoClose } from '../hook/useAutoClose';
import PreviewOfSpotifyFooter from '../component/PreviewOfSpotifyFooter';
import MobileBottomNav from '../component/mobileComponents/MobileBottomNav';
import MobileNowPlayingBar from '../component/mobileComponents/MobileNowPlayingBar';
import MobileFullPlayer from '../component/mobileComponents/MobileFullPlayer'; // 🔹 YENİ

function MainLayout() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [user, setUser] = useState(undefined);
  const [podcasts, setPodcast] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [isTrackPanelOpen, setIsTrackPanelOpen] = useState(false);
  const [currentPlaylistSongs, setCurrentPlaylistSongs] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [currentTab,setCurrentTab] = useState('Home')

  useAutoClose(isOpen, setIsOpen, isTrackPanelOpen, setIsTrackPanelOpen);

  useEffect(() => {
    async function fetchSongsAndPlaylists() {
      const data = await getSongs();
      setSongs(data);

      const artistsData = await getArtists();
      setArtists(artistsData);

      const savedCurrentSong = JSON.parse(localStorage.getItem('currentSong'));
      const savedRecentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];

      if (savedCurrentSong) setCurrentSong(savedCurrentSong);
      else if (data.length > 0) setCurrentSong(data[0]);

      setRecentlyPlayed(savedRecentlyPlayed);

      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);

      if (storedUser?.id) {
        const userPlaylists = await getPlaylists(storedUser.id);
        setPlaylists(userPlaylists);
      }
    }
    fetchSongsAndPlaylists();
  }, []);

  useEffect(() => {
    async function fetchPodcastsAndEpisodes() {
      const podcastsData = await getPodcasts();
      setPodcast(podcastsData);
      const episodesData = await getEpisodes();
      setEpisodes(episodesData);
    }
    fetchPodcastsAndEpisodes();
  }, []);

  useEffect(() => {
    if (currentSong) {
      localStorage.setItem('currentSong', JSON.stringify(currentSong));
    }
  }, [currentSong]);

  const toggleShuffle = () => {
    setShuffle(prev => !prev);
  };

  if (user === undefined) return null;

  return (
    <div className="flex flex-col h-screen bg-black text-white">

      {/* Header yalnız desktop üçün */}
      <Header className="md:h-[64px] hidden md:block" />

      <div className="flex gap-4 md:p-2 flex-1 overflow-hidden">

        {/* Sidebar yalnız desktop üçün */}
        <aside
          className={`md:bg-[#121212] md:rounded-2xl transition-all duration-500 overflow-y-auto scrollbar-hidden hidden md:block
          ${isOpen ? 'w-1/5' : 'w-[5.25rem]'}`}
          style={{ minHeight: 'calc(100% - 64px - 80px)' }}
        >
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            playlists={playlists}
            setPlaylists={setPlaylists}
            podcasts={podcasts}
            artists={artists}
          />
        </aside>

        {/* Main content */}
        <main
          className={`md:flex-1 md:pb-[70px] pb-[120px]  w-full  bg-[#121212] md:rounded-2xl overflow-y-auto transition-all duration-300 scrollbar-hidden
          ${isTrackPanelOpen ? 'md:mr-[24%]' : ''}`}
          style={{ minHeight: 'calc(100% - 64px - 70px)' }}
        >
          <Outlet
            context={{
              setCurrentPlaylistSongs,
              songs,
              setSongs,
              currentSong,
              setCurrentSong,
              recentlyPlayed,
              setRecentlyPlayed,
              shuffle,
              toggleShuffle,
              playlists,
              setPlaylists,
              podcasts,
              episodes,
              artists,
              user,
              setUser,
              isTrackPanelOpen,
              setIsTrackPanelOpen,
              setIsFullPlayerOpen,
              setShowToast,
              showToast
            }}
          />
        </main>

        {/* TrackInfoPanel yalnız desktop üçün */}
        {user && currentSong && isTrackPanelOpen && (
          <aside className="hidden md:block w-[23%] bg-[#121212] scrollbar-hidden rounded-2xl fixed right-2 top-[70px] bottom-[83px] z-40 overflow-auto">
            <TrackInfoPanel
              artists={artists}
              song={currentSong}
              showLyrics={showLyrics}
              onClose={() => setIsTrackPanelOpen(false)}
              setCurrentSong={setCurrentSong}
              setShowLyrics={setShowLyrics}
            />
          </aside>
        )}
      </div>
      {user ? (
        <div className="hidden md:block">
          {songs.length > 0 && currentSong ? (
            <Footer
              user={user}
              className="h-[70px]"
              songs={currentPlaylistSongs ?? songs}
              setIsTrackPanelOpen={setIsTrackPanelOpen}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              onToggleLyrics={() => setShowLyrics(prev => !prev)}
              recentlyPlayed={recentlyPlayed}
              setRecentlyPlayed={setRecentlyPlayed}
              shuffle={shuffle}
              isTrackPanelOpen={isTrackPanelOpen}
              toggleShuffle={toggleShuffle}
            />
          ) : null}
        </div>
      ) : (
        <div className="hidden md:block">
          <PreviewOfSpotifyFooter />
        </div>
      )}

      {/* Mobil görünüş */}
      <div className="md:hidden">
        <MobileNowPlayingBar
          song={currentSong}
          onClick={() => setIsFullPlayerOpen(true)}
        />
        <MobileBottomNav user={user} setShowToast={setShowToast} showToast={showToast} setCurrentTab={setCurrentTab} currentTab={currentTab}  />
      </div>

      {/*Mobile full player */}
      <MobileFullPlayer
        song={currentSong}
        isOpen={isFullPlayerOpen}
        onClose={() => setIsFullPlayerOpen(false)}
      />
    </div>
  );
}

export default MainLayout;
