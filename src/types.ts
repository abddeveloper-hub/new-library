export type NavigationTab = 
  | 'quran'
  | 'hadith'
  | 'manuscripts'
  | 'root-dictionary'
  | 'ai-scholar'
  | 'memorization'
  | 'adhkar';

export interface Ayah {
  numberInSurah: number;
  globalNumber: number;
  arabicText: string;
  transliteration: string;
  translation: string;
  juz: number;
  page: number;
  rootWords?: {
    word: string;
    root: string;
    transliteration: string;
    meaning: string;
  }[];
  tafsirShort?: string;
  audioUrl?: string;
}

export interface Surah {
  number: number;
  nameArabic: string;
  nameTransliteration: string;
  nameTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  totalAyahs: number;
  ayahs: Ayah[];
}

export interface Hadith {
  id: string;
  collection: 'Sahih al-Bukhari' | 'Sahih Muslim' | 'Sunan an-Nasa\'i' | '40 Hadith Nawawi' | 'Riyadh as-Salihin';
  hadithNumber: number;
  chapterTitle: string;
  arabicText: string;
  englishTranslation: string;
  narrator: string;
  grade: 'Sahih' | 'Hasan' | 'Da\'if' | 'Muttafaq Alaih';
  topics: string[];
  scholarlyNotes?: string;
}

export interface Manuscript {
  id: string;
  titleArabic: string;
  titleEnglish: string;
  authorArabic: string;
  authorEnglish: string;
  category: 'Fiqh' | 'Aqeedah' | 'Tazkiyat al-Nafs' | 'Hadith Sciences' | 'Arabic Grammar';
  century: string;
  summary: string;
  coverImage: string;
  chapters: {
    chapterNumber: number;
    title: string;
    arabicMatn: string;
    englishTranslation: string;
    commentary: string;
  }[];
}

export interface RootDerivative {
  wordArabic: string;
  transliteration: string;
  meaning: string;
  grammaticalForm: string;
  quranFrequency: number;
}

export interface RootEntry {
  root: string;
  rootArabic: string;
  transliteration: string;
  primaryMeaning: string;
  occurrencesInQuran: number;
  derivatives: RootDerivative[];
  sampleVerses: {
    surah: number;
    ayah: number;
    surahName: string;
    textArabic: string;
    translation: string;
  }[];
  classicalLexiconNote: string;
}

export interface Flashcard {
  id: string;
  type: 'ayah' | 'hadith' | 'root';
  title: string;
  arabicText: string;
  translation: string;
  reference: string;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: string;
  masteryLevel: 'New' | 'Learning' | 'Reviewing' | 'Mastered';
  lastReviewed?: string;
}

export interface AdhkarItem {
  id: string;
  category: 'Morning' | 'Evening' | 'After Prayer' | 'Sleep' | 'General';
  titleArabic: string;
  titleTransliteration: string;
  translation: string;
  targetCount: number;
  currentCount: number;
  sourceReference: string;
  audioUrl?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: 'Quran' | 'Hadith' | 'Manuscript' | 'Root' | 'General';
  createdAt: string;
  updatedAt: string;
  referencedText?: string;
}

export interface Reciter {
  id: string;
  name: string;
  style: string;
  subfolder: string;
}

export interface ActiveAudioState {
  isPlaying: boolean;
  title: string;
  subtitle: string;
  audioUrl: string;
  currentTime: number;
  duration: number;
  reciterId: string;
  playbackRate: number;
}
