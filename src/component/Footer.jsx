import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";

import PlayerControls from "./footerComponents/PlayerControls";
import ProgressBar from "./footerComponents/ProgressBar";
import TrackInfo from "./footerComponents/TrackInfo";
import VolumeControl from "./footerComponents/VolumeControl";
import Toast from "./Toast";

const Footer = ({
  songs,
  currentSong,
  setCurrentSong,
  setIsTrackPanelOpen,
  isTrackPanelOpen,
  user,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const soundRef = useRef(null);
  const progressInterval = useRef(null);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.unload();
      clearInterval(progressInterval.current);
      setProgress(0);
      setIsPlaying(false);
    }

    if (!currentSong || !user) return;

    soundRef.current = new Howl({
      src: [currentSong.src],
      volume,
      onend: () => {
        if (repeat) {
          soundRef.current.seek(0);
          soundRef.current.play();
        } else {
          handleNext();
        }
      },
    });

    if (autoPlay) {
      soundRef.current.play();
      setIsPlaying(true);
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      clearInterval(progressInterval.current);
    };
  }, [currentSong, user, autoPlay]);

  useEffect(() => {
    if (isPlaying && soundRef.current) {
      progressInterval.current = setInterval(() => {
        const seek = soundRef.current.seek() || 0;
        const duration = soundRef.current.duration() || 1;
        setProgress(seek / duration);
      }, 200);
    } else {
      clearInterval(progressInterval.current);
    }
    return () => clearInterval(progressInterval.current);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!user) {
      setShowToast(true);
      return;
    }
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
      setAutoPlay(true);
    }
  };

  const handleNext = () => {
    if (!user) {
      setShowToast(true);
      return;
    }
    if (!songs || songs.length === 0) return;
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
      nextIndex = (currentIndex + 1) % songs.length;
    }
    setAutoPlay(true);
    setCurrentSong(songs[nextIndex]);
  };

  const handlePrevious = () => {
    if (!user) {
      setShowToast(true);
      return;
    }
    if (!songs || songs.length === 0) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setAutoPlay(true);
    setCurrentSong(songs[prevIndex]);
  };

  const toggleShuffle = () => setShuffle(!shuffle);
  const toggleRepeat = () => setRepeat(!repeat);

  const seek = (progressRatio) => {
    if (!soundRef.current) return;
    const duration = soundRef.current.duration();
    soundRef.current.seek(duration * progressRatio);
    setProgress(progressRatio);
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (soundRef.current) soundRef.current.volume(newVolume);
  };

  return (
    <>
      <div className="w-full bg-black text-white px-4 py-2 flex items-center justify-between">
        <TrackInfo currentSong={currentSong} />
        <div className="flex flex-col items-center justify-center w-[40%]">
          <PlayerControls
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            shuffle={shuffle}
            toggleShuffle={toggleShuffle}
            repeat={repeat}
            toggleRepeat={toggleRepeat}
            
          />
          <ProgressBar currentSong={currentSong} progress={progress} onSeek={seek} />
        </div>
        <VolumeControl
          setIsTrackPanelOpen={setIsTrackPanelOpen}
          currentSong={currentSong}
          isTrackPanelOpen={isTrackPanelOpen}
          volume={volume}
          setVolume={changeVolume}
        />
      </div>
      {showToast && <Toast show={showToast} onClose={() => setShowToast(false)} />}
    </>
  );
};

export default Footer;
