import React from "react";

const DuplicateSongModal = ({ isOpen, onClose, playlistName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white 0 p-6 rounded-md max-w-sm text-black">
        <h2 className="text-lg font-extrabold">Already added</h2>
        <p>This is already in your "{playlistName}" playlist.</p>
        <button
          onClick={onClose}
          className="mt-6 bg-green-500 font-extrabold hover:bg-green-600 rounded-full justify-center text-black py-2 px-4 "
        >
          Don't Add
        </button>
      </div>
    </div>
  );
};

export default DuplicateSongModal;
