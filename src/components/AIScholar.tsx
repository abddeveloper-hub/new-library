import React, { useState, useEffect } from 'react';
import { NoteItem } from '../types';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  Bookmark, 
  Share2, 
  Check, 
  BrainCircuit, 
  Layers, 
  RefreshCw,
  Compass,
  FileText
} from 'lucide-react';

interface AIScholarProps {
  onSaveNote: (note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialQuery?: string;
}

export const AIScholar: React.FC<AIScholarProps> = ({
  onSaveNote,
  initialQuery
}) => {
  const [query, setQuery] = useState<string>(initialQuery || '');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; timestamp: string }[]>([
    {
      role: 'assistant',
      text: 'As-salāmu ʿalaykum. Welcome to the Sacred Knowledge AI Scholar Assistant. I am trained to assist you in exploring classical Sunni Quranic tafsir, Hadith sciences, Arabic lexicon roots, and Islamic jurisprudence. How may I serve your study today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Study Plan Generator Modal state
  const [isStudyPlanModalOpen, setIsStudyPlanModalOpen] = useState<boolean>(false);
  const [studyPlanTopic, setStudyPlanTopic] = useState<string>('Purification of the Heart (Tazkiyat al-Nafs)');
  const [studyPlanLevel, setStudyPlanLevel] = useState<string>('Intermediate');
  const [studyPlanDuration, setStudyPlanDuration] = useState<number>(4);
  const [generatedStudyPlan, setGeneratedStudyPlan] = useState<any>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);

  useEffect(() => {
    if (initialQuery) {
      handleSendQuery(initialQuery);
    }
  }, [initialQuery]);

  const promptChips = [
    'Explain Ayat al-Kursi in light of classical Tafsir Ibn Kathir',
    'What are the 3 conditions of sincere repentance (Tawbah)?',
    'Explain theHadith of Jibreel and the 3 levels of religion',
    'Analyze the Arabic root S-L-M and its spiritual meanings',
    'What is the difference between Sahih, Hasan, and Da\'if hadith?'
  ];

  const handleSendQuery = async (customText?: string) => {
    const textToSend = customText || query;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = {
      role: 'user' as const,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/scholar/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend })
      });
      const data = await res.json();

