import React from "react";
import { FiPlay } from "react-icons/fi";
import { useDominantColor } from "../../hook/useDominantColor"; 

// köməkçi funksiya: dominant rəng açıqdırsa true qaytarır
function isColorLight([r, g, b]) {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000; // insan gözünə görə hesablama
  return brightness > 160; // 0-255 arası, >160 açıq rəng sayılır
}

function MobileNowPlayingBar({ song, onClick }) {
  if (!song) return null;

  const bgColor = useDominantColor(song.cover);
  const lightBg = isColorLight(bgColor);

  return (
    <div
      className="fixed bottom-14 left-0 right-0 px-4 py-2 flex items-center gap-3 md:hidden cursor-pointer z-40 rounded-lg overflow-hidden shadow-lg mx-2"
      onClick={onClick}
      style={{
        backgroundColor: `rgb(${bgColor.join(",")})`,
      }}
    >
      <img
        src={song.cover}
        alt={song.title}
        className="w-12 h-12 object-cover rounded"
      />
      <div className="flex-1">
        <p
          className={`text-sm font-semibold truncate ${
            lightBg ? "text-black" : "text-white"
          }`}
        >
          {song.title}
        </p>
        <p
          className={`text-xs truncate ${
            lightBg ? "text-gray-700" : "text-gray-300"
          }`}
        >
          {song.artist}
        </p>
      </div>
      <FiPlay
        className={`text-lg flex-shrink-0 ${
          lightBg ? "text-black" : "text-white"
        }`}
      />
    </div>
  );
}

export default MobileNowPlayingBar;
