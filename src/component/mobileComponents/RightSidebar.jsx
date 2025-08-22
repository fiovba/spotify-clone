
import React from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function RightSidebar({ isSidebarOpen, onClose, user,setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    onClose();
    navigate("/");
  };


  return (
    <div
      className={`block md:hidden fixed top-0 right-0 h-full w-full md:w-72 bg-black text-white transform transition-transform duration-300 z-30 
      ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close button */}
      <div className="flex justify-end p-4">
        <button onClick={onClose}>
          <IoClose size={23} />
        </button>
      </div>

      <div className="px-6 space-y-4">
        {user ? (
          <>
            <button onClick={() => {
                navigate("/account");
                onClose();
              }} className="block w-full text-left font-bold hover:underline">
              View Account →
            </button>
            <button
              onClick={() => {
                navigate("/profile");
                onClose();
              }}
              className="block w-full text-left font-bold hover:underline"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left font-bold hover:underline text-red-500"
            >
              Log Out
            </button>

            <hr className="border-neutral-800 my-4" />

            <div className="flex flex-col space-y-3 text-sm text-gray-300">
              <button className="hover:text-white">Support</button>
              <button className="hover:text-white">Download</button>
              <button className="hover:text-white">Privacy</button>
              <button className="hover:text-white">Terms</button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("register/login");
                onClose();
              }}
              className="block w-full text-left font-bold hover:underline"
            >
              Log In
            </button>
            <button
              onClick={() => {
                navigate("register/signup");
                onClose();
              }}
              className="block w-full text-left font-bold hover:underline"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
