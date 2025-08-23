import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import spotifyLogo from '../assets/Spotify_Primary_Logo_RGB_White.png';
import { GoHomeFill, GoSearch } from "react-icons/go";
import { IoFileTrayFull } from "react-icons/io5";
import { FaUserCircle } from 'react-icons/fa';

function Header() {
  const [isFocused, setIsFocused] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/register/login");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value.trim()) navigate("/");
    else navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className='hidden md:flex justify-between items-center w-full px-5 bg-black py-3 relative'>
      {/* Logo */}
      <div className='flex items-center flex-1 min-w-0'>
        <Link to="/"><img src={spotifyLogo} alt="Spotify Logo" className="h-9" /></Link>
      </div>

      {/* Navigation + Search */}
      <div className='flex items-center gap-6 flex-[2] justify-center max-w-md w-full min-w-0'>
        <Link to="/">
          <div className='hover:bg-[#2a2a2a] transition-transform duration-300 hover:scale-110 bg-[#1f1f1f] min-w-10 aspect-square rounded-full flex justify-center items-center cursor-pointer'>
            <GoHomeFill color='white' size={25} />
          </div>
        </Link>

        <div className={`flex items-center text-white rounded-full px-4 py-1 w-full bg-[#1e1e1e] transition-all duration-300
                         ${isFocused ? "ring ring-gray-500" : ""} hover:bg-[#2a2a2a] hover:border hover:border-gray-600`}>
          <GoSearch className="text-gray-400 mr-2" size={24} />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-transparent focus:outline-none text-white w-full placeholder:text-gray-400"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            value={search}
          />
          <IoFileTrayFull className="text-gray-400 ml-2 cursor-pointer" size={20} />
        </div>
      </div>

      {/* User / Login / Signup */}
      <div className='flex items-center gap-3 flex-1 justify-end min-w-0'>
        {!user ? (
          <>
            <Link to='/register/signup' className='text-[#b3b3b3] hover:text-white hover:scale-105 transition-all duration-300 font-bold'>Sign up</Link>
            <Link to='/register/login' className='bg-white text-black hover:bg-[#f0f0f0] px-[30px] py-3 rounded-3xl font-bold hover:scale-105 transition-all duration-300'>Log in</Link>
          </>
        ) : (
          <div onClick={toggleDropdown} className="cursor-pointer relative">
            {user.image ? (
              <img src={user.image} alt="Profile" className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform" />
            ) : (
              <FaUserCircle size={40} color="#b3b3b3" className="cursor-pointer hover:text-white hover:scale-110 transition-transform" />
            )}

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[#121212] rounded-md shadow-lg w-40 z-50">
                <Link to="/account" className="block px-4 py-2 text-white hover:bg-green-600 transition" onClick={() => setDropdownOpen(false)}>Account</Link>
                <Link to="/profile" className="block px-4 py-2 text-white hover:bg-green-600 transition" onClick={() => setDropdownOpen(false)}>Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-white hover:bg-green-600 transition">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
