import React, { useState, useEffect } from 'react';
import { NavigationTab, ActiveAudioState, NoteItem } from './types';
import { Header } from './components/Header';
import { QuranReader } from './components/QuranReader';
import { HadithBrowser } from './components/HadithBrowser';
import { ManuscriptsViewer } from './components/ManuscriptsViewer';
import { RootExplorer } from './components/RootExplorer';
import { AIScholar } from './components/AIScholar';
import { MemorizationStudio } from './components/MemorizationStudio';
import { AdhkarTreasury } from './components/AdhkarTreasury';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { NotebookDrawer } from './components/NotebookDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('quran');
  const [activeAudio, setActiveAudio] = useState<ActiveAudioState | null>(null);
  const [isNotebookOpen, setIsNotebookOpen] = useState<boolean>(false);
  const [aiScholarInitialQuery, setAiScholarInitialQuery] = useState<string>('');
  const [selectedRootFilter, setSelectedRootFilter] = useState<string | undefined>(undefined);

  // Load persistent notebook items from localStorage
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('sacred_knowledge_notes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved notes:', e);
    }
    return [
      {
        id: 'note-1',
        title: 'Initial Welcome Note',
        content: 'Bismillah! Welcome to your Sacred Knowledge System personal notebook. Here you can archive verses, authentic hadith, manuscript notes, and AI scholar research.',
        tags: ['Welcome', 'Sacred Knowledge'],
        category: 'General',
        createdAt: new Date().toLocaleDateString()
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('sacred_knowledge_notes', JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes:', e);
    }
  }, [notes]);

  const handlePlayAudio = (title: string, subtitle: string, url: string) => {
    if (activeAudio?.audioUrl === url && activeAudio.isPlaying) {
      setActiveAudio(prev => prev ? { ...prev, isPlaying: false } : null);
    } else {
      setActiveAudio({
        isPlaying: true,
        title,
        subtitle,
        audioUrl: url,
        currentTime: 0,
        duration: 0,
        reciterId: 'alafasy',
        playbackRate: 1.0
      });
    }
  };

  const handleTogglePlay = () => {
    if (activeAudio) {
      setActiveAudio(prev => prev ? { ...prev, isPlaying: !prev.isPlaying } : null);
    }
  };

  const handleSaveNote = (noteData: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: NoteItem = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const handleNavigateToAI = (query: string) => {
    setAiScholarInitialQuery(query);
    setActiveTab('ai-scholar');
  };

  const handleSelectRoot = (root: string) => {
    setSelectedRootFilter(root);
    setActiveTab('root-dictionary');
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1b1c1c] flex flex-col font-sans pb-24">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openNotebook={() => setIsNotebookOpen(true)}
        savedNotesCount={notes.length}
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'quran' && (
          <QuranReader
            onPlayAudio={handlePlayAudio}
            activeAudio={activeAudio}
            onSaveNote={handleSaveNote}
            onNavigateToAI={handleNavigateToAI}
            onSelectRoot={handleSelectRoot}
          />
        )}

        {activeTab === 'hadith' && (
          <HadithBrowser
            onSaveNote={handleSaveNote}
            onNavigateToAI={handleNavigateToAI}
          />
        )}

        {activeTab === 'manuscripts' && (
          <ManuscriptsViewer
            onSaveNote={handleSaveNote}
            onNavigateToAI={handleNavigateToAI}
          />
        )}

        {activeTab === 'root-dictionary' && (
          <RootExplorer
            onSaveNote={handleSaveNote}
            onNavigateToAI={handleNavigateToAI}
            selectedRootFilter={selectedRootFilter}
          />
        )}

        {activeTab === 'ai-scholar' && (
          <AIScholar
            onSaveNote={handleSaveNote}
            initialQuery={aiScholarInitialQuery}
          />
        )}

        {activeTab === 'memorization' && (
          <MemorizationStudio
            onPlayAudio={handlePlayAudio}
            activeAudio={activeAudio}
          />
        )}

        {activeTab === 'adhkar' && (
          <AdhkarTreasury
            onPlayAudio={handlePlayAudio}
            activeAudio={activeAudio}
          />
        )}
      </main>

      {/* Persistent Audio Player Bar */}
      <AudioPlayerBar
        activeAudio={activeAudio}
        onClose={() => setActiveAudio(null)}
        onTogglePlay={handleTogglePlay}
      />

      {/* Personal Notebook Drawer */}
      <NotebookDrawer
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        notes={notes}
        onDeleteNote={handleDeleteNote}
        onAddNote={handleSaveNote}
      />
    </div>
  );
}
