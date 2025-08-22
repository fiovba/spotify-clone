import { FaHeart } from "react-icons/fa";
import PlayerControls from "../footerComponents/PlayerControls";
import ProgressBar from "../footerComponents/ProgressBar";
import { useDominantColor } from "../../hook/useDominantColor"; 

export default function MobileFullPlayer({ song, isOpen, onClose }) {
  if (!song) return null;

  // dominant rəng
  const bgColor = useDominantColor(song.cover);

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 md:hidden flex flex-col ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        background: `linear-gradient(to bottom, rgba(${bgColor.join(
          ","
        )}), #444)`,
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        ✕
      </button>

      {/* Content */}
      <div className="flex flex-col items-center justify-between h-full text-white px-6 py-10">
        {/* Cover */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={song.cover}
            alt={song.title}
            className="w-72 h-72 rounded-md shadow-lg"
          />
        </div>

        {/* Title + Artist + Like */}
        <div className="flex items-center justify-between w-full mt-6">
          <div className="flex flex-col text-left">
            <h2 className="text-lg font-bold">{song.title}</h2>
            <p className="text-sm text-gray-400">{song.artist}</p>
          </div>
          <FaHeart className="text-xl text-gray-400" />
        </div>

        {/* Progress & Controls */}
        <div className="w-full flex flex-col gap-4 mt-6">
          <ProgressBar currentSong={song} />
          <PlayerControls />
        </div>
      </div>
    </div>
  );
}
