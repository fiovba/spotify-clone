import React from "react";
import { LuSquarePlay } from "react-icons/lu";
import { MdOutlineLyrics, MdVolumeUp } from "react-icons/md";
import { useNavigate } from "react-router";

const VolumeControl = ({
  currentSong,
  setIsTrackPanelOpen,
  volume,
  setVolume,
}) => {
  const navigate = useNavigate();

  const handleVolumeBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    let newVolume = clickPosition / rect.width;
    if (newVolume < 0) newVolume = 0;
    if (newVolume > 1) newVolume = 1;
    setVolume(newVolume);
  };

  return (
    <div className="flex items-center space-x-3 w-[30%] justify-end select-none">
      <MdOutlineLyrics
        onClick={() => navigate(`/lyrics/${currentSong.id}`)}
        className="h-5 w-5 cursor-pointer"
      />
      <LuSquarePlay
        className="w-5 h-5 cursor-pointer"
        onClick={() => setIsTrackPanelOpen(true)}
      />
      <MdVolumeUp className="h-5 w-5" />
      <div
        onClick={handleVolumeBarClick}
        className="w-24 h-1 bg-gray-600 rounded-full overflow-hidden cursor-pointer"
      >
        <div
          style={{ width: `${volume * 100}%` }}
          className="h-full bg-white transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default VolumeControl;
