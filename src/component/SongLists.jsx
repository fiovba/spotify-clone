import React from "react";

const SongList = ({ songs, setCurrentSong }) => {
  return (
    <div className="mt-6">
      <h3 className="text-3xl font-semibold text-white mb-4">Popular</h3>
      <ul>
        {songs.map((song, index) => (
          <li 
            onClick={()=>setCurrentSong(song)}
            key={song.id}
            className="grid grid-cols-5 text-white py-2 hover:bg-[#1a1a1a] px-3 rounded-lg"
          >
            <span>{index + 1}</span>
            <div className="flex items-center col-span-2 space-x-3">
              <img src={song.cover} alt={song.title} className="w-10 h-10" />
              <span>{song.title}</span>
            </div>
            
            <span>{song.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
