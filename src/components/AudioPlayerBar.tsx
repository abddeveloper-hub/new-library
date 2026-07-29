import React, { useRef, useState, useEffect } from 'react';
import { ActiveAudioState } from '../types';
import { RECITERS } from '../data/quranData';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Repeat, 
  X, 
  User, 
  Gauge, 
  FastForward, 
  Rewind 
} from 'lucide-react';

interface AudioPlayerBarProps {
  activeAudio: ActiveAudioState | null;
  onClose: () => void;
  onTogglePlay: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  activeAudio,
  onClose,
  onTogglePlay
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [selectedReciterId, setSelectedReciterId] = useState<string>('alafasy');

  useEffect(() => {
    if (activeAudio && audioRef.current) {
      if (activeAudio.isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio autoplay blocked or cancelled:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [activeAudio]);

  if (!activeAudio) return null;

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleSpeedChange = () => {
    const rates = [0.75, 1.0, 1.25, 1.5, 2.0];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#003527] text-white border-t-2 border-[#775925] shadow-2xl bg-arabesque-dark p-3 sm:p-4">
      <audio
        ref={audioRef}
        src={activeAudio.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => {
          if (isLooping && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            onTogglePlay();
          }
        }}
        loop={isLooping}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Left: Track Details */}
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[#775925] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
            <Volume2 className="w-5 h-5 text-[#fdd494]" />
          </div>
          <div className="min-w-0">
            <h4 className="font-serif-caslon font-bold text-white text-sm truncate">
              {activeAudio.title}
            </h4>
            <p className="text-[#bfc9c3] text-[11px] truncate">
              {activeAudio.subtitle}
            </p>
          </div>
        </div>

        {/* Center: Controls & Scrub Bar */}
        <div className="flex-1 max-w-xl space-y-1.5">
          <div className="flex items-center justify-center space-x-4">
            {/* Speed Button */}
            <button
              onClick={handleSpeedChange}
              className="px-2 py-1 rounded bg-[#064e3b] hover:bg-[#064e3b]/80 text-[#fdd494] font-bold text-[11px] transition-colors"
              title="Playback Speed"
            >
              {playbackRate}x
            </button>

            {/* Loop Repeat Button */}
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-1.5 rounded transition-colors ${
                isLooping ? 'bg-[#775925] text-white' : 'text-[#bfc9c3] hover:text-white'
              }`}
              title="Repeat Loop for Memorization"
            >
              <Repeat className="w-4 h-4" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={onTogglePlay}
              className="w-9 h-9 rounded-full bg-[#775925] hover:bg-[#775925]/90 text-white flex items-center justify-center shadow-md transition-transform active:scale-95"
            >
              {activeAudio.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {/* Mute Button */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (audioRef.current) audioRef.current.muted = !isMuted;
              }}
              className="p-1.5 text-[#bfc9c3] hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Scrub Bar */}
          <div className="flex items-center space-x-2 text-[10px] text-[#bfc9c3]">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-[#064e3b] rounded-lg appearance-none cursor-pointer accent-[#775925]"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Reciter Selector & Close Button */}
        <div className="flex items-center justify-between md:justify-end space-x-3 border-t md:border-t-0 border-[#064e3b] pt-2 md:pt-0">
          <div className="flex items-center space-x-1.5">
            <User className="w-3.5 h-3.5 text-[#fdd494]" />
            <select
              value={selectedReciterId}
              onChange={(e) => setSelectedReciterId(e.target.value)}
              className="bg-[#064e3b] text-white text-[11px] py-1 px-2 rounded border border-[#775925]/30 focus:outline-none"
            >
              {RECITERS.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#064e3b] text-[#bfc9c3] hover:text-white transition-colors"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
