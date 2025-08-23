import React, { useRef, useState } from 'react';
import { updatePlaylist } from '../service/service';
import { FaMusic, FaTimes } from 'react-icons/fa';

function EditModal({ onClose, playlist, setPlaylist, setPlaylists, isOpen, setIsOpen }) {
  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description || "");
  const [image, setImage] = useState(playlist.image);
  const [preview, setPreview] = useState(playlist.image);
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const img = new Image();

    reader.onload = (ev) => img.src = ev.target.result;
    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 400;
      const scale = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
      setImage(resizedDataUrl);
      setPreview(resizedDataUrl);
    };
  };

  const handleSave = async () => {
    const updatedData = {
      id: playlist.id,
      name: name || playlist.name,
      image: image || playlist.image,
      songs: playlist.songs,
      description: description || playlist.description || "",
      userId: playlist.userId,
    };

    try {
      const updated = await updatePlaylist(playlist.id, updatedData);
      setPlaylist(updated);
      setPlaylists(prev => prev.map(p => p.id === updated.id ? updated : p));
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") onClose();
    setIsOpen(false);
  };

  return (
    <div id="modal-backdrop" onClick={handleBackdropClick} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative flex flex-col md:flex-row p-4 bg-[#131313] rounded-lg w-full max-w-2xl">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400"><FaTimes size={17} /></button>

        <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-800 flex items-center justify-center rounded-md cursor-pointer overflow-hidden self-center md:self-start mt-2" onClick={() => fileRef.current.click()}>
          {preview ? <img src={preview} alt="preview" className="object-cover w-full h-full" /> : <FaMusic size={40} className="text-gray-400" />}
          <input type="file" ref={fileRef} onChange={handleImageChange} hidden accept="image/*" />
        </div>

        <div className="flex flex-col flex-1 space-y-3 mt-4 md:mt-0 md:ml-5">
          <p className="text-lg font-bold text-white mb-1">Edit Details</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Playlist name" className="p-2 rounded bg-zinc-800 text-white"/>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="p-2 rounded bg-zinc-800 text-white resize-none" rows={3}/>
          <button onClick={handleSave} className="bg-white text-black rounded-2xl p-2 font-bold hover:bg-gray-300 w-full md:w-1/3">Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
