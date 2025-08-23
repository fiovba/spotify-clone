import React from "react";
import { FiHome, FiSearch } from "react-icons/fi";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { useNavigate } from "react-router";

const MobileBottomNav = ({ currentTab, setCurrentTab, user, setShowToast }) => {
  const navigate = useNavigate();

  const handleLibraryClick = () => {
    if (!user) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      navigate("/");
      setCurrentTab("home");
      return;
    }
    navigate("/library");
    setCurrentTab("library");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 text-white flex justify-around py-2 border-t border-gray-800 md:hidden z-40">
      <button
        onClick={() => {
          navigate("/");
          setCurrentTab("home");
        }}
        className={`flex flex-col items-center ${currentTab === "home" ? "text-green-500" : ""}`}
      >
        <FiHome size={24} />
        <span className="text-xs">Home</span>
      </button>

      <button
        onClick={() => {
          navigate("/search");
          setCurrentTab("search");
        }}
        className={`flex flex-col items-center ${currentTab === "search" ? "text-green-500" : ""}`}
      >
        <FiSearch size={24} />
        <span className="text-xs">Search</span>
      </button>

      <button
        onClick={handleLibraryClick}
        className={`flex flex-col items-center ${currentTab === "library" ? "text-green-500" : ""}`}
      >
        <MdOutlineLibraryMusic size={24} />
        <span className="text-xs">Your Library</span>
      </button>
    </div>
  );
};

export default MobileBottomNav;
