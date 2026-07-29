import React, { useState } from 'react';
import { HADITH_COLLECTION } from '../data/hadithData';
import { Hadith, ActiveAudioState, NoteItem } from '../types';
import { 
  BookMarked, 
  Search, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Check, 
  Tag, 
  Award, 
  User, 
  BookOpen
} from 'lucide-react';

interface HadithBrowserProps {
  onSaveNote: (note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onNavigateToAI: (initialQuery: string) => void;
}

export const HadithBrowser: React.FC<HadithBrowserProps> = ({
  onSaveNote,
  onNavigateToAI
}) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>('All');

  const collections = ['All', 'Sahih al-Bukhari', 'Sahih Muslim', '40 Hadith Nawawi'];
  const grades = ['All', 'Sahih', 'Muttafaq Alaih'];

  const filteredHadiths = HADITH_COLLECTION.filter(h => {
    const matchesCollection = selectedCollection === 'All' || h.collection === selectedCollection;
    const matchesGrade = selectedGrade === 'All' || h.grade === selectedGrade;
    const matchesSearch = 
      h.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.arabicText.includes(searchQuery) ||
      h.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCollection && matchesGrade && matchesSearch;
  });

  const handleCopy = (hadith: Hadith) => {
    const text = `${hadith.arabicText}\n\n${hadith.englishTranslation}\n\n[Narrated by ${hadith.narrator} | ${hadith.collection} #${hadith.hadithNumber} - Grade: ${hadith.grade}]`;
    navigator.clipboard.writeText(text);
    setCopiedId(hadith.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleBookmark = (hadith: Hadith) => {
    onSaveNote({
      title: `${hadith.collection} #${hadith.hadithNumber}: ${hadith.chapterTitle}`,
      content: `${hadith.arabicText}\n\n${hadith.englishTranslation}\n\nNarrator: ${hadith.narrator}\nGrade: ${hadith.grade}\nNotes: ${hadith.scholarlyNotes || ''}`,
      tags: ['Hadith', hadith.collection, hadith.grade, ...hadith.topics],
      category: 'Hadith',
      referencedText: hadith.arabicText
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/40 p-5 bg-arabesque space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif-caslon text-2xl font-bold text-[#003527] flex items-center gap-2">
              <BookMarked className="w-6 h-6 text-[#775925]" />
              Sunnah & Hadith Treasury
            </h2>
            <p className="text-sm text-[#404944]">
              Authentic prophetic traditions with narrator chains (isnad), authentication grading, and scholarly commentary.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#707974]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, narrator, or keyword..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-[#fcf9f8] border border-[#bfc9c3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003527] text-[#1b1c1c]"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#f0eded]">
          {/* Collection Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            <span className="text-xs font-semibold text-[#707974] mr-1">Collection:</span>
            {collections.map(col => (
              <button
                key={col}
                onClick={() => setSelectedCollection(col)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCollection === col
                    ? 'bg-[#003527] text-white shadow-xs'
                    : 'bg-[#fcf9f8] hover:bg-[#f0eded] text-[#404944] border border-[#bfc9c3]/50'
                }`}
              >
                {col}
              </button>
            ))}
          </div>

          {/* Grade Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#707974]">Grade:</span>
            {grades.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                  selectedGrade === g
                    ? 'bg-[#775925] text-white'
                    : 'bg-[#f0eded] text-[#404944] hover:bg-[#e4e2e1]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hadith Cards Grid */}
      <div className="space-y-4">
        {filteredHadiths.map((hadith) => (
          <div
            key={hadith.id}
            className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/50 overflow-hidden hover:border-[#003527]/40 transition-all p-6 space-y-4"
          >
            {/* Top Meta Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0eded] pb-3">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-md bg-[#064e3b] text-[#fdd494] text-xs font-bold font-serif-caslon">
                  {hadith.collection} #{hadith.hadithNumber}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Award className="w-3 h-3" /> {hadith.grade}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleCopy(hadith)}
                  className="p-1.5 rounded-lg hover:bg-[#f0eded] text-[#707974] hover:text-[#003527] transition-colors"
                  title="Copy Hadith"
                >
                  {copiedId === hadith.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleBookmark(hadith)}
                  className="p-1.5 rounded-lg hover:bg-[#f0eded] text-[#707974] hover:text-[#775925] transition-colors"
                  title="Bookmark Hadith"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigateToAI(`Analyze this authentic hadith from ${hadith.collection} (#${hadith.hadithNumber}) narrated by ${hadith.narrator}: "${hadith.englishTranslation}". Explain its juristic and spiritual implications.`)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#fdd494]/30 hover:bg-[#fdd494] text-[#775925] font-semibold text-xs border border-[#775925]/30 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI Scholar</span>
                </button>
              </div>
            </div>

            {/* Chapter Title */}
            <h3 className="font-serif-caslon text-lg font-bold text-[#003527]">
              {hadith.chapterTitle}
            </h3>

            {/* Arabic Script */}
            <div className="text-right bg-[#fcf9f8] p-4 rounded-xl border border-[#bfc9c3]/30">
              <p className="font-arabic text-xl md:text-2xl leading-relaxed text-[#1b1c1c]" dir="rtl">
                {hadith.arabicText}
              </p>
            </div>

            {/* English Translation */}
            <p className="text-base text-[#1b1c1c] leading-relaxed font-sans">
              {hadith.englishTranslation}
            </p>

            {/* Narrator & Scholarly Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-[#f0eded] text-xs">
              <div className="flex items-center gap-2 text-[#404944]">
                <User className="w-4 h-4 text-[#775925]" />
                <span className="font-semibold text-[#003527]">Narrator Chain:</span>
                <span>{hadith.narrator}</span>
              </div>

              {hadith.scholarlyNotes && (
                <div className="flex items-start gap-2 text-[#404944] bg-[#f6f3f2] p-2.5 rounded-lg border border-[#bfc9c3]/40">
                  <BookOpen className="w-4 h-4 text-[#775925] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#003527]">Classical Commentary:</span>
                    <p className="mt-0.5 text-[#1b1c1c]">{hadith.scholarlyNotes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Topic Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {hadith.topics.map((t, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-[#f0eded] text-[#404944]">
                  <Tag className="w-2.5 h-2.5 text-[#775925]" /> {t}
                </span>
              ))}
            </div>
          </div>
        ))}

        {filteredHadiths.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center border border-[#bfc9c3]/40 text-[#707974] space-y-2">
            <BookMarked className="w-10 h-10 mx-auto text-[#775925]/50" />
            <p className="font-serif-caslon text-lg font-semibold text-[#003527]">No Hadiths Found</p>
            <p className="text-sm">Try broadening your search or resetting the collection filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
