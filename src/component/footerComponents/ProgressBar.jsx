import React from "react";

const ProgressBar = ({ progress = 0, onSeek, currentSong }) => {
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = clickX / rect.width;
    onSeek(newProgress);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex items-center space-x-2 w-full mt-1 text-xs text-gray-300 select-none">
      <span>0:00</span>
      <div
        className="flex-1 h-1 bg-white md:bg-gray-700 rounded-full overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <div
          className="h-full bg-white"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <span>{currentSong.duration || "0:00"}</span>
    </div>
  );
};

export default ProgressBar;
