// ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { getArtists, getSongs, getPlaylists } from "../service/service";
import { useNavigate, useOutletContext } from "react-router";
import { FaPlay } from "react-icons/fa";
import ArtistCard from "../component/mainContentComponents/artistCard";
import { useDominantColor } from "../hook/useDominantColor"; 

const ProfilePage = () => {
  const {
    playlists,
    setPlaylists,
    artists,
    setArtists,
    user
  } = useOutletContext();

  const [filteredArtists, setFilteredArtists] = useState([]);
  const navigate = useNavigate();

  const toBase64Image = (base64, type = "jpeg") => {
    if (!base64) return "/default-profile.png";
    if (base64.startsWith("data:image")) return base64;
    return `data:image/${type};base64,${base64}`;
  };
  const bgColor = useDominantColor(toBase64Image(user?.image));

  useEffect(() => {
    if (user?.followedArtists?.length > 0) {
      const filtered = artists.filter(artist =>
        user.followedArtists.includes(artist.id)
      );
      setFilteredArtists(filtered);
    } else {
      setFilteredArtists([]);
    }
  }, [artists, user]);

  if (!user) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (
    <div
      className="text-white p-6 min-h-screen"
      style={{
        background: `linear-gradient(to bottom, rgba(${bgColor.join(
          ","
        )}, 0.15), #121212)`
      }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <img
          src={toBase64Image(user.image)}
          alt={user.name}
          crossOrigin="anonymous"
          className="w-52 h-52 sm:w-52 sm:h-52 md:w-36 md:h-36 rounded-full shadow-lg object-cover"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p>{playlists.length} Public Playlists</p>
        </div>
      </div>

      {/* Public Playlists */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Public Playlists</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-hidden px-2">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              className="flex-shrink-0 hover:bg-[#444] rounded-lg p-3 transition"
            >
              <img
                src={toBase64Image(pl.image)}
                alt={pl.name}
                className="w-40 h-40 object-cover rounded"
              />
              <p
                className="mt-2 text-sm font-medium truncate hover:underline"
                onClick={() => navigate(`/playlist/${pl.id}`)}
              >
                {pl.name}
              </p>
              <p className="text-xs text-gray-400 truncate">By {user.name}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-[40px] mt-10">Following</h2>
        <div className="flex overflow-x-auto gap-4 px-2 py-2 scrollbar-hidden">
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
