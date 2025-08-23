import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Toast from './Toast';
import PlaylistItem from './mainContentComponents/PlaylistItem';
import SongCard from './mainContentComponents/SongCard';
import ArtistCard from './mainContentComponents/ArtistCard';
import PodcastCard from './mainContentComponents/PodcastCard';
import { updatePlaylist } from '../service/service';
import { FaBars } from 'react-icons/fa';
import RightSidebar from './mobileComponents/RightSidebar';
const MainContent = () => {

    const [filterType, setFilterType] = useState("all");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const {
        playlists,
        setPlaylists,
        songs,
        recentlyPlayed,
        setRecentlyPlayed,
        currentSong,
        setCurrentSong,
        artists,
        podcasts,
        episodes,
        user,
        setUser,
        setIsTrackPanelOpen,
        setCurrentPlaylistSongs,
        showToast,
        setShowToast
    } = useOutletContext();

    const navigate = useNavigate();

    const handlePlay = (song) => {
        if (user?.id) {
            const updatedRecent = [song, ...recentlyPlayed.filter(s => s.id !== song.id)].slice(0, 10);
            setRecentlyPlayed(updatedRecent);
            localStorage.setItem('recentlyPlayed', JSON.stringify(updatedRecent));
            setCurrentSong(song);
        } else {
            setShowToast(true);
        }
    };

    const handleAddToPlaylist = async (playlistId, songId) => {
        const playlist = playlists.find(p => p.id === playlistId);
        if (!playlist) return;
        if (playlist.songs && playlist.songs.includes(songId)) return;

        const updated = {
            ...playlist,
            songs: [...(playlist.songs || []), songId],
        };

        await updatePlaylist(playlistId, updated);
        const updatedPlaylists = playlists.map(p => (p.id === playlistId ? updated : p));
        setPlaylists(updatedPlaylists);
    };
    const showPlaylists = filterType === "all";
    const showSongs = filterType === "all" || filterType === "music";
    const showArtists = filterType === "all";
    const showRecentlyPlayed = filterType === "all" || filterType === "music";
    const showPodcasts = filterType === "all" || filterType === "podcasts";

    return (
        <div className="text-white ">

            <div
                className="md:relative sticky top-0 z-20 border-b border-[#2a2a2a] p-5 bg-[#121212]"

            >
                <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2 items-center">

                        <div className="md:hidden flex-shrink-0">
                            {user && (
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={user.image}
                                    alt="profile"
                                />
                            )}
                        </div>

                        {/* filter düymələri */}
                        <div className="flex gap-2 overflow-x-auto scrollbar-hidden flex-nowrap">
                            <button
                                onClick={() => setFilterType("all")}
                                className={`md:px-3 md:py-2 px-3 py-1 text-xs sm:text-sm md:text-base font-bold rounded-4xl ${filterType === "all"
                                    ? "bg-[#ffffff] text-black"
                                    : "bg-[#3f3f3f]/70 text-white hover:bg-[#3f3f3f]"
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterType("music")}
                                className={`md:px-3 md:py-2 px-3 py-1 text-xs sm:text-sm md:text-base font-bold rounded-4xl ${filterType === "music"
                                    ? "bg-[#ffffff] text-black"
                                    : "bg-[#3f3f3f]/70 text-white hover:bg-[#3f3f3f]"
                                    }`}
                            >
                                Music
                            </button>
                            <button
                                onClick={() => setFilterType("podcasts")}
                                className={`md:px-3 md:py-2 px-3 py-1 text-xs sm:text-sm md:text-base font-bold rounded-4xl ${filterType === "podcasts"
                                    ? "bg-[#ffffff] text-black"
                                    : "bg-[#3f3f3f]/70 text-white hover:bg-[#3f3f3f]"
                                    }`}
                            >
                                Podcasts
                            </button>
                        </div>
                    </div>

                    <div className="md:hidden flex-shrink-0">
                        <FaBars
                            size={20}
                            className="cursor-pointer"
                            onClick={() => setIsSidebarOpen(true)}
                        />
                    </div>
                </div>

            </div>




            <div className="p-3 md:p-10 pt-3">
                {user && showPlaylists && (
                    <>
                        <h2 className="md:text-2xl poppins-bold mb-4">Your Playlists</h2>
                        <div onPlay={handlePlay} className="grid justify-center grid-cols-2 md:grid-cols-3 gap-4">
                            {playlists.map(p => (
                                <PlaylistItem key={p.id} playlist={p} />
                            ))}
                        </div>
                    </>
                )}

                {showSongs && (
                    <div className="mt-8">
                        <h2 className="md:text-2xl poppins-bold mb-2">Trending Songs</h2>
                        <div className="flex overflow-x-auto gap-4 px-4 py-2 flex-nowrap scrollbar-hidden">
                            {songs.map(song => (
                                <SongCard
                                    onPlay={handlePlay}
                                    setIsTrackPanelOpen={setIsTrackPanelOpen}
                                    user={user}
                                    setCurrentSong={setCurrentSong}
                                    key={song.id}
                                    song={song}
                                    setCurrentPlaylistSongs={setCurrentPlaylistSongs}
                                    playlists={playlists}
                                    setPlaylists={setPlaylists}
                                    songs={songs}
                                    onAddToPlaylist={handleAddToPlaylist}
                                    showToast={showToast}
                                    setShowToast={setShowToast}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {showArtists && (
                    <div className="mt-8">
                        <h2 className="md:text-2xl poppins-bold mb-2">Top Artists</h2>
                        <div className="flex overflow-x-auto gap-4 px-4 py-2 scrollbar-hidden">
                            {artists.map((artist) => (
                                <ArtistCard key={artist.id} artist={artist} />
                            ))}
                        </div>
                    </div>
                )}

                {user && showRecentlyPlayed && (
                    <div className="mt-8">
                        <h2 className="md:text-2xl poppins-bold mb-2">Recently Played</h2>
                        <div className="flex gap-4 overflow-x-auto scrollbar-hidden">
                            {recentlyPlayed.map(song => (
                                <SongCard
                                    
                                    setIsTrackPanelOpen={setIsTrackPanelOpen}
                                    user={user}
                                    setCurrentSong={setCurrentSong}
                                    key={song.id}
                                    song={song}
                                    onPlay={handlePlay}
                                    playlists={playlists}
                                    setPlaylists={setPlaylists}
                                    onAddToPlaylist={handleAddToPlaylist}
                                    setShowToast={setShowToast}
                                    showToast={showToast}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {showPodcasts && (
                    <>
                        <div className='md:text-2xl poppins-bold mt-[40px]'>Podcasts</div>
                        <div onPlay={handlePlay} className="grid place-items-center justify-center grid-cols-1 md:grid-cols-2 gap-5 mt-[40px] md:mt-[-30px] min-h-screen max-w-4xl mx-auto">
                            {podcasts.map(pod => {
                                const podEpisodes = episodes.filter(e => e.podcastId === pod.id);
                                return (
                                    <PodcastCard key={pod.id} podcast={pod} episodes={podEpisodes} />
                                );
                            })}
                        </div>
                    </>
                )}

                {showToast && <Toast show={showToast} setShowToast={setShowToast} />}

            </div>
            <RightSidebar
                setUser={setUser}
                isSidebarOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                user={user}

            />

        </div>
    );
};

export default MainContent;
