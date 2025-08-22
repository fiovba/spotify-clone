import React from "react";
import { useDominantColor } from "../../hook/useDominantColor"; 


function PodcastHeader({ image, title, author }) {
  const color = useDominantColor(image, 1, [30, 30, 30]);

  return (
    <div
      className="px-5 pt-5 pb-[60px] flex flex-col md:flex-row items-center md:items-end gap-6 w-full"
      style={{
        background: `linear-gradient(
          rgb(${color[0]}, ${color[1]}, ${color[2]}), 
          rgb(12,12,12)
        )`,
      }}
    >
      <img
        src={image}
        alt="Podcast cover"
        crossOrigin="anonymous"
        className="w-32 h-32 md:w-60 md:h-60 rounded-lg shadow-lg object-cover"
      />
      <div className="text-center md:text-left">
        <p className="font-bold text-sm md:text-base">Podcast</p>
        <h1 className="text-3xl md:text-8xl poppins-extrabold">{title}</h1>
        <p className="text-gray-300 mt-1 poppins-extrabold text-lg md:text-3xl">
          {author}
        </p>
      </div>
    </div>
  );
}

export default PodcastHeader;
