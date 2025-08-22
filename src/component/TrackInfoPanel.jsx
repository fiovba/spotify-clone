import React from "react";
import { MdIosShare, MdClose } from "react-icons/md";
import { useNavigate } from "react-router";

const TrackInfoPanel = ({ song, artists, onClose }) => {
  const navigate = useNavigate();
  const artistNames = song.artist
    ? song.artist.split(",").map(name => name.trim())
    : [];
  const matchedArtists = artistNames
    .map(name => artists.find(a => a.name === name))
    .filter(Boolean);

  return (
    <div className="text-white flex flex-col p-4 rounded-lg max-w-sm mx-auto relative bg-[#121212]">
      <button
        onClick={onClose}
        className="absolute top-2  right-2 text-white hover:text-gray-400"
        aria-label="Close"
      >
        <MdClose size={24} />
      </button>

      <h2 className="text-lg font-bold mb-4 pt-3"> {song.artist} - {song.title}</h2>

      <div className="">
        <img
          src={song.cover}
          alt={song.title}
          className="rounded-xl mb-4 w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">{song.title}</h2>
          <p className="text-sm text-gray-400 cursor-default ">{song.artist}</p>
        </div>
        <div className="flex items-center space-x-2">
          <MdIosShare className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 space-y-4 flex flex-col">
        {matchedArtists.map(artist => (
          <div
            key={artist.id}
            className="bg-[#121212] rounded-lg overflow-hidden w-full max-w-sm"
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-52 object-cover cursor-pointer"
              onClick={() => navigate(`/artists/${artist.id}`)}
            />

            <div className="p-4">
              <p className="text-xs uppercase text-gray-400 mb-2">
                About the artist
              </p>
              <h3
                className="text-lg font-bold cursor-pointer hover:underline"
                onClick={() => navigate(`/artists/${artist.id}`)}
              >
                {artist.name}
              </h3>
              
              {artist.bio && (
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
                  {artist.bio}
                </p>
              )}
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default TrackInfoPanel;
