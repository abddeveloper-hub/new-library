import React, { useState } from 'react';
import { NoteItem } from '../types';
import { 
  Bookmark, 
  Trash2, 
  Plus, 
  Search, 
  Download, 
  X, 
  Tag, 
  FileText, 
  Check, 
  Share2 
} from 'lucide-react';

interface NotebookDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notes: NoteItem[];
  onDeleteNote: (id: string) => void;
  onAddNote: (note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const NotebookDrawer: React.FC<NotebookDrawerProps> = ({
  isOpen,
  onClose,
  notes,
  onDeleteNote,
  onAddNote
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states for new note
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Quran' | 'Hadith' | 'Manuscript' | 'Root' | 'General'>('General');
  const [newTagsStr, setNewTagsStr] = useState<string>('');

  if (!isOpen) return null;

  const categories = ['All', 'Quran', 'Hadith', 'Manuscript', 'Root', 'General'];

  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tags = newTagsStr.split(',').map(t => t.trim()).filter(Boolean);
    onAddNote({
      title: newTitle,
      content: newContent,
      category: newCategory,
      tags: tags.length > 0 ? tags : [newCategory]
    });

    setNewTitle('');
    setNewContent('');
    setNewTagsStr('');
    setIsCreatingNew(false);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sacred_knowledge_notes_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyNote = (note: NoteItem) => {
    const text = `${note.title}\nCategory: ${note.category}\nTags: ${note.tags.join(', ')}\n\n${note.content}`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col border-l border-[#bfc9c3]">
        {/* Drawer Header */}
        <div className="p-5 bg-[#003527] text-white flex items-center justify-between border-b border-[#064e3b] bg-arabesque-dark">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-[#fdd494]" />
            <h3 className="font-serif-caslon text-xl font-bold">Personal Notebook</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#775925] text-white font-bold">
              {notes.length}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportJSON}
              className="p-1.5 rounded hover:bg-[#064e3b] text-[#bfc9c3] hover:text-white transition-colors"
              title="Export Notebook to JSON"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-[#064e3b] text-[#bfc9c3] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar & Filter */}
        <div className="p-4 bg-[#fcf9f8] border-b border-[#bfc9c3]/50 space-y-3">
          <div className="flex items-center justify-between gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#707974]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#bfc9c3] rounded-lg text-[#1b1c1c]"
              />
            </div>

            <button
              onClick={() => setIsCreatingNew(!isCreatingNew)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#003527] hover:bg-[#064e3b] text-white text-xs font-semibold shadow-xs shrink-0"
            >
              <Plus className="w-3.5 h-3.5 text-[#fdd494]" />
              <span>{isCreatingNew ? 'Cancel' : 'New Note'}</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#775925] text-white'
                    : 'bg-white text-[#404944] hover:bg-[#e4e2e1] border border-[#bfc9c3]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* New Note Form */}
        {isCreatingNew && (
          <form onSubmit={handleCreateSubmit} className="p-4 bg-amber-50/50 border-b border-[#e8c182] space-y-3">
            <h4 className="text-xs font-bold uppercase text-[#775925]">Create Annotation</h4>
            <input
              type="text"
              placeholder="Note Title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 text-xs bg-white border border-[#bfc9c3] rounded-md text-[#1b1c1c]"
              required
            />

            <div className="grid grid-cols-2 gap-2 text-xs">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="p-2 bg-white border border-[#bfc9c3] rounded-md text-[#1b1c1c]"
              >
                <option value="General">General</option>
                <option value="Quran">Quran</option>
                <option value="Hadith">Hadith</option>
                <option value="Manuscript">Manuscript</option>
                <option value="Root">Root</option>
              </select>

              <input
                type="text"
                placeholder="Tags (comma separated)..."
                value={newTagsStr}
                onChange={(e) => setNewTagsStr(e.target.value)}
                className="p-2 bg-white border border-[#bfc9c3] rounded-md text-[#1b1c1c]"
              />
            </div>

            <textarea
              placeholder="Write your study notes or reflections..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
              className="w-full p-2 text-xs bg-white border border-[#bfc9c3] rounded-md text-[#1b1c1c]"
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-[#003527] text-white rounded-md font-semibold text-xs shadow-xs"
            >
              Save Note
            </button>
          </form>
        )}

        {/* Saved Notes Scroll List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 rounded-xl border border-[#bfc9c3]/50 bg-white hover:border-[#003527]/40 transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#f0eded] text-[#775925]">
                    {note.category}
                  </span>
                  <h4 className="font-serif-caslon text-sm font-bold text-[#003527] mt-1">
                    {note.title}
                  </h4>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => handleCopyNote(note)}
                    className="p-1 rounded text-[#707974] hover:text-[#003527]"
                    title="Copy Note"
                  >
                    {copiedId === note.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="p-1 rounded text-[#707974] hover:text-red-600"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {note.referencedText && (
                <div className="p-2 rounded bg-[#fcf9f8] border border-[#bfc9c3]/30 text-right font-arabic text-base text-[#1b1c1c]" dir="rtl">
                  {note.referencedText}
                </div>
              )}

              <p className="text-xs text-[#1b1c1c] whitespace-pre-wrap font-sans leading-relaxed">
                {note.content}
              </p>

              <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-[#f0eded]">
                {note.tags.map((t, idx) => (
                  <span key={idx} className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.2 rounded bg-[#f6f3f2] text-[#707974]">
                    <Tag className="w-2.5 h-2.5 text-[#775925]" /> {t}
                  </span>
                ))}
                <span className="text-[10px] text-[#707974] ml-auto">{note.createdAt}</span>
              </div>
            </div>
          ))}

          {filteredNotes.length === 0 && (
            <div className="p-8 text-center text-[#707974] space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-[#775925]/40" />
              <p className="font-serif-caslon text-sm font-semibold text-[#003527]">Notebook Empty</p>
              <p className="text-xs">Save verses, hadiths, or research notes to build your digital library.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
