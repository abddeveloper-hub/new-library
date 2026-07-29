import React, { useState } from 'react';
import { INITIAL_ADHKAR } from '../data/adhkarData';
import { AdhkarItem, ActiveAudioState } from '../types';
import { 
  Compass, 
  RotateCcw, 
  Play, 
  Pause, 
  CheckCircle2, 
  Sparkles, 
  BookOpen,
  Volume2
} from 'lucide-react';

interface AdhkarTreasuryProps {
  onPlayAudio: (title: string, subtitle: string, url: string) => void;
  activeAudio: ActiveAudioState | null;
}

export const AdhkarTreasury: React.FC<AdhkarTreasuryProps> = ({
  onPlayAudio,
  activeAudio
}) => {
  const [adhkarList, setAdhkarList] = useState<AdhkarItem[]>(INITIAL_ADHKAR);
  const [activeCategory, setActiveCategory] = useState<'Morning' | 'Evening' | 'After Prayer'>('Morning');

  const filteredAdhkar = adhkarList.filter(a => a.category === activeCategory);

  const handleIncrement = (id: string) => {
    setAdhkarList(prev => prev.map(item => {
      if (item.id === id) {
        const nextCount = Math.min(item.currentCount + 1, item.targetCount);
        return { ...item, currentCount: nextCount };
      }
      return item;
    }));
  };

  const handleReset = (id: string) => {
    setAdhkarList(prev => prev.map(item => {
      if (item.id === id) return { ...item, currentCount: 0 };
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/40 p-5 bg-arabesque flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-caslon text-2xl font-bold text-[#003527] flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#775925]" />
            Adhkar Treasury & Hisn al-Muslim
          </h2>
          <p className="text-sm text-[#404944]">
            Prophetic morning, evening, and post-prayer supplications with interactive digital Tasbeeh counter.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5">
          {(['Morning', 'Evening', 'After Prayer'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#003527] text-white shadow-xs'
                  : 'bg-white text-[#003527] hover:bg-[#f0eded] border border-[#bfc9c3]/50'
              }`}
            >
              {cat} Dhikr
            </button>
          ))}
        </div>
      </div>

      {/* Dhikr Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAdhkar.map((adhkar) => {
          const isCompleted = adhkar.currentCount >= adhkar.targetCount;
          const isPlayingThis = activeAudio?.audioUrl === adhkar.audioUrl && activeAudio?.isPlaying;

          return (
            <div
              key={adhkar.id}
              className={`bg-white rounded-xl shadow-sm border p-6 space-y-4 transition-all ${
                isCompleted
                  ? 'border-emerald-500/60 bg-emerald-50/20'
                  : 'border-[#bfc9c3]/50 hover:border-[#003527]/40'
              }`}
            >
              {/* Card Meta */}
              <div className="flex items-center justify-between border-b border-[#f0eded] pb-3 text-xs">
                <span className="font-bold text-[#775925] uppercase tracking-wider">
                  {adhkar.category} Adhkar
                </span>

                <div className="flex items-center space-x-2">
                  {adhkar.audioUrl && (
                    <button
                      onClick={() => onPlayAudio(adhkar.titleTransliteration, adhkar.sourceReference, adhkar.audioUrl!)}
                      className="p-1 rounded text-[#003527] hover:bg-[#f0eded]"
                      title="Play Recitation"
                    >
                      {isPlayingThis ? <Pause className="w-4 h-4 text-[#775925]" /> : <Play className="w-4 h-4" />}
                    </button>
                  )}
                  <span className="text-[11px] text-[#707974] font-medium">{adhkar.sourceReference}</span>
                </div>
              </div>

              {/* Arabic Scripture */}
              <div className="text-right p-4 rounded-xl bg-[#fcf9f8] border border-[#bfc9c3]/30">
                <p className="font-arabic text-2xl leading-relaxed text-[#1b1c1c]" dir="rtl">
                  {adhkar.titleArabic}
                </p>
              </div>

              {/* Transliteration */}
              <p className="text-xs font-serif-caslon italic text-[#404944] border-l-2 border-[#775925]/40 pl-3">
                {adhkar.titleTransliteration}
              </p>

              {/* English Translation */}
              <p className="text-xs text-[#1b1c1c] font-sans leading-relaxed">
                {adhkar.translation}
              </p>

              {/* Counter Interface */}
              <div className="pt-3 border-t border-[#f0eded] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-[#003527]">Target: {adhkar.targetCount}x</span>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleReset(adhkar.id)}
                    className="p-2 rounded-lg text-[#707974] hover:bg-[#f0eded] transition-colors"
                    title="Reset Counter"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleIncrement(adhkar.id)}
                    disabled={isCompleted}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-[#003527] hover:bg-[#064e3b] text-[#fdd494] active:scale-95'
                    }`}
                  >
                    <span>Count: {adhkar.currentCount} / {adhkar.targetCount}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
