import React from "react";
import { useNavigate } from "react-router";

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/artists/${artist.id}`)}
      key={artist.id}
      className="flex-shrink-0 w-40 sm:w-48 md:w-60 text-center cursor-pointer p-3 sm:p-4 rounded-lg transition"
    >
      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 mx-auto mb-2 rounded-full overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-xs sm:text-sm md:text-base font-medium text-white truncate">
        {artist.name}
      </p>
    </div>
  );
};

export default ArtistCard;
