import { Manuscript } from '../types';

export const CLASSICAL_MANUSCRIPTS: Manuscript[] = [
  {
    id: 'm-nawawi-riyadh',
    titleArabic: 'رياض الصالحين من كلام سيد المرسلين',
    titleEnglish: 'Riyadh as-Salihin (Gardens of the Righteous)',
    authorArabic: 'الإمام يحيى بن شرف النووي',
    authorEnglish: 'Imam Abu Zakariya Yahya ibn Sharaf al-Nawawi (d. 676 AH / 1277 CE)',
    category: 'Tazkiyat al-Nafs',
    century: '7th Century AH / 13th Century CE',
    summary: 'A world-renowned classical compendium of ethical hadith guidance, covering spiritual discipline, character refinement, sincerity, patience, and social etiquette.',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Chapter 1: On Sincerity and Intention (Al-Ikhlas)',
        arabicMatn: 'باب الإخلاص وإحضار النية في جميع الأعمال والأقوال والأحوال الظاهرة والباطنة',
        englishTranslation: 'Chapter on Sincerity and Bringing Intention to Mind in All Deeds, Words, and Internal/External States.',
        commentary: 'Imam al-Nawawi opens his masterwork with intention to remind the scholar that knowledge without pure intention yields no spiritual weight.'
      },
      {
        chapterNumber: 2,
        title: 'Chapter 2: On Repentance (Al-Tawbah)',
        arabicMatn: 'باب التوبة، قال العلماء: التوبة واجبة من كل ذنب، فإن كانت المعصية بين العبد وبين الله تعالى لزمها ثلاثة شروط...',
        englishTranslation: 'Chapter on Repentance. Scholars state: Repentance is obligatory for every sin. If the sin is between the servant and God, three conditions are required: abandoning the sin, regretting it, and resolving never to return.',
        commentary: 'Repentance is the foundational gate of spiritual pathwork, restoring the mirror of the heart to its original luminous purity.'
      },
      {
        chapterNumber: 3,
        title: 'Chapter 3: On Steadfastness (Al-Sabr)',
        arabicMatn: 'باب الصبر، قال الله تعالى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا﴾',
        englishTranslation: 'Chapter on Patience and Steadfastness. Allah Exalted says: "O you who have believed, persevere and endure in patience..."',
        commentary: 'Sabr in Arabic classical lexicon is not passive endurance, but active restraint and courageous steadfastness in pursuing spiritual virtue.'
      }
    ]
  },
  {
    id: 'm-tahawi-aqeedah',
    titleArabic: 'العقيدة الطحاوية',
    titleEnglish: 'Al-Aqeedah al-Tahawiyyah (The Creed of Imam al-Tahawi)',
    authorArabic: 'الإمام أبو جعفر أحمد بن محمد الطحاوي',
    authorEnglish: 'Imam Abu Ja\'far Ahmad ibn Muhammad al-Tahawi (d. 321 AH / 933 CE)',
    category: 'Aqeedah',
    century: '4th Century AH / 10th Century CE',
    summary: 'The classic baseline exposition of Orthodox Sunni Theology (Ahl al-Sunnah wal-Jama\'ah), respected by all major classical schools of jurisprudence.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Section 1: The Divine Oneness & Transcendence',
        arabicMatn: 'نقول في توحيد الله معتقدين بتوفيق الله: إن الله واحد لا شريك له، ولا شيء مثله، ولا شيء يعجزه، ولا إله غيره.',
        englishTranslation: 'We state regarding the Oneness of God, believing by God\'s grace: Allah is One without partner; nothing is like unto Him, nothing renders Him helpless, and there is no deity worthy of worship besides Him.',
        commentary: 'Formulates the absolute transcendent unity (Tawhid) free from human limitation or temporal change.'
      },
      {
        chapterNumber: 2,
        title: 'Section 2: Divine Attributes & Eternity',
        arabicMatn: 'قديم بلا إبتداء، دائم بلا انتهاء، لا يفنى ولا يبيد، ولا يكون إلا ما يريد.',
        englishTranslation: 'He is Eternal without beginning, Enduring without end; He never perishes nor passes away, and nothing transpires except by His sovereign will.',
        commentary: 'Affirms that God\'s existence is necessary and uncaused, defying creaturely beginnings or endings.'
      }
    ]
  },
  {
    id: 'm-ajurrumiyyah',
    titleArabic: 'الآجرومية في علم العربية',
    titleEnglish: 'Matn Al-Ajurrumiyyah (Grammar Primer)',
    authorArabic: 'الإمام ابن آجروم الصنهاجي',
    authorEnglish: 'Imam Abu Abdillah Muhammad ibn Ajurrum al-Sanhaji (d. 723 AH / 1323 CE)',
    category: 'Arabic Grammar',
    century: '8th Century AH / 14th Century CE',
    summary: 'The universal foundational manuscript for mastering Arabic syntax (Nahw) and understanding Quranic linguistic structures.',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Chapter 1: Definition of Speech (Al-Kalam)',
        arabicMatn: 'الكلام: هو اللفظ المركب المفيد بالوضع، وأقسامه ثلاثة: اسم، وفعل، وحرف جاء لمعنى.',
        englishTranslation: 'Speech (Al-Kalam) is meaningful composed vocal expression. Its constituent parts are three: Noun (Ism), Verb (Fi\'l), and Particle (Harf) signifying a meaning.',
        commentary: 'Establishes the foundational tri-part classification of all words in classical Arabic rhetoric and grammar.'
      }
    ]
  },
  {
    id: 'm-ghazali-bidayah',
    titleArabic: 'بداية الهداية',
    titleEnglish: 'Bidayat al-Hidayah (The Beginning of Guidance)',
    authorArabic: 'حجة الإسلام الإمام أبو حامد الغزالي',
    authorEnglish: 'Hujjat al-Islam Imam Abu Hamid al-Ghazali (d. 505 AH / 1111 CE)',
    category: 'Tazkiyat al-Nafs',
    century: '6th Century AH / 12th Century CE',
    summary: 'A practical spiritual guide on daily devotion, etiquette of sacred knowledge, guarding the senses, and cultivating inner purity.',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Chapter 1: On the Conduct of Seeking Sacred Knowledge',
        arabicMatn: 'اعلم أن العلم هو أصل الهداية، والنية في طلبه هي روح العمل. فمن طلب العلم للمباهاة والمنافسة فقد خسر خسراناً مبيناً.',
        englishTranslation: 'Know that sacred knowledge is the root of guidance, and intention in seeking it is the spirit of action. Whoever seeks knowledge for boasting or rivalry has incurred a manifest loss.',
        commentary: 'Imam al-Ghazali warns against using knowledge as an instrument of ego, calling the scholar back to humble service.'
      }
    ]
  }
];
