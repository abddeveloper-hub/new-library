import React, { useState } from 'react';
import { ROOT_DICTIONARY } from '../data/rootDictionaryData';
import { RootEntry, NoteItem } from '../types';
import { 
  Search, 
  Sparkles, 
  Bookmark, 
  Layers, 
  BookOpen, 
  Share2, 
  Check, 
  RefreshCw,
  Hash
} from 'lucide-react';

interface RootExplorerProps {
  onSaveNote: (note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onNavigateToAI: (initialQuery: string) => void;
  selectedRootFilter?: string;
}

export const RootExplorer: React.FC<RootExplorerProps> = ({
  onSaveNote,
  onNavigateToAI,
  selectedRootFilter
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(selectedRootFilter || '');
  const [selectedRootId, setSelectedRootId] = useState<string>(
    selectedRootFilter ? selectedRootFilter : ROOT_DICTIONARY[0].root
  );
  const [customRootInput, setCustomRootInput] = useState<string>('');
  const [aiRootResult, setAiRootResult] = useState<any>(null);
  const [isLoadingAIRoot, setIsLoadingAIRoot] = useState<boolean>(false);

  const activeRootEntry = ROOT_DICTIONARY.find(r => 
    r.root === selectedRootId || r.rootArabic === selectedRootId
  ) || ROOT_DICTIONARY[0];

  const filteredRoots = ROOT_DICTIONARY.filter(r => 
    r.root.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.rootArabic.includes(searchQuery) ||
    r.primaryMeaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCustomAIRootAnalysis = async (rootToAnalyze?: string) => {
    const targetRoot = rootToAnalyze || customRootInput || activeRootEntry.root;
    if (!targetRoot) return;

    setIsLoadingAIRoot(true);
    setAiRootResult(null);

    try {
      const response = await fetch('/api/scholar/root-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ root: targetRoot }),
      });
      const data = await response.json();
      setAiRootResult(data);
    } catch (error) {
      console.error('Error performing root analysis:', error);
    } finally {
      setIsLoadingAIRoot(false);
    }
  };

  const handleBookmarkRoot = () => {
    onSaveNote({
      title: `Root Lexicon: ${activeRootEntry.rootArabic} (${activeRootEntry.root})`,
      content: `Primary Meaning: ${activeRootEntry.primaryMeaning}\n\nOccurrences in Quran: ${activeRootEntry.occurrencesInQuran}\n\nLexicon Note:\n${activeRootEntry.classicalLexiconNote}`,
      tags: ['Root Lexicon', activeRootEntry.root, activeRootEntry.rootArabic],
      category: 'Root',
      referencedText: activeRootEntry.rootArabic
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Search Header */}
      <div className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/40 p-5 bg-arabesque space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif-caslon text-2xl font-bold text-[#003527] flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#775925]" />
              Mu'jam al-Juzoor — Arabic Root Lexicon
            </h2>
            <p className="text-sm text-[#404944]">
              Triliteral Arabic morphological roots, semantic fields, derivatives, and Quranic occurrence frequencies.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#707974]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search root (e.g. S-L-M or س-ل-م)..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-[#fcf9f8] border border-[#bfc9c3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003527] text-[#1b1c1c]"
            />
          </div>
        </div>

        {/* Root Pills Horizontal Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filteredRoots.map((r) => {
            const isSelected = r.root === activeRootEntry.root;
            return (
              <button
                key={r.root}
                onClick={() => {
                  setSelectedRootId(r.root);
                  setAiRootResult(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#003527] text-white border-[#064e3b] shadow-sm'
                    : 'bg-[#fcf9f8] text-[#404944] hover:bg-[#f0eded] border-[#bfc9c3]/50'
                }`}
              >
                <span className="font-arabic text-base text-[#fdd494]">{r.rootArabic}</span>
                <span>({r.root})</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#775925] text-white font-bold">
                  {r.occurrencesInQuran}x
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Root Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/50 overflow-hidden space-y-6 p-6 sm:p-8">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0eded] pb-5">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#003527] text-[#fdd494] font-arabic text-3xl font-bold flex items-center justify-center shadow-md border border-[#064e3b]">
              {activeRootEntry.rootArabic}
            </div>
            <div>
              <span className="text-xs font-bold text-[#775925] uppercase tracking-wider">
                Triliteral Root • {activeRootEntry.transliteration}
              </span>
              <h3 className="font-serif-caslon text-2xl font-bold text-[#003527]">
                Root: {activeRootEntry.root}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleBookmarkRoot}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#f0eded] hover:bg-[#e4e2e1] text-[#003527] text-xs font-semibold transition-colors"
            >
              <Bookmark className="w-4 h-4 text-[#775925]" />
              <span>Save Root</span>
            </button>

            <button
              onClick={() => handleCustomAIRootAnalysis(activeRootEntry.root)}
              disabled={isLoadingAIRoot}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#003527] hover:bg-[#064e3b] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              {isLoadingAIRoot ? <RefreshCw className="w-4 h-4 animate-spin text-[#fdd494]" /> : <Sparkles className="w-4 h-4 text-[#fdd494]" />}
              <span>{isLoadingAIRoot ? 'Analyzing Root...' : 'Deep AI Lexicon Analysis'}</span>
            </button>
          </div>
        </div>

        {/* Primary Semantic Essence & Lexicon Note */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#fcf9f8] border border-[#bfc9c3]/50 space-y-2">
            <span className="text-xs font-bold text-[#775925] uppercase">Core Semantic Essence</span>
            <p className="font-serif-caslon text-lg font-semibold text-[#003527]">
              {activeRootEntry.primaryMeaning}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f6f3f2] border border-[#bfc9c3]/50 space-y-2">
            <span className="text-xs font-bold text-[#003527] uppercase">Quranic Occurrence Count</span>
            <div className="flex items-baseline space-x-2">
              <span className="font-serif-caslon text-3xl font-bold text-[#775925]">
                {activeRootEntry.occurrencesInQuran}
              </span>
              <span className="text-xs text-[#707974]">total appearances across Surahs</span>
            </div>
          </div>
        </div>

        {/* Classical Lexicon Note */}
        <div className="p-5 rounded-xl bg-amber-50/50 border border-[#fdd494]/60 space-y-2">
          <h4 className="font-serif-caslon text-sm font-bold text-[#775925] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Classical Dictionary Excerpt (Lisān al-'Arab & Tāj al-'Arūs)
          </h4>
          <p className="text-xs text-[#1b1c1c] leading-relaxed">
            {activeRootEntry.classicalLexiconNote}
          </p>
        </div>

        {/* Derivatives Cards */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#707974]">
            Morphological Derivatives & Noun/Verb Forms ({activeRootEntry.derivatives.length})
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeRootEntry.derivatives.map((der, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#bfc9c3]/40 bg-white hover:border-[#003527]/40 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-arabic text-2xl font-bold text-[#003527]">{der.wordArabic}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f0eded] text-[#775925]">
                    {der.quranFrequency}x
                  </span>
                </div>
                <div>
                  <p className="font-serif-caslon text-sm font-semibold text-[#1b1c1c]">{der.transliteration}</p>
                  <p className="text-xs text-[#404944]">{der.meaning}</p>
                </div>
                <span className="inline-block text-[10px] italic text-[#707974]">
                  Form: {der.grammaticalForm}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Verses containing this Root */}
        <div className="space-y-3 pt-3 border-t border-[#f0eded]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#707974]">
            Sample Verses in the Noble Quran
          </h4>

          <div className="space-y-3">
            {activeRootEntry.sampleVerses.map((verse, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#fcf9f8] border border-[#bfc9c3]/50 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#775925] font-semibold">
                  <span>Surah {verse.surahName} ({verse.surah}:{verse.ayah})</span>
                </div>
                <p className="font-arabic text-xl text-right text-[#1b1c1c] leading-relaxed" dir="rtl">
                  {verse.textArabic}
                </p>
                <p className="text-xs text-[#404944] italic">
                  "{verse.translation}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Root Deep Analysis Result Modal/Block */}
        {aiRootResult && (
          <div className="p-6 rounded-xl bg-[#003527] text-white border border-[#064e3b] space-y-4 shadow-lg bg-arabesque-dark">
            <div className="flex items-center justify-between border-b border-[#064e3b] pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#fdd494]" />
                <h4 className="font-serif-caslon text-lg font-bold text-[#fdd494]">
                  Gemini AI Morphological Insight ({aiRootResult.root || activeRootEntry.root})
                </h4>
              </div>
              <button onClick={() => setAiRootResult(null)} className="text-[#bfc9c3] hover:text-white font-bold text-sm">
                ✕
              </button>
            </div>

            <p className="text-sm leading-relaxed text-[#e4e2e1]">
              <strong>Primary Essence:</strong> {aiRootResult.primaryMeaning}
            </p>

            <div className="space-y-2 text-xs text-[#bfc9c3]">
              <p><strong>Classical Etymology:</strong> {aiRootResult.classicalEtymology}</p>
              <p><strong>Quranic Significance:</strong> {aiRootResult.quranicSignificance}</p>
              <p><strong>Spiritual Takeaway:</strong> {aiRootResult.spiritualTakeaway}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
