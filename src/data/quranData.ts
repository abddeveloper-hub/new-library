import { Surah, Reciter } from '../types';

export const RECITERS: Reciter[] = [
  { id: 'alafasy', name: 'Sheikh Mishary Rashid Al-Afasy', style: 'Hafs an Asim', subfolder: 'Alafasy_128kbps' },
  { id: 'husary', name: 'Sheikh Mahmoud Khalil Al-Husary', style: 'Murattal', subfolder: 'Husary_128kbps' },
  { id: 'sudais', name: 'Sheikh Abdul Rahman Al-Sudais', style: 'Grand Mosque Makkah', subfolder: 'Sudais_128kbps' },
  { id: 'minshawi', name: 'Sheikh Mohamed Siddiq El-Minshawi', style: 'Murattal', subfolder: 'Minshawy_Murattal_128kbps' }
];

export const QURAN_SURAHS: Surah[] = [
  {
    number: 1,
    nameArabic: 'الفاتحة',
    nameTransliteration: 'Al-Fatiha',
    nameTranslation: 'The Opening',
    revelationType: 'Meccan',
    totalAyahs: 7,
    ayahs: [
      {
        numberInSurah: 1,
        globalNumber: 1,
        arabicText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
        transliteration: 'Bismillāhi r-raḥmāni r-raḥīm',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        juz: 1,
        page: 1,
        rootWords: [
          { word: 'بِسْمِ', root: 'س-م-و', transliteration: 'Bism', meaning: 'In the name of' },
          { word: 'ٱللَّهِ', root: 'إ-ل-ه', transliteration: 'Allah', meaning: 'The One Supreme God' },
          { word: 'ٱلرَّحْمَـٰنِ', root: 'ر-ح-م', transliteration: 'Ar-Rahman', meaning: 'The All-Encompassing Merciful' },
          { word: 'ٱلرَّحِيمِ', root: 'ر-ح-م', transliteration: 'Ar-Rahim', meaning: 'The Continuously Merciful' }
        ],
        tafsirShort: 'The opening invocation (Basmalah) declaring that all actions begin in the name of God, invoking His absolute mercy.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3'
      },
      {
        numberInSurah: 2,
        globalNumber: 2,
        arabicText: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
        transliteration: 'Al-ḥamdu lillāhi rabbi l-ʿālamīn',
        translation: '[All] praise is [due] to Allah, Lord of the worlds -',
        juz: 1,
        page: 1,
        rootWords: [
          { word: 'ٱلْحَمْدُ', root: 'ح-م-د', transliteration: 'Al-Hamd', meaning: 'All perfect praise and gratitude' },
          { word: 'رَبِّ', root: 'ر-ب-ب', transliteration: 'Rabb', meaning: 'Lord, Sustainer, Nurturer' },
          { word: 'ٱلْعَـٰلَمِينَ', root: 'ع-ل-م', transliteration: 'Al-Alamin', meaning: 'The realms of creation' }
        ],
        tafsirShort: 'Al-Hamd encompasses total love, reverence, and gratitude to Allah as the sole Creator and Sustainer of every existing realm.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3'
      },
      {
        numberInSurah: 3,
        globalNumber: 3,
        arabicText: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
        transliteration: 'Ar-raḥmāni r-raḥīm',
        translation: 'The Entirely Merciful, the Especially Merciful,',
        juz: 1,
        page: 1,
        rootWords: [
          { word: 'ٱلرَّحْمَـٰنِ', root: 'ر-ح-م', transliteration: 'Ar-Rahman', meaning: 'Merciful to all creation' },
          { word: 'ٱلرَّحِيمِ', root: 'ر-ح-م', transliteration: 'Ar-Rahim', meaning: 'Specific mercy for believers' }
        ],
        tafsirShort: 'Reiterating the dual attributes of Divine Mercy right after mentioning sovereignty over the cosmos to instill hope alongside awe.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3'
      },
      {
        numberInSurah: 4,
        globalNumber: 4,
        arabicText: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ',
        transliteration: 'Māliki yawmi d-dīn',
        translation: 'Sovereign of the Day of Recompense.',
        juz: 1,
        page: 1,
        rootWords: [
          { word: 'مَـٰلِكِ', root: 'م-ل-ك', transliteration: 'Malik', meaning: 'Absolute Master & King' },
          { word: 'يَوْمِ', root: 'ي-و-م', transliteration: 'Yawm', meaning: 'Day' },
          { word: 'ٱلدِّينِ', root: 'د-ي-ن', transliteration: 'Ad-Deen', meaning: 'Recompense, Judgment, Faith' }
        ],
        tafsirShort: 'Affirmation that ultimate justice and ownership belong exclusively to Allah on the Final Day.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3'
      },
      {
        numberInSurah: 5,
        globalNumber: 5,
        arabicText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        transliteration: 'Iyyāka naʿbudu wa-iyyāka nastaʿīn',
        translation: 'It is You we worship and You we ask for help.',
        juz: 1,
        page: 1,
        rootWords: [
          { word: 'نَعْبُدُ', root: 'ع-ب-د', transliteration: 'Na\'budu', meaning: 'We worship exclusively' },
          { word: 'نَسْتَعِينُ', root: 'ع-و-ن', transliteration: 'Nasta\'een', meaning: 'We seek divine aid' }
        ],
        tafsirShort: 'The central covenant of pure monotheism (Tawhid): dedicating all acts of devotion solely to God and relying only on His aid.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3'
      },
      {
        numberInSurah: 6,
        globalNumber: 6,
        arabicText: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
        transliteration: 'Ihdinā ṣ-ṣirāṭa l-mustaqīm',
        translation: 'Guide us to the straight path -',
        juz: 1,
        page: 1,
        rootWords: [
          { word: 'ٱهْدِنَا', root: 'ه-د-ي', transliteration: 'Ihdina', meaning: 'Guide us continuously' },
          { word: 'ٱلصِّرَٰطَ', root: 'ص-ر-ط', transliteration: 'As-Sirat', meaning: 'The clear highway' },
          { word: 'ٱلْمُسْتَقِيمَ', root: 'ق-و-م', transliteration: 'Al-Mustaqeem', meaning: 'Straight, steadfast' }
        ],
        tafsirShort: 'The most comprehensive supplication for guidance upon truth, clarity, and spiritual steadfastness.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3'
      },
      {
        numberInSurah: 7,
        globalNumber: 7,
        arabicText: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
        transliteration: 'Ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn',
        translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        juz: 1,
        page: 1,
        rootWords: [
          { word: 'أَنْعَمْتَ', root: 'ن-ع-م', transliteration: 'An\'amta', meaning: 'You bestowed grace' },
          { word: 'ٱلْمَغْضُوبِ', root: 'غ-ض-ب', transliteration: 'Al-Maghdub', meaning: 'Those evoking anger' },
          { word: 'ٱلضَّآلِّينَ', root: 'ض-ل-ل', transliteration: 'Ad-Daalleen', meaning: 'Those astray' }
        ],
        tafsirShort: 'Defining the straight path by the example of prophets, truthful believers, martyrs, and the righteous.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3'
      }
    ]
  },
  {
    number: 2,
    nameArabic: 'البقرة',
    nameTransliteration: 'Al-Baqarah',
    nameTranslation: 'The Cow (Ayat al-Kursi & Key Verses)',
    revelationType: 'Medinan',
    totalAyahs: 286,
    ayahs: [
      {
        numberInSurah: 255,
        globalNumber: 262,
        arabicText: 'ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ۠ وَلَا نَوْمٌ۠ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ',
        transliteration: 'Allāhu lā ilāha illā huwa l-ḥayyu l-qayyūm... (Ayat al-Kursi)',
        translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
        juz: 3,
        page: 42,
        rootWords: [
          { word: 'ٱلْحَىُّ', root: 'ح-ي-ي', transliteration: 'Al-Hayy', meaning: 'The Ever-Living' },
          { word: 'ٱلْقَيُّومُ', root: 'ق-و-م', transliteration: 'Al-Qayyum', meaning: 'The Self-Sustaining Originator' },
          { word: 'كُرْسِيُّهُ', root: 'ك-ر-س', transliteration: 'Kursiyyuhu', meaning: 'His Throne / Knowledge Authority' }
        ],
        tafsirShort: 'Ayat al-Kursi is regarded as the greatest single verse in the Quran, encapsulating the absolute divine majesty, infinite knowledge, and supreme protection of Allah.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3'
      },
      {
        numberInSurah: 285,
        globalNumber: 292,
        arabicText: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ',
        transliteration: 'Āmana r-rasūlu bimā unzila ilayhi mir rabbihi wa-l-mu\'minūn...',
        translation: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], "We make no distinction between any of His messengers." And they say, "We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the final destination."',
        juz: 3,
        page: 49,
        rootWords: [
          { word: 'آمَنَ', root: 'أ-م-ن', transliteration: 'Amana', meaning: 'Believed with conviction' },
          { word: 'سَمِعْنَا', root: 'س-م-ع', transliteration: 'Sami\'na', meaning: 'We listened attentibly' },
          { word: 'أَطَعْنَا', root: 'ط-و-ع', transliteration: 'Ata\'na', meaning: 'We submitted/obeyed' }
        ],
        tafsirShort: 'The opening of the celebrated final verses of Surah Al-Baqarah, declaring total faith in all divine revelations and messengers.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/292.mp3'
      }
    ]
  },
  {
    number: 36,
    nameArabic: 'يس',
    nameTransliteration: 'Ya-Sin',
    nameTranslation: 'Ya-Sin (Heart of the Quran)',
    revelationType: 'Meccan',
    totalAyahs: 83,
    ayahs: [
      {
        numberInSurah: 1,
        globalNumber: 3706,
        arabicText: 'يسٓ',
        transliteration: 'Yā-Sīn',
        translation: 'Ya, Seen.',
        juz: 22,
        page: 440,
        rootWords: [
          { word: 'يس', root: 'ح-ر-ف', transliteration: 'Ya-Sin', meaning: 'Mystic disjointed letters (Huruf Muqatta\'at)' }
        ],
        tafsirShort: 'Disjointed letters whose profound divine purpose and wisdom rest with Allah, serving as a sign of Quranic inimitability.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3706.mp3'
      },
      {
        numberInSurah: 2,
        globalNumber: 3707,
        arabicText: 'وَٱلْقُرْءَانِ ٱلْحَكِيمِ',
        transliteration: 'Wa-l-qur\'āni l-ḥakīm',
        translation: 'By the wise Quran,',
        juz: 22,
        page: 440,
        rootWords: [
          { word: 'ٱلْقُرْءَانِ', root: 'ق-ر-أ', transliteration: 'Al-Quran', meaning: 'The Recitation' },
          { word: 'ٱلْحَكِيمِ', root: 'ح-ك-م', transliteration: 'Al-Hakeem', meaning: 'Full of wisdom' }
        ],
        tafsirShort: 'An oath by the Holy Quran, attesting to its flawless divine wisdom and guidance for humanity.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3707.mp3'
      }
    ]
  },
  {
    number: 67,
    nameArabic: 'الملك',
    nameTransliteration: 'Al-Mulk',
    nameTranslation: 'The Sovereignty',
    revelationType: 'Meccan',
    totalAyahs: 30,
    ayahs: [
      {
        numberInSurah: 1,
        globalNumber: 5242,
        arabicText: 'تَبَـٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ',
        transliteration: 'Tabāraka lladhī biyadihi l-mulku wa-huwa ʿalā kulli shay\'in qadīr',
        translation: 'Blessed is He in whose hand is dominion, and He is over all things competent -',
        juz: 29,
        page: 562,
        rootWords: [
          { word: 'تَبَـٰرَكَ', root: 'ب-ر-ك', transliteration: 'Tabaraka', meaning: 'Exalted & Source of all Blessings' },
          { word: 'ٱلْمُلْكُ', root: 'م-ل-ك', transliteration: 'Al-Mulk', meaning: 'Absolute Sovereignty' }
        ],
        tafsirShort: 'Surah Al-Mulk shields its reciter from the trial of the grave, highlighting God\'s absolute mastery over life and death.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5242.mp3'
      }
    ]
  },
  {
    number: 112,
    nameArabic: 'الإخلاص',
    nameTransliteration: 'Al-Ikhlas',
    nameTranslation: 'Sincerity / Pure Monotheism',
    revelationType: 'Meccan',
    totalAyahs: 4,
    ayahs: [
      {
        numberInSurah: 1,
        globalNumber: 6222,
        arabicText: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
        transliteration: 'Qul huwa llāhu aḥad',
        translation: 'Say, "He is Allah, [who is] One,',
        juz: 30,
        page: 604,
        rootWords: [
          { word: 'أَحَدٌ', root: 'أ-ح-د', transliteration: 'Ahad', meaning: 'Indivisibly One' }
        ],
        tafsirShort: 'The purest definition of Monotheism (Tawhid al-Dhat), affirming Allah\'s absolute uncompromised oneness.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3'
      },
      {
        numberInSurah: 2,
        globalNumber: 6223,
        arabicText: 'ٱللَّهُ ٱلصَّمَدُ',
        transliteration: 'Allāhu ṣ-ṣamad',
        translation: 'Allah, the Eternal Refuge.',
        juz: 30,
        page: 604,
        rootWords: [
          { word: 'ٱلصَّمَدُ', root: 'ص-م-د', transliteration: 'As-Samad', meaning: 'Self-Sufficient, sought by all' }
        ],
        tafsirShort: 'As-Samad signifies the Master upon whom all creation relies for every need, while He stands independent of all.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3'
      },
      {
        numberInSurah: 3,
        globalNumber: 6224,
        arabicText: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        transliteration: 'Lam yalid wa-lam yūlad',
        translation: 'He neither begets nor is born,',
        juz: 30,
        page: 604,
        rootWords: [
          { word: 'يَلِدْ', root: 'و-ل-د', transliteration: 'Yalid', meaning: 'Begets offspring' }
        ],
        tafsirShort: 'Refuting any anthropomorphic concept of divine lineage or ancestry.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3'
      },
      {
        numberInSurah: 4,
        globalNumber: 6225,
        arabicText: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ',
        transliteration: 'Wa-lam yakun lahū kufuwan aḥad',
        translation: 'Nor is there to Him any equivalent."',
        juz: 30,
        page: 604,
        rootWords: [
          { word: 'كُفُوًا', root: 'ك-ف-أ', transliteration: 'Kufuwan', meaning: 'Equal, peer, comparable' }
        ],
        tafsirShort: 'Concluding that nothing in the entire universe bears resemblance or equality to God.',
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3'
      }
    ]
  }
];
