import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { db } from '../services/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const AudioContext = createContext(null);

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [streamData, setStreamData] = useState({
    url: import.meta.env.VITE_STREAM_URL || '',
    nombre: 'Juan Escobar Multimedia',
    activo: true
  });
  const audioRef = useRef(null);

  useEffect(() => {
    try {
      const streamDocRef = doc(db, 'jem_config', 'stream');
      const unsubscribe = onSnapshot(streamDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setStreamData((prev) => ({ ...prev, ...data }));
        }
      }, (error) => {
        console.error("Error fetching stream data from Firebase:", error);
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn("Firebase not configured correctly or unreachable:", err);
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      // Remove src to prevent buffering when paused for live streams
      audio.src = '';
      setIsPlaying(false);
    } else {
      if (streamData.activo && streamData.url) {
        audio.src = streamData.url;
        audio.load();
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.error("Playback failed:", err);
          setIsPlaying(false);
        });
      }
    }
  };

  return (
    <AudioContext.Provider value={{
      isPlaying,
      volume,
      setVolume,
      togglePlay,
      streamData
    }}>
      {children}
    </AudioContext.Provider>
  );
};
