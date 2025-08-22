import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import ColorThief from "colorthief";

function LyricsPage() {
  const { currentSong } = useOutletContext();
  const [mainColor, setMainColor] = useState("#222222");

  useEffect(() => {
    if (!currentSong?.cover) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = currentSong.cover;
    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        let color = colorThief.getColor(img);
        const factor = 0.7;
        color = color.map((c) => Math.floor(c * factor));
        setMainColor(`rgb(${color.join(",")})`);
      } catch (err) {
        console.error("Color extraction error:", err);
      }
    };
  }, [currentSong]);

  if (!currentSong) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="min-h-screen text-white p-12"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${mainColor}, #121212)`,
      }}
    >
      <p className="whitespace-pre-line p-2 text-5xl leading-20 poppins-bold">
        {currentSong?.lyrics || "No lyrics available"}
      </p>
    </div>
  );
}

export default LyricsPage;
