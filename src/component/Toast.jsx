import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import spotifyLogo from '../assets/Spotify_Primary_Logo_RGB_White.png';
import { useNavigate } from "react-router";
const Toast = ({ show, setShowToast}) => {

  const navigate = useNavigate()
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/10 "
            onClick={()=>setShowToast(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative z-50 bg-gradient-to-b from-green-700 to-black text-white w-[90%] max-w-md rounded-xl shadow-xl p-6 text-center"
          >
            <button
              onClick={()=>setShowToast(false)}
              className="absolute top-3 right-3 text-white text-xl font-bold hover:text-green-400"
            >
              ×
            </button>
            <div className="justify-center items-center flex p-3">
                <img src={spotifyLogo} className="h-14 w-auto" alt="" />
            </div>
            <h2 className="text-2xl font-bold mb-6">
              Start listening with a free Spotify account
            </h2>
            <button
              onClick={() => {
                navigate("/register/signup");
                setShowToast(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full mb-4 w-full max-w-xs"
            >
              Sign up free
            </button>
            <button
              onClick={() => {
                window.open("https://spotify.com/download", "_blank");
                setShowToast(false);
              }}
              className="border border-white hover:border-green-400 text-white font-bold py-2 px-6 rounded-full mb-4 w-full max-w-xs"
            >
              Download app
            </button>
            <p className="text-sm text-green-300">
              Already have an account?{" "}
              <button
                onClick={() => {
                  navigate("/register/login");
                  setShowToast(false);
                }}
                className="underline hover:text-green-400"
              >
                Log in
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
