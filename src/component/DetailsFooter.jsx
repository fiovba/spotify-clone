import React from 'react'
import { FaCopy, FaInstagram, FaTwitter } from 'react-icons/fa'

function DetailsFooter() {
  return (
    <footer className="w-full bg-[#121212] text-[#b3b3b3] px-8 py-10 text-sm">
     
      <div className="flex flex-col md:flex-row md:justify-between gap-8 border-b border-[#333] pb-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-white font-semibold">Company</span>
            <span className="hover:underline cursor-pointer">About</span>
            <span className="hover:underline cursor-pointer">Jobs</span>
            <span className="hover:underline cursor-pointer">For the Record</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-white font-semibold">Communities</span>
            <span className="hover:underline cursor-pointer">For Artists</span>
            <span className="hover:underline cursor-pointer">Developers</span>
            <span className="hover:underline cursor-pointer">Advertising</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-white font-semibold">Useful Links</span>
            <span className="hover:underline cursor-pointer">Support</span>
            <span className="hover:underline cursor-pointer">Web Player</span>
            <span className="hover:underline cursor-pointer">Free Mobile App</span>
          </div>
        </div>

    
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-white">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>

 
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <div className="flex flex-wrap gap-4 text-xs text-[#555]">
          <span className="hover:underline cursor-pointer">Legal</span>
          <span className="hover:underline cursor-pointer">Safety & Privacy Center</span>
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">Cookies</span>
          <span className="hover:underline cursor-pointer">About Ads</span>
          <span className="hover:underline cursor-pointer">Accessibility</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#555]">
          <FaCopy size={12} /> <span>2025 Spotify AB</span>
        </div>
      </div>
    </footer>
  )
}

export default DetailsFooter;
