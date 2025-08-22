// MobileBottomNav.jsx
import React from "react";
import { FaPlus } from "react-icons/fa";
import { FiHome, FiSearch} from "react-icons/fi";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { useNavigate } from "react-router";
export default function MobileBottomNav({ currentTab, setCurrentTab }) {
  const navigate = useNavigate()
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 text-white flex justify-around py-2 border-t border-gray-800 md:hidden z-40">
      <button
        onClick={() => navigate("/")}
        className={`flex flex-col items-center ${currentTab === "home" ? "text-green-500" : ""}`}
      >
        <FiHome size={24} />
        <span className="text-xs" >Home</span>
      </button>
      <button
        onClick={() => setCurrentTab("search")}
        className={`flex flex-col items-center ${currentTab === "search" ? "text-green-500" : ""}`}
      >
        <FiSearch size={24} />
        <span onClick={()=>navigate('/search')} className="text-xs">Search</span>
      </button>
      <button
        onClick={() => navigate("/library")}
        className={`flex flex-col items-center ${currentTab === "library" ? "text-green-500" : ""}`}
      >
        <MdOutlineLibraryMusic size={24} />
        <span className="text-xs">Your Library</span>
      </button>
    
    </div>
  );
}
