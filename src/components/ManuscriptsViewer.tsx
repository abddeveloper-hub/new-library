import React, { useState } from 'react';
import { CLASSICAL_MANUSCRIPTS } from '../data/manuscriptData';
import { Manuscript, NoteItem } from '../types';
import { 
  Scroll, 
  BookOpen, 
  Sparkles, 
  Bookmark, 
  Feather, 
  ChevronRight, 
  Layers, 
  FileText,
  UserCheck
} from 'lucide-react';

interface ManuscriptsViewerProps {
  onSaveNote: (note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onNavigateToAI: (initialQuery: string) => void;
}

export const ManuscriptsViewer: React.FC<ManuscriptsViewerProps> = ({
  onSaveNote,
  onNavigateToAI
}) => {
  const [selectedManuscriptId, setSelectedManuscriptId] = useState<string>(CLASSICAL_MANUSCRIPTS[0].id);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isParchmentMode, setIsParchmentMode] = useState<boolean>(true);

  const selectedManuscript = CLASSICAL_MANUSCRIPTS.find(m => m.id === selectedManuscriptId) || CLASSICAL_MANUSCRIPTS[0];
  const activeChapter = selectedManuscript.chapters[activeChapterIndex] || selectedManuscript.chapters[0];

  const handleBookmarkChapter = () => {
    onSaveNote({
      title: `${selectedManuscript.titleEnglish} — ${activeChapter.title}`,
      content: `${activeChapter.arabicMatn}\n\nTranslation:\n${activeChapter.englishTranslation}\n\nCommentary:\n${activeChapter.commentary}`,
      tags: ['Manuscript', selectedManuscript.category, selectedManuscript.titleEnglish],
      category: 'Manuscript',
      referencedText: activeChapter.arabicMatn
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/40 p-5 bg-arabesque flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-caslon text-2xl font-bold text-[#003527] flex items-center gap-2">
            <Scroll className="w-6 h-6 text-[#775925]" />
            Classical Manuscripts & Scholarly Treatises
          </h2>
          <p className="text-sm text-[#404944]">
            Explore foundational classical texts (Mutūn) in Fiqh, Aqeedah, Tazkiyah, and Arabic Grammar.
          </p>
        </div>

        {/* Parchment Aesthetic Toggle */}
        <button
          onClick={() => setIsParchmentMode(!isParchmentMode)}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
            isParchmentMode
              ? 'bg-[#fdd494] text-[#775925] border-[#775925]/40 shadow-xs'
              : 'bg-white text-[#003527] border-[#bfc9c3]'
          }`}
        >
          <Feather className="w-4 h-4" />
          <span>{isParchmentMode ? 'Parchment Manuscript Mode' : 'Standard Clean View'}</span>
        </button>
      </div>

      {/* Grid Layout: Manuscripts Library Selector + Chapter Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Manuscript Selection Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#707974] px-1">
            Manuscript Library ({CLASSICAL_MANUSCRIPTS.length})
          </h3>

          <div className="space-y-3">
            {CLASSICAL_MANUSCRIPTS.map((manuscript) => {
              const isSelected = manuscript.id === selectedManuscriptId;
              return (
                <div
                  key={manuscript.id}
                  onClick={() => {
                    setSelectedManuscriptId(manuscript.id);
                    setActiveChapterIndex(0);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#003527] text-white border-[#064e3b] shadow-md ring-1 ring-[#fdd494]/40'
                      : 'bg-white hover:bg-[#fcf9f8] text-[#1b1c1c] border-[#bfc9c3]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isSelected ? 'bg-[#775925] text-white' : 'bg-[#e4e2e1] text-[#003527]'
                    }`}>
                      {manuscript.category}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-[#bfc9c3]' : 'text-[#707974]'}`}>
                      {manuscript.century}
                    </span>
                  </div>

                  <h4 className="font-arabic text-xl font-bold mt-2 py-0.5" dir="rtl">
                    {manuscript.titleArabic}
                  </h4>
                  <p className="font-serif-caslon font-semibold text-sm leading-tight">
                    {manuscript.titleEnglish}
                  </p>
                  <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-[#bfc9c3]' : 'text-[#404944]'}`}>
                    {manuscript.authorEnglish}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Manuscript Chapter Reader (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Manuscript Info Banner */}
          <div className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/50 p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0eded] pb-3">
              <div>
                <span className="text-xs uppercase font-bold text-[#775925]">{selectedManuscript.category}</span>
                <h3 className="font-serif-caslon text-xl font-bold text-[#003527]">
                  {selectedManuscript.titleEnglish}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[#f0eded] text-[#003527] font-medium self-start sm:self-auto">
                {selectedManuscript.century}
              </span>
            </div>

            <p className="text-xs text-[#404944] leading-relaxed">
              <strong className="text-[#003527]">Author:</strong> {selectedManuscript.authorEnglish} ({selectedManuscript.authorArabic})
            </p>
            <p className="text-xs text-[#707974]">
              {selectedManuscript.summary}
            </p>

            {/* Chapter Selection Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#f0eded] no-scrollbar">
              <span className="text-xs font-semibold text-[#707974] mr-1 shrink-0">Chapters:</span>
              {selectedManuscript.chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeChapterIndex === idx
                      ? 'bg-[#775925] text-white shadow-xs'
                      : 'bg-[#f0eded] text-[#404944] hover:bg-[#e4e2e1]'
                  }`}
                >
                  Ch {ch.chapterNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Active Chapter Display (Parchment or Clean View) */}
          <div className={`rounded-xl border shadow-sm p-6 sm:p-8 space-y-6 transition-all ${
            isParchmentMode
              ? 'bg-[#fcf7ed] border-[#e8c182] text-[#281900] bg-arabesque'
              : 'bg-white border-[#bfc9c3]/50 text-[#1b1c1c]'
          }`}>
            {/* Chapter Action Controls */}
            <div className="flex items-center justify-between border-b border-[#775925]/20 pb-4">
              <h4 className="font-serif-caslon text-lg font-bold text-[#775925]">
                {activeChapter.title}
              </h4>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleBookmarkChapter}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-[#775925] border border-[#775925]/30 text-xs font-semibold shadow-xs transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Bookmark Chapter</span>
                </button>

                <button
                  onClick={() => onNavigateToAI(`Explain the classical treatise chapter from "${selectedManuscript.titleEnglish}": "${activeChapter.title}". Matn excerpt: "${activeChapter.arabicMatn}". Provide detailed scholarly commentary.`)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#003527] hover:bg-[#064e3b] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#fdd494]" />
                  <span>Analyze with AI Scholar</span>
                </button>
              </div>
            </div>

            {/* Arabic Matn (Scripture/Text) */}
            <div className="p-6 rounded-xl bg-amber-50/60 border border-[#e8c182]/50 text-right shadow-xs">
              <span className="text-[10px] uppercase tracking-widest text-[#775925] font-bold block mb-2 text-left">
                Classical Arabic Matn (المتن الأصلي)
              </span>
              <p className="font-arabic text-2xl md:text-3xl leading-relaxed text-[#1b1c1c]" dir="rtl">
                {activeChapter.arabicMatn}
              </p>
            </div>

            {/* English Translation */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#775925] uppercase tracking-wider">
                English Translation
              </span>
              <p className="text-base leading-relaxed font-sans font-normal">
                {activeChapter.englishTranslation}
              </p>
            </div>

            {/* Scholarly Commentary Margin Note */}
            <div className="p-4 rounded-xl bg-white/90 border-l-4 border-[#775925] shadow-xs space-y-1 text-xs">
              <div className="font-semibold text-[#003527] flex items-center gap-1.5">
                <Feather className="w-4 h-4 text-[#775925]" />
                Margin Commentary (Sharh Notes)
              </div>
              <p className="text-[#404944] leading-relaxed">
                {activeChapter.commentary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
