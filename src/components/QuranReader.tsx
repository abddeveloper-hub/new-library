import React, { useState } from 'react';
import { QURAN_SURAHS } from '../data/quranData';
import { Surah, Ayah, ActiveAudioState, NoteItem } from '../types';
import { 
  Play, 
  Pause, 
  BookOpen, 
  Search, 
  Sparkles, 
  Bookmark, 
  Volume2, 
  Info, 
  Layers,
  ChevronRight,
  Share2,
  Check
} from 'lucide-react';

interface QuranReaderProps {
  onPlayAudio: (title: string, subtitle: string, url: string) => void;
  activeAudio: ActiveAudioState | null;
  onSaveNote: (note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onNavigateToAI: (initialQuery: string) => void;
  onSelectRoot: (root: string) => void;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  onPlayAudio,
  activeAudio,
  onSaveNote,
  onNavigateToAI,
  onSelectRoot
}) => {
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTafsirAyah, setExpandedTafsirAyah] = useState<number | null>(null);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [selectedWordRootModal, setSelectedWordRootModal] = useState<{
    word: string;
    root: string;
    transliteration: string;
    meaning: string;
  } | null>(null);

  const selectedSurah = QURAN_SURAHS.find(s => s.number === selectedSurahNumber) || QURAN_SURAHS[0];

  const filteredSurahs = QURAN_SURAHS.filter(s => 
    s.nameTransliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nameArabic.includes(searchQuery) ||
    s.number.toString() === searchQuery
  );

  const handleCopyAyah = (ayah: Ayah) => {
    const text = `${ayah.arabicText}\n${ayah.transliteration}\n"${ayah.translation}"\n[Surah ${selectedSurah.nameTransliteration} ${selectedSurah.number}:${ayah.numberInSurah}]`;
    navigator.clipboard.writeText(text);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  const handleBookmarkAyah = (ayah: Ayah) => {
    onSaveNote({
      title: `Surah ${selectedSurah.nameTransliteration} (${selectedSurah.number}:${ayah.numberInSurah})`,
      content: `${ayah.arabicText}\n\nTransliteration: ${ayah.transliteration}\n\nTranslation: ${ayah.translation}\n\nTafsir: ${ayah.tafsirShort || 'N/A'}`,
      tags: ['Quran', selectedSurah.nameTransliteration, `Juz ${ayah.juz}`],
      category: 'Quran',
      referencedText: ayah.arabicText
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Surah Selector Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/40 p-5 bg-arabesque">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-serif-caslon text-2xl font-bold text-[#003527] flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#775925]" />
              Al-Qur'an al-Kareem — Noble Quran
            </h2>
            <p className="text-sm text-[#404944]">
              Explore classical verses with word-by-word root breakdown, tafsir commentary, and audio recitation.
            </p>
          </div>

          {/* Search Surah */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#707974]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Surah by name or number..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-[#fcf9f8] border border-[#bfc9c3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003527] text-[#1b1c1c]"
            />
          </div>
        </div>

        {/* Surah Pills Horizontal Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {filteredSurahs.map((surah) => {
            const isSelected = surah.number === selectedSurahNumber;
            return (
              <button
                key={surah.number}
                onClick={() => setSelectedSurahNumber(surah.number)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 border whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#003527] text-white border-[#064e3b] shadow-sm'
                    : 'bg-[#fcf9f8] hover:bg-[#f0eded] text-[#1b1c1c] border-[#bfc9c3]/60'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-[#775925] text-white' : 'bg-[#e4e2e1] text-[#003527]'
                }`}>
                  {surah.number}
                </span>
                <span className="font-serif-caslon font-semibold">{surah.nameTransliteration}</span>
                <span className="font-arabic text-sm text-[#775925]">{surah.nameArabic}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Surah Content Display */}
      <div className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/40 overflow-hidden">
        {/* Surah Title Card */}
        <div className="bg-[#003527] text-white p-6 border-b border-[#064e3b] text-center bg-arabesque-dark relative">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#fdd494] font-semibold">
              Surah {selectedSurah.number} • {selectedSurah.revelationType} • {selectedSurah.totalAyahs} Verses
            </span>
            <h3 className="font-arabic text-4xl md:text-5xl font-bold text-white tracking-wide py-1">
              {selectedSurah.nameArabic}
            </h3>
            <p className="font-serif-caslon text-xl font-medium text-[#fdd494]">
              {selectedSurah.nameTransliteration} — <span className="font-sans text-base font-normal text-white">{selectedSurah.nameTranslation}</span>
            </p>
          </div>
        </div>

        {/* Ayahs List */}
        <div className="divide-y divide-[#f0eded]">
          {selectedSurah.ayahs.map((ayah) => {
            const isPlayingThis = activeAudio?.audioUrl === ayah.audioUrl && activeAudio?.isPlaying;
            const isTafsirOpen = expandedTafsirAyah === ayah.numberInSurah;

            return (
              <div key={ayah.numberInSurah} className="p-6 hover:bg-[#fcf9f8]/80 transition-colors space-y-4">
                {/* Verse Header Controls */}
                <div className="flex items-center justify-between text-xs text-[#707974]">
                  <div className="flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-full bg-[#064e3b] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                      {ayah.numberInSurah}
                    </span>
                    <span className="font-medium">Juz {ayah.juz} • Page {ayah.page}</span>
                  </div>

                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {/* Audio Play Button */}
                    {ayah.audioUrl && (
                      <button
                        onClick={() => onPlayAudio(
                          `Surah ${selectedSurah.nameTransliteration} (Verse ${ayah.numberInSurah})`,
                          selectedSurah.nameTranslation,
                          ayah.audioUrl!
                        )}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isPlayingThis
                            ? 'bg-[#775925] text-white ring-2 ring-[#fdd494]'
                            : 'bg-[#f0eded] hover:bg-[#064e3b] hover:text-white text-[#003527]'
                        }`}
                      >
                        {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isPlayingThis ? 'Pause Recitation' : 'Recite'}</span>
                      </button>
                    )}

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopyAyah(ayah)}
                      className="p-1.5 rounded-lg hover:bg-[#f0eded] text-[#707974] hover:text-[#003527] transition-colors"
                      title="Copy verse text"
                    >
                      {copiedAyah === ayah.numberInSurah ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>

                    {/* Bookmark Button */}
                    <button
                      onClick={() => handleBookmarkAyah(ayah)}
                      className="p-1.5 rounded-lg hover:bg-[#f0eded] text-[#707974] hover:text-[#775925] transition-colors"
                      title="Bookmark to Notebook"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    {/* Ask AI Scholar Button */}
                    <button
                      onClick={() => onNavigateToAI(`Provide a comprehensive scholarly commentary and spiritual lesson for Surah ${selectedSurah.nameTransliteration} verse ${ayah.numberInSurah}: "${ayah.translation}"`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#fdd494]/30 hover:bg-[#fdd494] text-[#775925] font-semibold text-xs border border-[#775925]/30 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Ask AI Scholar</span>
                    </button>
                  </div>
                </div>

                {/* Arabic Script */}
                <div className="text-right py-3 px-2">
                  <p className="font-arabic text-2xl md:text-3xl leading-relaxed text-[#1b1c1c] tracking-wide" dir="rtl">
                    {ayah.arabicText}
                  </p>
                </div>

                {/* Transliteration */}
                <p className="text-sm font-serif-caslon italic text-[#404944] border-l-2 border-[#775925]/40 pl-3">
                  {ayah.transliteration}
                </p>

                {/* English Translation */}
                <p className="text-base text-[#1b1c1c] leading-relaxed font-sans">
                  {ayah.translation}
                </p>

                {/* Root Words Pills */}
                {ayah.rootWords && ayah.rootWords.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#f0eded]/80">
                    <span className="text-xs font-semibold text-[#707974] flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" /> Triliteral Roots:
                    </span>
                    {ayah.rootWords.map((rw, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedWordRootModal(rw);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f6f3f2] hover:bg-[#064e3b] hover:text-white text-xs font-medium text-[#003527] border border-[#bfc9c3]/50 transition-colors"
                      >
                        <span className="font-arabic text-sm">{rw.word}</span>
                        <span className="text-[10px] text-[#775925] font-bold">({rw.root})</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Tafsir Accordion Button & Content */}
                {ayah.tafsirShort && (
                  <div className="pt-2">
                    <button
                      onClick={() => setExpandedTafsirAyah(isTafsirOpen ? null : ayah.numberInSurah)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#775925] hover:text-[#003527] transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>{isTafsirOpen ? 'Hide Classical Tafsir Note' : 'Read Classical Tafsir Insight'}</span>
                    </button>

                    {isTafsirOpen && (
                      <div className="mt-3 p-4 rounded-lg bg-[#f6f3f2] border border-[#bfc9c3]/60 text-xs text-[#1b1c1c] leading-relaxed space-y-2">
                        <div className="font-semibold text-[#003527] flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-[#775925]" />
                          Tafsir Excerpt (Ibn Kathir & As-Sa'di Summary)
                        </div>
                        <p>{ayah.tafsirShort}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Word Root Breakdown Modal */}
      {selectedWordRootModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-[#bfc9c3] space-y-4">
            <div className="flex items-start justify-between border-b border-[#f0eded] pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-[#775925]">Linguistic Breakdown</span>
                <h4 className="font-arabic text-3xl font-bold text-[#003527]">{selectedWordRootModal.word}</h4>
              </div>
              <button
                onClick={() => setSelectedWordRootModal(null)}
                className="text-[#707974] hover:text-[#1b1c1c] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#1b1c1c]">
              <div className="p-3 bg-[#f6f3f2] rounded-lg border border-[#bfc9c3]/50">
                <span className="text-xs text-[#707974]">Root Letters:</span>
                <p className="font-arabic text-2xl font-bold text-[#775925]">{selectedWordRootModal.root}</p>
                <p className="text-xs text-[#404944] italic">Transliteration: {selectedWordRootModal.transliteration}</p>
              </div>

              <div>
                <span className="text-xs text-[#707974] font-semibold">Contextual Meaning:</span>
                <p className="font-serif-caslon text-base text-[#003527] font-semibold">{selectedWordRootModal.meaning}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  const root = selectedWordRootModal.root.replace(/-/g, '').toLowerCase();
                  onSelectRoot(selectedWordRootModal.root);
                  setSelectedWordRootModal(null);
                }}
                className="w-full py-2 px-4 rounded-lg bg-[#003527] hover:bg-[#064e3b] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Explore Root in Lexicon</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
