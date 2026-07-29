import React from 'react';
import { NavigationTab } from '../types';
import { 
  BookOpen, 
  BookMarked, 
  Scroll, 
  Search, 
  Sparkles, 
  Brain, 
  Compass, 
  Bookmark, 
  Feather,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  openNotebook: () => void;
  savedNotesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openNotebook,
  savedNotesCount
}) => {
  const navItems: { id: NavigationTab; label: string; arabicLabel: string; icon: React.ReactNode }[] = [
    { id: 'quran', label: 'Quran & Tafsir', arabicLabel: 'القرآن الكريم', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'hadith', label: 'Hadith Treasury', arabicLabel: 'السنة النبوية', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'manuscripts', label: 'Manuscripts', arabicLabel: 'المخطوطات', icon: <Scroll className="w-4 h-4" /> },
    { id: 'root-dictionary', label: 'Root Lexicon', arabicLabel: 'معجم الجذور', icon: <Search className="w-4 h-4" /> },
    { id: 'ai-scholar', label: 'AI Scholar', arabicLabel: 'المساعد العلمي', icon: <Sparkles className="w-4 h-4 text-[#fdd494]" /> },
    { id: 'memorization', label: 'Hifz Studio', arabicLabel: 'الحفظ والمراجعة', icon: <Brain className="w-4 h-4" /> },
    { id: 'adhkar', label: 'Daily Adhkar', arabicLabel: 'الأذكار والدعاء', icon: <Compass className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#003527] text-white shadow-lg border-b border-[#064e3b] bg-arabesque-dark">
      {/* Top Utility Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between border-b border-[#064e3b]/60 text-xs">
        <div className="flex items-center space-x-3 text-[#bfc9c3]">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#fdd494]">
            <Feather className="w-3.5 h-3.5" /> Sacred Knowledge System
          </span>
          <span className="hidden md:inline text-[#064e3b]">•</span>
          <span className="hidden md:inline font-arabic text-sm text-[#e4e2e1]">المكتبة الإسلامية والمنظومة العلمية</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={openNotebook}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#064e3b] hover:bg-[#064e3b]/80 text-[#fdd494] transition-colors border border-[#775925]/30"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Notebook</span>
            {savedNotesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-[#775925] text-white rounded-full">
                {savedNotesCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Header Branding & Nav Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#775925] to-[#064e3b] p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#003527] rounded-[7px] flex items-center justify-center border border-[#fdd494]/30">
                <span className="font-arabic text-xl font-bold text-[#fdd494]">ﷺ</span>
              </div>
            </div>
            <div>
              <h1 className="font-serif-caslon text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Sacred Knowledge <span className="text-xs font-sans font-normal px-2 py-0.5 rounded bg-[#064e3b] text-[#fdd494] border border-[#775925]/40">v2.5</span>
              </h1>
              <p className="text-xs text-[#bfc9c3] font-sans">
                Islamic Classical Scholarship & Interactive Study Platform
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#775925] text-white shadow-sm ring-1 ring-[#fdd494]/50'
                      : 'text-[#bfc9c3] hover:text-white hover:bg-[#064e3b]/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
