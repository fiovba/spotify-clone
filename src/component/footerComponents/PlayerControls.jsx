import React from "react";
import { BiShuffle } from "react-icons/bi";
import {
  MdSkipPrevious,
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdRepeat,
} from "react-icons/md";

const PlayerControls = ({
  isPlaying,
  togglePlay,
  handleNext,
  handlePrevious,
  shuffle,
  toggleShuffle,
  repeat,
  toggleRepeat,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <BiShuffle
        className={`h-6 w-6 cursor-pointer ${
          shuffle ? "text-green-500" : "text-white"
        }`}
        onClick={toggleShuffle}
      />
      <MdSkipPrevious
        className="h-6 w-6 cursor-pointer"
        onClick={handlePrevious}
      />
      <button
        onClick={togglePlay}
        className="bg-white text-black p-2 rounded-full flex items-center justify-center"
      >
        {isPlaying ? (
          <MdPause className="h-6 w-6" />
        ) : (
          <MdPlayArrow className="h-6 w-6" />
        )}
      </button>
      <MdSkipNext className="h-6 w-6 cursor-pointer" onClick={handleNext} />
      <MdRepeat
        className={`h-6 w-6 cursor-pointer ${
          repeat ? "text-green-500" : "text-gray-400"
        }`}
        onClick={toggleRepeat}
      />
    </div>
  );
};

export default PlayerControls;
