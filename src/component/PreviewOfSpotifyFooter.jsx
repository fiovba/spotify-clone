import React from 'react';

function PreviewOfSpotifyFooter() {
  return (
    <div className="w-full rounded  bg-gradient-to-r from-pink-600 via-purple-600 to-blue-500 text-white px-4 py-3 flex items-center justify-between">
      <div>
        <p className="font-bold text-sm">Preview of Spotify</p>
        <p className="text-sm">
          Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
        </p>
      </div>
      <button className="bg-white text-black font-semibold px-5 py-2 rounded-full hover:scale-105 transition-transform">
        Sign up free
      </button>
    </div>
  );
}

export default PreviewOfSpotifyFooter;
