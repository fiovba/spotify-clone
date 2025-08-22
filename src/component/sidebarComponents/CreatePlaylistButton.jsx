import React from 'react'
import { createPlaylist, getPlaylists } from '../../service/service';
import { FaMusic } from 'react-icons/fa';

function CreatePlaylistButton({playlists,setPlaylists,setShowCreateForm,user}) {
  return (
    <>
       <button
                  onClick={async () => {
                    const playlistCount = playlists.length + 1;
                    const name = `My Playlist #${playlistCount}`;
                    try {
                      await createPlaylist({
                        name,
                        image: 'https://res.cloudinary.com/dsagrq2dg/image/upload/v1754499331/Screenshot_2025-08-06_204723_qzupl1.png',
                        userId: user.id
                      });
                      const data = await getPlaylists(user.id);
                      setPlaylists(data);
                      setShowCreateForm(false);
                    } catch (err) {
                      console.error("Auto create playlist failed", err);
                    }
                  }}
                  className="flex items-center hover:text-green-500 px-4 py-2 w-full text-left "
                >
                  <span className="mr-3"><FaMusic className='' /></span> Playlist
                </button>
      
    </>
  )
}

export default CreatePlaylistButton
