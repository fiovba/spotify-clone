import React, { useEffect, useState, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getArtists, getSongs } from "../service/service";
import SongList from "../component/SongLists";
import DetailsFooter from "../component/DetailsFooter";
import { updateUser } from "../service/authServices";
import { MdVerified } from "react-icons/md";
import Toast from "../component/Toast";
import {useDominantColor} from "../hook/useDominantColor";

const ArtistsDetailPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const imgRef = useRef(null);

  const {
    artists,
    playlists,
    setPlaylists,
    user,
    songs,
    setCurrentSong,
    setUser,
    setShowToast,
    showToast
  } = useOutletContext();

  const dominantColor = useDominantColor(imgRef);

  useEffect(() => {
    if (!artists || artists.length === 0) return;

    const foundArtist = artists.find((a) => a.id.toString() === id);
    setArtist(foundArtist);

    if (user && foundArtist) {
      setIsFollowing(user.followedArtists?.includes(foundArtist.id));
    }

    setLoading(false);
  }, [id, artists, user]);

  const handleFollowToggle = async () => {
    if (!user) {
      setShowToast(true);
      return;
    }

    const followedArtists = user.followedArtists || [];
    const updatedFollowedArtists = isFollowing
      ? followedArtists.filter((artId) => artId !== artist.id)
      : [...followedArtists, artist.id];

    const updatedUser = {
      ...user,
      followedArtists: updatedFollowedArtists,
    };

    try {
      const newUserData = await updateUser(user.id, updatedUser);
      localStorage.setItem("user", JSON.stringify(newUserData));
      setUser(newUserData);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleSongClick = (song) => {
    if (!user) {
      setShowToast(true);
      return;
    }
    setCurrentSong(song);
  };

  if (loading || !artist)
    return <div className="text-white p-4">Loading...</div>;

  const getSongsByArtist = (songs, artistName) =>
    songs.filter((song) =>
      song.artist.toLowerCase().includes(artistName.toLowerCase())
    );

  const artistSongs = getSongsByArtist(songs, artist.name);

  return (
    <div className="text-white">
      {/* HEADER */}
      <div
        className="relative w-full flex flex-col sm:flex-row justify-start sm:gap-10 items-center sm:items-start px-6 md:px-12 py-8"
        style={{
          background: dominantColor
            ? `linear-gradient(to bottom, ${dominantColor}, #121212)`
            : "black",
        }}
      >
        {/* Artist şəkli */}
        <div className="mb-4 sm:mb-0">
          <img
            ref={imgRef}
            crossOrigin="anonymous"
            src={artist.image}
            alt={artist.name}
            className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
          />
        </div>
        <div className="text-center sm:text-left">
          <p className="mb-[-19px] pt-3 font-bold flex items-center justify-center sm:justify-start gap-2">
            <MdVerified className="text-[#4cb3ff]" size={19} />
            Verified Artist
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-8xl poppins-extrabold mt-8">
            {artist.name}
          </h1>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-4 flex items-center gap-4 px-[40px] ">
        <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-black font-bold">
          Play
        </button>
        <button
          onClick={handleFollowToggle}
          className={`border border-gray-400 px-6 py-2 rounded-full text-white hover:bg-white/10`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {/* SONGS */}
      <div className="mt-12 px-6 md:px-12">
        <SongList setCurrentSong={handleSongClick} songs={artistSongs} />
      </div>

      {/* FOOTER */}
      <div className="w-full border-t border-[#222]">
        <DetailsFooter />
      </div>

      {showToast && (
        <Toast
          show={showToast}
          setShowToast={setShowToast}
     
        />
      )}
    </div>
  );
};

export default ArtistsDetailPage;
