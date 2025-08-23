import React from "react";
import { useOutletContext } from "react-router";
import { useDominantColor } from "../hook/useDominantColor";

function LyricsPage() {
  const { currentSong } = useOutletContext();
  const dominantColor = useDominantColor(currentSong?.cover, 0.7);

  if (!currentSong) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="min-h-screen text-white p-12"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgb(${dominantColor.join(
          ","
        )}), #121212)`,
      }}
    >
      <p className="whitespace-pre-line p-2 text-5xl leading-20 poppins-bold">
        {currentSong?.lyrics || "No lyrics available"}
      </p>
    </div>
  );
}

export default LyricsPage;
