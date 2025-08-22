import React from "react";
import PlaylistList from "../component/LibraryPageComponents/PlaylistList";
import LibraryTabs from "../component/LibraryPageComponents/LibraryTabs";
import LibraryHeader from "../component/LibraryPageComponents/LibraryHeader";
import { useOutletContext } from "react-router";


export default function LibraryPage() {
   const {
    playlists,
    setPlaylists,
    user,
    songs,
    setCurrentSong,
    setCurrentPlaylistSongs,
  } = useOutletContext();
  return (
    <div className="bg-black text-white min-h-screen flex flex-col md:hidden">
      <LibraryHeader user={user} />
      <LibraryTabs />
      <PlaylistList user={user} playlists={playlists} songs={songs} />
    </div>
  );
}
