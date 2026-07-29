import React, { useState } from 'react';
import { Flashcard, ActiveAudioState } from '../types';
import { 
  Brain, 
  Eye, 
  EyeOff, 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Award, 
  Layers, 
  Flame,
  Volume2
} from 'lucide-react';

interface MemorizationStudioProps {
  onPlayAudio: (title: string, subtitle: string, url: string) => void;
  activeAudio: ActiveAudioState | null;
}

export const MemorizationStudio: React.FC<MemorizationStudioProps> = ({
  onPlayAudio,
  activeAudio
}) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: 'f-1',
      type: 'ayah',
      title: 'Surah Al-Ikhlas (112:1-2)',
      arabicText: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ ﴿١﴾ ٱللَّهُ ٱلصَّمَدُ ﴿٢﴾',
      translation: 'Say, "He is Allah, [who is] One, Allah, the Eternal Refuge."',
      reference: 'Surah Al-Ikhlas 112:1-2',
      intervalDays: 1,
      easeFactor: 2.5,
      nextReviewDate: 'Today',
      masteryLevel: 'Reviewing'
    },
    {
      id: 'f-2',
      type: 'hadith',
      title: 'Prophetic Advice on Gentleness',
      arabicText: 'إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ، وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ',
      translation: 'Verily, gentleness is not found in anything except that it beautifies it...',
      reference: 'Sahih al-Bukhari #6011',
      intervalDays: 3,
      easeFactor: 2.6,
      nextReviewDate: 'Tomorrow',
      masteryLevel: 'Learning'
    },
    {
      id: 'f-3',
      type: 'root',
      title: 'Root Word: S-L-M (س-ل-م)',
      arabicText: 'س-ل-م (إِسْلَام • سَلَام • مُسْلِم)',
      translation: 'Safety, peace, wholeness, and sincere submission to God.',
      reference: 'Arabic Root Lexicon',
      intervalDays: 7,
      easeFactor: 2.8,
      nextReviewDate: 'In 3 Days',
      masteryLevel: 'Mastered'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState<number>(7);

  const currentCard = flashcards[currentIndex] || flashcards[0];

  const handleRating = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    // Update card mastery and advance
    setFlashcards(prev => prev.map((card, idx) => {
      if (idx !== currentIndex) return card;

      let newLevel = card.masteryLevel;
      if (rating === 'again') newLevel = 'Learning';
      else if (rating === 'easy') newLevel = 'Mastered';
      else if (rating === 'good') newLevel = 'Reviewing';

      return {
        ...card,
        masteryLevel: newLevel,
        lastReviewed: 'Just Now'
      };
    }));

    setIsRevealed(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const totalMastered = flashcards.filter(c => c.masteryLevel === 'Mastered').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/40 p-5 bg-arabesque flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-caslon text-2xl font-bold text-[#003527] flex items-center gap-2">
            <Brain className="w-6 h-6 text-[#775925]" />
            Hifz & Revision Studio (Spaced Repetition)
          </h2>
          <p className="text-sm text-[#404944]">
            Memorization companion for Quranic verses, authentic hadith, and Arabic roots using line masking and audio repeat loops.
          </p>
        </div>

        {/* Streak & Stats */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#fdd494]/40 border border-[#775925]/30 text-xs font-bold text-[#775925]">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>{streakCount} Day Streak</span>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#064e3b] text-white text-xs font-bold">
            <Award className="w-4 h-4 text-[#fdd494]" />
            <span>{totalMastered}/{flashcards.length} Mastered</span>
          </div>
        </div>
      </div>

      {/* Main Flashcard Card Container */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-[#bfc9c3]/60 overflow-hidden space-y-6 p-6 sm:p-8">
        {/* Flashcard Meta Header */}
        <div className="flex items-center justify-between border-b border-[#f0eded] pb-4 text-xs">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-md bg-[#003527] text-[#fdd494] font-bold">
              Card {currentIndex + 1} of {flashcards.length}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#f0eded] text-[#775925]">
              {currentCard.type.toUpperCase()}
            </span>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
            currentCard.masteryLevel === 'Mastered'
              ? 'bg-emerald-100 text-emerald-800'
              : currentCard.masteryLevel === 'Reviewing'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            Status: {currentCard.masteryLevel}
          </span>
        </div>

        {/* Card Title */}
        <h3 className="font-serif-caslon text-xl font-bold text-[#003527] text-center">
          {currentCard.title}
        </h3>

        {/* Masked / Revealed Arabic Script Area */}
        <div className={`p-8 rounded-xl border text-center transition-all min-h-[160px] flex flex-col justify-center items-center ${
          isRevealed
            ? 'bg-[#fcf9f8] border-[#003527]/40 shadow-xs'
            : 'bg-[#f0eded] border-[#bfc9c3]/60 cursor-pointer hover:bg-[#eae7e7]'
        }`}
        onClick={() => !isRevealed && setIsRevealed(true)}
        >
          {isRevealed ? (
            <p className="font-arabic text-3xl md:text-4xl leading-relaxed text-[#1b1c1c]" dir="rtl">
              {currentCard.arabicText}
            </p>
          ) : (
            <div className="space-y-3">
              <EyeOff className="w-8 h-8 mx-auto text-[#707974]" />
              <p className="text-sm font-semibold text-[#003527]">
                [Arabic Scripture Masked — Click to Reveal]
              </p>
              <span className="text-xs text-[#707974]">Recite silently in your heart before revealing.</span>
            </div>
          )}
        </div>

        {/* Translation & Reference (Revealed) */}
        {isRevealed && (
          <div className="space-y-3 pt-2 text-center animate-fade-in">
            <p className="text-base text-[#1b1c1c] font-sans leading-relaxed">
              "{currentCard.translation}"
            </p>
            <p className="text-xs text-[#775925] font-semibold">
              Ref: {currentCard.reference}
            </p>
          </div>
        )}

        {/* Controls Bar */}
        <div className="pt-4 border-t border-[#f0eded] space-y-4">
          {!isRevealed ? (
            <button
              onClick={() => setIsRevealed(true)}
              className="w-full py-3 rounded-xl bg-[#003527] hover:bg-[#064e3b] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-[#fdd494]" />
              <span>Reveal Solution & Check Recitation</span>
            </button>
          ) : (
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#707974] block text-center">
                How well did you recall this item?
              </span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleRating('again')}
                  className="py-2.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold transition-colors"
                >
                  Again (1d)
                </button>
                <button
                  onClick={() => handleRating('hard')}
                  className="py-2.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold transition-colors"
                >
                  Hard (3d)
                </button>
                <button
                  onClick={() => handleRating('good')}
                  className="py-2.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-bold transition-colors"
                >
                  Good (7d)
                </button>
                <button
                  onClick={() => handleRating('easy')}
                  className="py-2.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold transition-colors"
                >
                  Easy (14d)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
