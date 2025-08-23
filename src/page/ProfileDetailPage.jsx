import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import ArtistCard from "../component/mainContentComponents/artistCard";
import { useDominantColor } from "../hook/useDominantColor";
import { FaMusic } from "react-icons/fa";

const ProfilePage = () => {
  const { playlists, artists, user } = useOutletContext();
  const [followedArtists, setFollowedArtists] = useState([]);
  const navigate = useNavigate();

 const toBase64Image = (img, type = "jpeg") => {
  if (!img) return null; 
  if (img.startsWith("data:image")) return img;
  if (img.startsWith("http")) return img;
  return `data:image/${type};base64,${img}`;
};

  const bgColor = useDominantColor(toBase64Image(user?.image));

  // User-in follow listi
  useEffect(() => {
    if (user?.followedArtists?.length > 0) {
      setFollowedArtists(
        artists.filter((artist) => user.followedArtists.includes(artist.id))
      );
    } else {
      setFollowedArtists([]);
    }
  }, [artists, user]);

  if (!user) return <div className="text-white p-4">Loading...</div>;

  return (
    <div
      className="text-white p-6 min-h-screen"
      style={{
        background: `linear-gradient(to bottom, rgba(${bgColor.join(
          ","
        )}, 0.15), #121212)`,
      }}
    >
      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {user.image ? (
          <img
            src={toBase64Image(user.image)}
            crossOrigin="anonymous"
            alt={user.name}
            className="w-52 h-52 sm:w-52 sm:h-52 md:w-36 md:h-36 rounded-full shadow-lg object-cover"
          />
        ) : (
          <div className="w-52 h-52 sm:w-52 sm:h-52 md:w-36 md:h-36 rounded-full shadow-lg bg-gray-700 flex items-center justify-center text-white text-5xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
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
              className="flex-shrink-0 hover:bg-[#444] rounded-lg p-3 transition flex flex-col items-center justify-center"
            >
              {pl.image ? (
                <img
                  src={toBase64Image(pl.image)}
                  alt={pl.name}
                  className="w-40 h-40 object-cover rounded"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-700 rounded flex items-center justify-center text-white text-3xl">
                  <FaMusic />
                </div>
              )}
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

        {/* Following Artists */}
        <h2 className="text-xl font-bold mb-[40px] mt-10">Following</h2>
        <div className="flex overflow-x-auto gap-4 px-2 py-2 scrollbar-hidden">
          {followedArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
