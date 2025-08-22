import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

export async function getSongs() {
  try {
    const res = await axios.get(`${BASE_URL}/songs`);
    return res.data;
  } catch (error) {
    console.log("getSongs error:", error);
    return [];
  }
}
export async function getArtists() {
  try {
    const res = await axios.get(`${BASE_URL}/artists`);
    return res.data;
  } catch (error) {
    console.log("getArtists error:", error);
    return [];
  }
}

export async function updateArtist(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/artists/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.log("updateArtist error:", error);
    throw error;
  }
}

export async function getPlaylists(userId) {
  const res = await axios.get(`${BASE_URL}/playlists`);
  const all = res.data;
  return all.filter((playlist) => playlist.userId === userId);
}

export async function createPlaylist(newPlaylist) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) throw new Error("User not authenticated");

    const playlistWithUser = {
      ...newPlaylist,
      userId: user.id, 
    };

    const res = await axios.post(`${BASE_URL}/playlists`, playlistWithUser);
    return res.data;
  } catch (error) {
    console.log("createPlaylist error:", error);
    throw error;
  }
}

export async function updatePlaylist(id, updatedData) {
  try {
    const res = await axios.put(`${BASE_URL}/playlists/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.log("updatePlaylist error:", error);
    throw error;
  }
}

export async function deletePlaylist(id) {
  const res = await axios.delete(`${BASE_URL}/playlists/${id}`);
  return res.data;
}
export async function getPlaylistById(id) {
  try {
    const res = await axios.get(`${BASE_URL}/playlists/${id}`);
    return res.data;
  } catch (error) {
    console.log("getPlaylistById error:", error);
    return null;
  }
}
export const removeSongFromPlaylist = async (playlistId, songId) => {
  const playlist = await getPlaylistById(playlistId);
  const updatedSongs = (playlist.songs || []).filter(id => id !== songId);
  const updatedPlaylist = { ...playlist, songs: updatedSongs };
  await updatePlaylist(playlistId, updatedPlaylist);
  return updatedPlaylist;
};
export async function getPodcasts() {
  try {
    const res = await axios.get(`${BASE_URL}/podcasts`);
    return res.data;
  } catch (error) {
    console.log("getPodcasts error:", error);
    return [];
  }
}
export async function getEpisodes() {
  try {
    const res = await axios.get(`${BASE_URL}/episodes`);
    return res.data;
  } catch (error) {
    console.log("getEpisodes error:", error);
    return [];
  }
}