      const assistantMsg = {
        role: 'assistant' as const,
        text: data.answer || 'Apologies, I encountered an error retrieving the scholarly response.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'An error occurred while communicating with the AI Scholar server.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleBookmarkMessage = (userPrompt: string, answerText: string) => {
    onSaveNote({
      title: `AI Research: ${userPrompt.slice(0, 40)}...`,
      content: `Question: ${userPrompt}\n\nAI Scholar Answer:\n${answerText}`,
      tags: ['AI Scholar', 'Research Note'],
      category: 'General'
    });
  };

  const handleGenerateStudyPlan = async () => {
    setIsGeneratingPlan(true);
    setGeneratedStudyPlan(null);

    try {
      const res = await fetch('/api/scholar/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: studyPlanTopic,
          difficulty: studyPlanLevel,
          durationWeeks: studyPlanDuration
        })
      });
      const data = await res.json();
      setGeneratedStudyPlan(data);
    } catch (err) {
      console.error('Study plan generation error:', err);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/40 p-5 bg-arabesque flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-caslon text-2xl font-bold text-[#003527] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#775925]" />
            AI Scholar & Sacred Research Assistant
          </h2>
          <p className="text-sm text-[#404944]">
            Powered by Gemini 3.6 Flash for classical tafsir analysis, linguistic root inquiry, and customized study curricula.
          </p>
        </div>

        {/* Generate Study Plan Button */}
        <button
          onClick={() => setIsStudyPlanModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#003527] hover:bg-[#064e3b] text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Compass className="w-4 h-4 text-[#fdd494]" />
          <span>Generate Thematic Study Plan</span>
        </button>
      </div>

      {/* Suggested Query Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-semibold text-[#707974] shrink-0">Suggested Questions:</span>
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendQuery(chip)}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#064e3b] hover:text-white text-[#003527] border border-[#bfc9c3]/50 text-xs font-medium whitespace-nowrap transition-all"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Main Chat Stream Container */}
      <div className="bg-white rounded-xl shadow-sm border border-[#bfc9c3]/50 overflow-hidden flex flex-col h-[560px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            const userPromptText = !isUser && index > 0 ? messages[index - 1]?.text : '';

            return (
              <div
                key={index}
                className={`flex gap-3 max-w-4xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs ${
                  isUser ? 'bg-[#775925] text-white' : 'bg-[#003527] text-[#fdd494]'
                }`}>
                  {isUser ? 'U' : <Sparkles className="w-4 h-4" />}
                </div>

                {/* Message Content Bubble */}
                <div className={`space-y-2 rounded-xl p-4 text-sm leading-relaxed border ${
                  isUser
                    ? 'bg-[#003527] text-white border-[#064e3b]'
                    : 'bg-[#fcf9f8] text-[#1b1c1c] border-[#bfc9c3]/60'
                }`}>
                  <div className="flex items-center justify-between gap-4 text-[10px] text-[#707974] border-b border-black/5 pb-1">
                    <span className="font-semibold">{isUser ? 'Student' : 'AI Scholar Assistant'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Pre-formatted output text */}
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  {/* Action bar for Assistant messages */}
                  {!isUser && index > 0 && (
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/5">
                      <button
                        onClick={() => handleCopyMessage(msg.text, index)}
                        className="p-1 rounded text-[#707974] hover:text-[#003527] transition-colors"
                        title="Copy Response"
                      >
                        {copiedIndex === index ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleBookmarkMessage(userPromptText, msg.text)}
                        className="p-1 rounded text-[#707974] hover:text-[#775925] transition-colors"
                        title="Save to Notebook"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 mr-auto items-center text-xs text-[#707974] p-3 rounded-lg bg-[#f6f3f2] border border-[#bfc9c3]/40 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-[#003527]" />
              <span>Consulting classical tafsir and lexicon resources...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#fcf9f8] border-t border-[#bfc9c3]/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask the AI Scholar (e.g., 'Explain the linguistic origin of Ihsan')..."
              className="flex-1 px-4 py-3 text-sm bg-white border border-[#bfc9c3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003527] text-[#1b1c1c]"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-5 py-3 rounded-xl bg-[#003527] hover:bg-[#064e3b] disabled:opacity-50 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Thematic Study Plan Generator Modal */}
      {isStudyPlanModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-[#bfc9c3] space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#f0eded] pb-3">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-[#775925]" />
                <h3 className="font-serif-caslon text-xl font-bold text-[#003527]">
                  Generate Custom Study Plan
                </h3>
              </div>
              <button
                onClick={() => setIsStudyPlanModalOpen(false)}
                className="text-[#707974] hover:text-[#1b1c1c] font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Input Form Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-[#707974]">Topic / Theme</label>
                <input
                  type="text"
                  value={studyPlanTopic}
                  onChange={(e) => setStudyPlanTopic(e.target.value)}
                  className="w-full mt-1 p-2 text-xs bg-[#fcf9f8] border border-[#bfc9c3] rounded-lg text-[#1b1c1c]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#707974]">Target Level</label>
                <select
                  value={studyPlanLevel}
                  onChange={(e) => setStudyPlanLevel(e.target.value)}
                  className="w-full mt-1 p-2 text-xs bg-[#fcf9f8] border border-[#bfc9c3] rounded-lg text-[#1b1c1c]"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced Scholar">Advanced Scholar</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#707974]">Duration (Weeks)</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={studyPlanDuration}
                  onChange={(e) => setStudyPlanDuration(Number(e.target.value))}
                  className="w-full mt-1 p-2 text-xs bg-[#fcf9f8] border border-[#bfc9c3] rounded-lg text-[#1b1c1c]"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateStudyPlan}
              disabled={isGeneratingPlan}
              className="w-full py-2.5 rounded-lg bg-[#003527] hover:bg-[#064e3b] text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2"
            >
              {isGeneratingPlan ? <RefreshCw className="w-4 h-4 animate-spin text-[#fdd494]" /> : <Sparkles className="w-4 h-4 text-[#fdd494]" />}
              <span>{isGeneratingPlan ? 'Drafting Curriculum...' : 'Generate Study Curriculum'}</span>
            </button>

            {/* Generated Plan Display */}
            {generatedStudyPlan && (
              <div className="p-5 rounded-xl bg-[#fcf9f8] border border-[#bfc9c3]/60 space-y-4">
                <div>
                  <h4 className="font-serif-caslon text-lg font-bold text-[#003527]">
                    {generatedStudyPlan.title}
                  </h4>
                  <p className="text-xs text-[#404944] mt-1">{generatedStudyPlan.overview}</p>
                </div>

                {generatedStudyPlan.recommendedBooks && (
                  <div className="text-xs">
                    <span className="font-bold text-[#775925]">Recommended Primary Texts:</span>
                    <ul className="list-disc list-inside text-[#1b1c1c] mt-1 space-y-0.5">
                      {generatedStudyPlan.recommendedBooks.map((b: string, i: number) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weekly Modules */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs uppercase font-bold text-[#707974]">Weekly Modules Breakdown</span>
                  {generatedStudyPlan.weeklyModules?.map((mod: any, i: number) => (
                    <div key={i} className="p-3 bg-white rounded-lg border border-[#bfc9c3]/40 space-y-1 text-xs">
                      <div className="font-bold text-[#003527] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#775925] text-white flex items-center justify-center text-[10px]">
                          {mod.week}
                        </span>
                        <span>{mod.title}</span>
                      </div>
                      <p className="text-[#404944]">{mod.objective}</p>
                      <p className="text-[#775925] font-semibold">Practice: {mod.actionablePractice}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    onSaveNote({
                      title: `Study Curriculum: ${generatedStudyPlan.title}`,
                      content: JSON.stringify(generatedStudyPlan, null, 2),
                      tags: ['Curriculum', studyPlanTopic],
                      category: 'General'
                    });
                    setIsStudyPlanModalOpen(false);
                  }}
                  className="w-full py-2 rounded-lg bg-[#775925] hover:bg-[#775925]/90 text-white font-semibold text-xs shadow-xs"
                >
                  Save Study Plan to Notebook
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
