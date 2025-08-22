import React from "react";

const TrackInfo = ({currentSong}) => {
  return (
    <div className="flex items-center space-x-4 w-[30%]">
      <img
        src={currentSong.cover}
        alt="cover"
        className="w-14 h-14 object-cover rounded-sm"
      />
      <div>
        <h4 className="text-sm font-semibold">{currentSong.title}</h4>
        <p className="text-xs text-gray-400">{currentSong.artist}</p>
      </div>
      <span className="text-green-500 text-xl">✓</span>
    </div>
  );
};

export default TrackInfo;
