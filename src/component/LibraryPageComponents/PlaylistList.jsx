import PlaylistItemMobile from "./PlaylistItemMobile";

export default function PlaylistList({ playlists, user }) {
  const userPlaylists = playlists.filter(
    (playlist) => playlist.userId === user.id
  );

  return (
    <div className="mt-6 px-4 flex flex-col gap-4">
      {userPlaylists.map((playlist) => (
        <PlaylistItemMobile key={playlist.id} data={playlist} user={user} />
      ))}
    </div>
  );
}
