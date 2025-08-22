import ColorThief from "colorthief";
import React, { useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router";

const PlaylistItem = ({ playlist, onPlay,setBgColor }) => {
  const navigate = useNavigate()

  return (
    <div onClick={()=>navigate(`/playlist/${playlist.id}`)} 
       className="flex items-center  bg-zinc-800 rounded py-2  gap-4 hover:bg-zinc-700 transition cursor-pointer  h-9 md:h-12 w-full max-w-sm">
      <div className="md:h-12 md:w-15 h-9 w-9 ">
        <img  src={playlist.image} className="object-cover rounded-tl rounded-bl  w-full h-full" />
      </div>
      <div className="flex-grow">
        <h3 className="text-white text-xs sm:text-sm  md:text-md font-semibold">{playlist.name}</h3>
      </div>
     
    </div>
  );
};

export default PlaylistItem;
