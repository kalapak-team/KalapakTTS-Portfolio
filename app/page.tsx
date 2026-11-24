"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  AudioWaveform,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  Clock3,
  Gauge,
  Globe2,
  Headphones,
  History,
  Layers3,
  Laptop,
  MapPin,
  Menu,
  Mic2,
  Monitor,
  Moon,
  Play,
  Radio,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Terminal,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

type Language = "en" | "km";
type ThemePreference = "light" | "dark" | "system";
const preferenceEvent = "kalapak-preference-change";
const navLinkClass =
  "nav-link rounded-md px-2 py-1 transition-colors hover:bg-accent/10 hover:text-[#b8a7ff] hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

function subscribeToPreferences(callback: () => void) {
  window.addEventListener(preferenceEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(preferenceEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSavedLanguage(): Language {
  return window.localStorage.getItem("kalapak-language") === "km" ? "km" : "en";
}

function getSavedTheme(): ThemePreference {
  const savedTheme = window.localStorage.getItem("kalapak-theme");
  return savedTheme === "light" || savedTheme === "system" ? savedTheme : "dark";
}

function subscribeToSystemTheme(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSystemThemeSnapshot() {
  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

function savePreference(key: string, value: string) {
  window.localStorage.setItem(key, value);
  window.dispatchEvent(new Event(preferenceEvent));
}

const voices = [
  { name: "Sreypov", color: "from-rose-300 to-orange-200" },
  { name: "Dara", color: "from-sky-300 to-indigo-300" },
  { name: "Sokha", color: "from-violet-300 to-fuchsia-200" },
  { name: "Bora", color: "from-amber-200 to-rose-300" },
];

const voiceDetails: Record<Language, Record<string, string>> = {
  en: {
    Sreypov: "Warm · Female",
    Dara: "Bright · Male",
    Sokha: "Calm · Female",
    Bora: "Steady · Male",
  },
  km: {
    Sreypov: "កក់ក្តៅ · ស្រី",
    Dara: "រស់រវើក · ប្រុស",
    Sokha: "ស្ងប់ស្ងាត់ · ស្រី",
    Bora: "នឹងនរ · ប្រុស",
  },
};

const translations = {
  en: {
    nav: {
      studio: "Studio",
      voices: "Voices",
      features: "Features",
      howItWorks: "How it works",
      about: "About",
      download: "Download",
      home: "KalapakTTS home",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      eyebrow: "Open source for Khmer",
      title: "Khmer words,",
      titleAccent: "beautifully spoken.",
      description:
        "An open-source Khmer text-to-speech studio for learners and creators. Turn your writing into expressive, natural-sounding speech with a tool built to be shared and improved by everyone.",
      windows: "Windows",
      comingSoon: "Coming soon",
    },
    studio: {
      title: "Text to speech",
      language: "KHMER",
      backend: "Backend connection required",
      script: "Your script",
      chooseVoice: "Choose a voice",
      exploreVoices: "Explore voices",
      generate: "Generate speech",
      pace: "Speaking pace",
      quality: "Inference quality",
      relaxed: "Relaxed",
      natural: "Natural",
      brisk: "Brisk",
      fast: "Fast",
      standard: "Standard",
      high: "High",
      audioPreview: "Audio preview requires the backend",
      generateToPreview: "Generate to preview",
      note: "Style and pace guide the model; results may vary. Audio preview is available when connected to the VoxCPM2 backend.",
      notice: "Connect the KalapakTTS API to generate and save real speech.",
    },
    features: {
      eyebrow: "Made for your words",
      title: "Everything you need to find your voice.",
      description:
        "A calm, focused workspace for turning your Khmer writing into speech that feels like you.",
      cards: [
        ["Khmer-first voices", "Natural-sounding speech built to bring Khmer words to life."],
        ["Make it your own", "Fine-tune speaking style, pace, and generation quality."],
        ["Your work, in one place", "Revisit, replay, and organize your recent generations."],
        ["Stream as it speaks", "Follow generation progress and listen chunk by chunk."],
      ],
      discover: "Discover the studio",
    },
    about: {
      eyebrow: "About · អំពីយើង",
      title: "Built for learners, open to everyone.",
      paragraph:
        "KalapakTTS is a Khmer text-to-speech studio made by Kalapak Code Team, a group of full-stack developers from Cambodia. We started it for students and learners who deserve tools that speak their own language. Whether you are studying, practicing, or creating something new, we want Khmer to sound natural on every screen.",
      open:
        "KalapakTTS is open source. Anyone can use it, learn from it, and help improve it. Our team believes knowledge grows when it is shared.",
      cards: [
        ["For students", "Listen to lessons, notes, and stories in clear Khmer."],
        ["Open source", "Free to explore, study, and contribute to."],
        ["Made in Cambodia", "Built by Kalapak Code Team, since 2024."],
      ],
      khmerTitle: "Built for learners, open to everyone.",
      khmerParagraph:
        "KalapakTTS គឺជាស្ទូឌីយោបម្លែងអត្ថបទទៅជាសំឡេងសម្រាប់ភាសាខ្មែរ ដែលបង្កើតឡើងដោយក្រុម Kalapak Code Team ជាក្រុមអ្នកអភិវឌ្ឍន៍ពីកម្ពុជា។ យើងបង្កើតកម្មវិធីនេះសម្រាប់សិស្ស និស្សិត ដែលសមនឹងទទួលបានឧបករណ៍ដែលនិយាយភាសារបស់ខ្លួន។ មិនថាកំពុងរៀន ហាត់អាន ឬបង្កើតអ្វីថ្មី យើងចង់ឱ្យភាសាខ្មែរស្តាប់ទៅធម្មជាតិនៅគ្រប់អេក្រង់។",
      khmerOpen:
        "KalapakTTS ជា open source ដែលអ្នកណាក៏អាចប្រើ សិក្សា និងចូលរួមកែលម្អបាន ព្រោះយើងជឿថាចំណេះដឹងរីកចម្រើនពេលយើងចែករំលែក។",
      quote: "ជីវិតដែលរស់នៅដើម្បីអ្នកដទៃ ទើបជាជីវិតដែលមានតម្លៃ។",
      github: "View on GitHub",
    },
    voicesSection: {
      eyebrow: "Voices with character",
      title: "Find the voice that sounds like you.",
      description:
        "Choose a voice to set the feeling of every sentence. Explore different tones for stories, learning, and everyday listening.",
      choose: "Choose a voice",
      sample: "Voice sample",
      preview: "Audio samples require the backend",
      language: "Khmer",
    },
    steps: {
      eyebrow: "A simpler way to speak",
      title: "From words to waveform.",
      cards: [
        ["Write your script", "Add your Khmer text to the studio. Keep it short or build a longer story."],
        ["Choose your sound", "Pick a voice, set your pace, and select the quality that suits your project."],
        ["Listen and refine", "Generate speech, follow progress, and return to your saved audio whenever you need it."],
      ],
    },
    closing: {
      title: "Give your words a voice.",
      description: "Start with a sentence. Make something you’re proud to share.",
      button: "Open KalapakTTS",
    },
    footer: {
      description: "Khmer text-to-speech, thoughtfully powered by VoxCPM2.",
      openSource: "Made for open source",
      copyright: "© 2026 KalapakTTS · by Kalapak Code Team",
      tagline: "Every word deserves a voice.",
    },
    preferences: {
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System",
    },
  },
  km: {
    nav: {
      studio: "ស្ទូឌីយោ",
      voices: "សំឡេង",
      features: "មុខងារ",
      howItWorks: "របៀបប្រើ",
      about: "អំពីយើង",
      download: "ទាញយក",
      home: "ទំព័រដើម KalapakTTS",
      openMenu: "បើកម៉ឺនុយ",
      closeMenu: "បិទម៉ឺនុយ",
    },
    hero: {
      eyebrow: "ប្រភពបើកចំហសម្រាប់ភាសាខ្មែរ",
      title: "អត្ថបទខ្មែរ",
      titleAccent: "បន្លឺជាសំឡេងធម្មជាតិ។",
      description:
        "ស្ទូឌីយោបម្លែងអត្ថបទខ្មែរទៅជាសំឡេង ដែលមានប្រភពបើកចំហ និងបង្កើតសម្រាប់អ្នករៀននិងអ្នកបង្កើតមាតិកា។ បម្លែងអត្ថបទរបស់អ្នកទៅជាសំឡេងធម្មជាតិ ហើយចូលរួមកែលម្អឧបករណ៍នេះសម្រាប់ទាំងអស់គ្នា។",
      windows: "Windows",
      comingSoon: "ឆាប់ៗនេះ",
    },
    studio: {
      title: "អត្ថបទទៅជាសំឡេង",
      language: "ខ្មែរ",
      backend: "ត្រូវការតភ្ជាប់ទៅម៉ាស៊ីនមេ",
      script: "អត្ថបទរបស់អ្នក",
      chooseVoice: "ជ្រើសរើសសំឡេង",
      exploreVoices: "មើលសំឡេង",
      generate: "បង្កើតសំឡេង",
      pace: "ល្បឿននិយាយ",
      quality: "គុណភាពបង្កើត",
      relaxed: "យឺត",
      natural: "ធម្មជាតិ",
      brisk: "លឿន",
      fast: "រហ័ស",
      standard: "ស្តង់ដារ",
      high: "ខ្ពស់",
      audioPreview: "ការស្តាប់សំឡេងត្រូវការម៉ាស៊ីនមេ",
      generateToPreview: "បង្កើតដើម្បីស្តាប់",
      note: "រចនាប័ទ្ម និងល្បឿនជួយណែនាំម៉ូដែល ប៉ុន្តែលទ្ធផលអាចខុសគ្នា។ ការស្តាប់សំឡេងអាចប្រើបាននៅពេលតភ្ជាប់ទៅម៉ាស៊ីនមេ VoxCPM2។",
      notice: "តភ្ជាប់ KalapakTTS API ដើម្បីបង្កើត និងរក្សាទុកសំឡេងពិត។",
    },
    features: {
      eyebrow: "បង្កើតឡើងសម្រាប់ពាក្យរបស់អ្នក",
      title: "អ្វីៗគ្រប់យ៉ាងដែលអ្នកត្រូវការ ដើម្បីស្វែងរកសំឡេងផ្ទាល់ខ្លួន។",
      description:
        "កន្លែងធ្វើការដែលផ្តោតលើការបម្លែងអត្ថបទខ្មែររបស់អ្នកទៅជាសំឡេងដែលមានលក្ខណៈផ្ទាល់ខ្លួន។",
      cards: [
        ["សំឡេងផ្តោតលើភាសាខ្មែរ", "សំឡេងធម្មជាតិដែលធ្វើឱ្យពាក្យខ្មែររស់រវើក។"],
        ["កំណត់តាមចំណូលចិត្ត", "កែសម្រួលរចនាប័ទ្ម ល្បឿន និងគុណភាពសំឡេង។"],
        ["រក្សាទុកនៅកន្លែងតែមួយ", "ស្តាប់ឡើងវិញ និងរៀបចំសំឡេងដែលអ្នកបានបង្កើត។"],
        ["ស្តាប់ពេលកំពុងបង្កើត", "តាមដានដំណើរការ និងស្តាប់សំឡេងជាផ្នែកៗ។"],
      ],
      discover: "ស្វែងយល់ពីស្ទូឌីយោ",
    },
    about: {
      eyebrow: "អំពីយើង",
      title: "បង្កើតសម្រាប់អ្នករៀន ហើយបើកចំហសម្រាប់ទាំងអស់គ្នា។",
      paragraph:
        "KalapakTTS គឺជាស្ទូឌីយោបម្លែងអត្ថបទទៅជាសំឡេងសម្រាប់ភាសាខ្មែរ ដែលបង្កើតឡើងដោយក្រុម Kalapak Code Team ជាក្រុមអ្នកអភិវឌ្ឍន៍ពីកម្ពុជា។ យើងបង្កើតកម្មវិធីនេះសម្រាប់សិស្ស និស្សិត ដែលសមនឹងទទួលបានឧបករណ៍ដែលនិយាយភាសារបស់ខ្លួន។ មិនថាកំពុងរៀន ហាត់អាន ឬបង្កើតអ្វីថ្មី យើងចង់ឱ្យភាសាខ្មែរស្តាប់ទៅធម្មជាតិនៅគ្រប់អេក្រង់។",
      open:
        "KalapakTTS ជា open source ដែលអ្នកណាក៏អាចប្រើ សិក្សា និងចូលរួមកែលម្អបាន ព្រោះយើងជឿថាចំណេះដឹងរីកចម្រើនពេលយើងចែករំលែក។",
      cards: [
        ["សម្រាប់សិស្សនិស្សិត", "ស្តាប់មេរៀន កំណត់ត្រា និងរឿងជាភាសាខ្មែរច្បាស់ៗ។"],
        ["ប្រភពបើកចំហ", "អាចស្វែងយល់ សិក្សា និងចូលរួមអភិវឌ្ឍបានដោយសេរី។"],
        ["បង្កើតនៅកម្ពុជា", "បង្កើតដោយ Kalapak Code Team តាំងពីឆ្នាំ ២០២៤។"],
      ],
      khmerTitle: "បង្កើតសម្រាប់អ្នករៀន ហើយបើកចំហសម្រាប់ទាំងអស់គ្នា។",
      khmerParagraph:
        "KalapakTTS គឺជាស្ទូឌីយោបម្លែងអត្ថបទទៅជាសំឡេងសម្រាប់ភាសាខ្មែរ ដែលបង្កើតឡើងដោយក្រុម Kalapak Code Team ជាក្រុមអ្នកអភិវឌ្ឍន៍ពីកម្ពុជា។ យើងបង្កើតកម្មវិធីនេះសម្រាប់សិស្ស និស្សិត ដែលសមនឹងទទួលបានឧបករណ៍ដែលនិយាយភាសារបស់ខ្លួន។ មិនថាកំពុងរៀន ហាត់អាន ឬបង្កើតអ្វីថ្មី យើងចង់ឱ្យភាសាខ្មែរស្តាប់ទៅធម្មជាតិនៅគ្រប់អេក្រង់។",
      khmerOpen:
        "KalapakTTS ជា open source ដែលអ្នកណាក៏អាចប្រើ សិក្សា និងចូលរួមកែលម្អបាន ព្រោះយើងជឿថាចំណេះដឹងរីកចម្រើនពេលយើងចែករំលែក។",
      quote: "ជីវិតដែលរស់នៅដើម្បីអ្នកដទៃ ទើបជាជីវិតដែលមានតម្លៃ។",
      github: "មើលនៅលើ GitHub",
    },
    voicesSection: {
      eyebrow: "សំឡេងដែលមានលក្ខណៈពិសេស",
      title: "ស្វែងរកសំឡេងដែលត្រូវនឹងអ្នក។",
      description:
        "ជ្រើសរើសសំឡេងដែលស័ក្តិសមនឹងអត្ថន័យនៃប្រយោគនីមួយៗ។ សាកល្បងសំឡេងផ្សេងៗសម្រាប់រឿង ការរៀន និងការស្តាប់ប្រចាំថ្ងៃ។",
      choose: "ជ្រើសរើសសំឡេង",
      sample: "គំរូសំឡេង",
      preview: "ការស្តាប់សំឡេងត្រូវការម៉ាស៊ីនមេ",
      language: "ខ្មែរ",
    },
    steps: {
      eyebrow: "វិធីងាយស្រួលក្នុងការបង្កើតសំឡេង",
      title: "ពីអត្ថបទទៅជារលកសំឡេង។",
      cards: [
        ["សរសេរអត្ថបទ", "បញ្ចូលអត្ថបទខ្មែររបស់អ្នកទៅក្នុងស្ទូឌីយោ។ អាចសរសេរខ្លី ឬបង្កើតជារឿងវែង។"],
        ["ជ្រើសរើសសំឡេង", "ជ្រើសរើសសំឡេង កំណត់ល្បឿន និងគុណភាពឱ្យសមនឹងគម្រោងរបស់អ្នក។"],
        ["ស្តាប់ និងកែសម្រួល", "បង្កើតសំឡេង តាមដានដំណើរការ ហើយត្រឡប់មកស្តាប់ម្ដងទៀតនៅពេលណាក៏បាន។"],
      ],
    },
    closing: {
      title: "ផ្តល់សំឡេងដល់ពាក្យរបស់អ្នក។",
      description: "ចាប់ផ្តើមពីមួយប្រយោគ ហើយបង្កើតអ្វីដែលអ្នកមានមោទនភាពចែករំលែក។",
      button: "បើក KalapakTTS",
    },
    footer: {
      description: "បម្លែងអត្ថបទខ្មែរទៅជាសំឡេង ដោយប្រើ VoxCPM2។",
      openSource: "បង្កើតជាប្រភពបើកចំហ",
      copyright: "© ២០២៦ KalapakTTS · ដោយ Kalapak Code Team",
      tagline: "គ្រប់ពាក្យទាំងអស់សមនឹងមានសំឡេង។",
    },
    preferences: {
      language: "ភាសា",
      theme: "រូបរាង",
      light: "ភ្លឺ",
      dark: "ងងឹត",
      system: "តាមប្រព័ន្ធ",
    },
  },
} as const;

const bars = [
  11, 18, 26, 17, 33, 23, 14, 21, 37, 28, 16, 24, 39, 29, 19, 34, 22, 14, 27,
  38, 23, 17, 31, 20, 13, 25, 36, 22, 30, 18, 12, 27, 38, 24, 17, 32, 21, 13,
  28, 36, 19, 26, 15, 33, 23, 14, 29, 38, 21, 17, 30, 22, 12, 26, 35, 18, 28,
  16, 33, 23, 14, 27, 37, 20, 31, 18, 12, 25, 35, 22, 16, 30, 20, 13, 27, 37,
  23, 17, 32, 21, 14, 29, 37, 20, 25, 16, 33, 22, 13, 28, 36, 19, 30, 17, 12,
  26, 35, 22, 16, 31, 20, 14, 28, 38, 23, 18, 32, 20, 13, 27, 36, 21, 15, 29,
  37, 22, 17, 30, 20, 12, 27, 36, 22, 16, 31, 19, 13, 28,
];

const features = [
  {
    icon: AudioWaveform,
  },
  {
    icon: SlidersHorizontal,
  },
  {
    icon: History,
  },
  {
    icon: Radio,
  },
];

function Waveform({ active = false }: { active?: boolean }) {
  return (
    <div className="flex h-10 min-w-0 flex-1 items-center gap-[3px] overflow-hidden" aria-hidden="true">
      {bars.map((height, index) => (
        <span
          className={`wave-bar w-[3px] shrink-0 rounded-full ${
            active ? "bg-accent" : "bg-white/25"
          }`}
          key={index}
          style={{ height: `${height}px`, animationDelay: `${(index % 13) * -0.09}s` }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const language = useSyncExternalStore<Language>(
    subscribeToPreferences,
    getSavedLanguage,
    () => "en",
  );
  const theme = useSyncExternalStore<ThemePreference>(
    subscribeToPreferences,
    getSavedTheme,
    () => "dark",
  );
  const systemPrefersLight = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    () => false,
  );
  const resolvedTheme =
    theme === "system" ? (systemPrefersLight ? "light" : "dark") : theme;
  const [text, setText] = useState(
    "សួស្តី! សូមស្វាគមន៍មកកាន់ KalapakTTS។ បម្លែងអត្ថបទខ្មែររបស់អ្នកទៅជាសំឡេងធម្មជាតិបានយ៉ាងងាយស្រួល។",
  );
  const [selectedVoice, setSelectedVoice] = useState("Sreypov");
  const [pace, setPace] = useState("natural");
  const [quality, setQuality] = useState("standard");
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState<"language" | "theme" | null>(
    null,
  );
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = resolvedTheme;
  }, [language, resolvedTheme]);

  const showBackendNotice = () => {
    setNotice(t.studio.notice);
    window.setTimeout(() => setNotice(""), 4200);
  };

  return (
    <main className="relative min-h-screen overflow-hidden" data-theme={resolvedTheme}>
      <div className="grid-glow pointer-events-none absolute inset-x-0 top-0 h-[1000px]" />

      <header className="sticky top-0 z-30 px-4 pt-4">
        <nav className="relative mx-auto flex h-[62px] max-w-[1120px] items-center justify-between rounded-full border border-white/[0.07] bg-[#17161be8] px-5 shadow-[0_12px_42px_rgba(0,0,0,0.28)] backdrop-blur-xl md:px-7">
          <a aria-label="KalapakTTS home" className="flex items-center" href="#home">
            <Image
              alt="KalapakTTS"
              className={`h-[42px] w-[168px] object-cover object-center sm:h-[54px] sm:w-[216px] ${
                resolvedTheme === "light" ? "translate-y-1" : "translate-y-0"
              }`}
              height={941}
              priority
              src={resolvedTheme === "light" ? "/kalapaktts-logo-black.png" : "/kalapaktts-logo-white.png"}
              width={1672}
            />
          </a>
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-[13px] text-white/65 lg:flex">
            <a className={navLinkClass} href="#studio">{t.nav.studio}</a>
            <a className={navLinkClass} href="#voices">{t.nav.voices}</a>
            <a className={navLinkClass} href="#features">{t.nav.features}</a>
            <a className={navLinkClass} href="#how-it-works">{t.nav.howItWorks}</a>
            <a className={navLinkClass} href="#about">{t.nav.about}</a>
            <a className={navLinkClass} href="#download">{t.nav.download}</a>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                aria-expanded={openPopover === "language"}
                aria-label={t.preferences.language}
                className="flex h-9 items-center gap-2 rounded-full bg-white/[0.06] px-3 text-white/70 transition hover:bg-white/[0.1] hover:text-white"
                onClick={() =>
                  setOpenPopover(openPopover === "language" ? null : "language")
                }
              >
                <Globe2 size={16} />
                <span className="text-xs">{language === "en" ? "EN" : "ខ្មែរ"}</span>
              </button>
              {openPopover === "language" && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-48 rounded-2xl border border-white/10 bg-[#17161b] p-2 shadow-2xl">
                  {[
                    { code: "en" as const, flag: "fi-gb", label: "English" },
                    { code: "km" as const, flag: "fi-kh", label: "ខ្មែរ" },
                  ].map((option) => (
                    <button
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        language === option.code
                          ? "bg-white/[0.08] text-white"
                          : "text-white/65 hover:bg-white/[0.05] hover:text-white"
                      }`}
                      key={option.code}
                      onClick={() => {
                        savePreference("kalapak-language", option.code);
                        setOpenPopover(null);
                      }}
                    >
                      <span aria-hidden="true" className={`fi ${option.flag} rounded-sm`} />
                      <span className="flex-1">{option.label}</span>
                      {language === option.code && <Check size={15} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                aria-expanded={openPopover === "theme"}
                aria-label={t.preferences.theme}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/70 transition hover:bg-white/[0.1] hover:text-white"
                onClick={() =>
                  setOpenPopover(openPopover === "theme" ? null : "theme")
                }
              >
                {resolvedTheme === "light" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              {openPopover === "theme" && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-48 rounded-2xl border border-white/10 bg-[#17161b] p-2 shadow-2xl">
                  {[
                    { value: "light" as const, icon: Sun, label: t.preferences.light },
                    { value: "dark" as const, icon: Moon, label: t.preferences.dark },
                    { value: "system" as const, icon: Monitor, label: t.preferences.system },
                  ].map(({ value, icon: Icon, label }) => (
                    <button
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        theme === value
                          ? "bg-white/[0.08] text-white"
                          : "text-white/65 hover:bg-white/[0.05] hover:text-white"
                      }`}
                      key={value}
                      onClick={() => {
                        savePreference("kalapak-theme", value);
                        setOpenPopover(null);
                      }}
                    >
                      <Icon size={16} />
                      <span className="flex-1">{label}</span>
                      {theme === value && <Check size={15} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-white lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="mx-auto mt-2 grid max-w-[1120px] gap-1 rounded-3xl border border-white/10 bg-[#17161b] p-3 lg:hidden">
            {[
              [t.nav.studio, "#studio"],
              [t.nav.voices, "#voices"],
              [t.nav.features, "#features"],
              [t.nav.howItWorks, "#how-it-works"],
              [t.nav.about, "#about"],
              [t.nav.download, "#download"],
            ].map(([label, href]) => (
              <a
                className="rounded-2xl px-4 py-3 text-sm text-white/75 hover:bg-white/[0.06]"
                href={href}
                key={label}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      <section className="relative px-4 pb-20 pt-[76px] md:pb-28 md:pt-[112px]" id="home">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.09] px-3.5 py-2 text-xs font-medium text-[#c5b8ff]">
            <Sparkles size={14} />
            {t.hero.eyebrow}
          </div>
          <h1 className="mx-auto max-w-[850px] text-[clamp(2.8rem,8vw,5.75rem)] font-semibold leading-[0.99] tracking-[-0.065em] text-[#f6f4fb]">
            {t.hero.title}
            <br />
            <span className="bg-gradient-to-r from-[#cbbfff] via-[#9b84f1] to-[#7158d2] bg-clip-text text-transparent">
              {t.hero.titleAccent}
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-[620px] text-base leading-7 text-[#aaa6b5] md:text-[18px] md:leading-8">
            {t.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3" id="download">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-[#8b74e6] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(139,116,230,0.28)] transition hover:bg-[#9b85ef]"
              href="#studio"
            >
              <Monitor aria-hidden="true" size={16} />
              {t.hero.windows} <ArrowRight size={16} />
            </a>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-5 py-3.5 text-sm font-medium text-white/80">
              <Laptop aria-hidden="true" size={15} />
              <span>macOS</span>
              <span className="rounded-full bg-accent/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#c8bbff]">
                {t.hero.comingSoon}
              </span>
            </div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-5 py-3.5 text-sm font-medium text-white/80">
              <Terminal aria-hidden="true" size={15} />
              <span>Linux</span>
              <span className="rounded-full bg-accent/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#c8bbff]">
                {t.hero.comingSoon}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-[920px] md:mt-[72px]" id="studio">
          <div className="overflow-hidden rounded-[26px] border border-white/[0.085] bg-[#151419] shadow-[0_30px_100px_rgba(0,0,0,0.38)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 md:px-7">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-[#b8a7ff]">
                  <AudioLines size={16} />
                </span>
                <span className="text-sm font-semibold">{t.studio.title}</span>
                <span className="hidden rounded-full border border-white/[0.08] px-2.5 py-1 text-[10px] text-white/40 sm:inline">
                  {t.studio.language}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                {t.studio.backend}
              </div>
            </div>

            <div className="px-5 pb-5 pt-4 md:px-7 md:pb-6">
              <div className="mb-3 flex items-center justify-between text-xs text-white/45">
                <span>{t.studio.script}</span>
                <span>{text.length} / 500</span>
              </div>
              <textarea
                aria-label={t.studio.script}
                className="min-h-[170px] w-full resize-y rounded-2xl border border-white/[0.07] bg-[#100f13] p-4 text-[16px] leading-8 text-[#e9e6f0] outline-none transition placeholder:text-white/25 focus:border-accent/50 md:min-h-[185px] md:p-5 md:text-[17px]"
                maxLength={500}
                onChange={(event) => setText(event.target.value)}
                value={text}
              />

              <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="min-w-0">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/55">{t.studio.chooseVoice}</span>
                    <button className="inline-flex items-center gap-1 text-xs text-[#b9a9ff] transition hover:text-white" onClick={() => document.getElementById("voices")?.scrollIntoView({ behavior: "smooth" })}>
                      {t.studio.exploreVoices} <ArrowRight size={13} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {voices.map((voice) => (
                      <button
                        aria-pressed={selectedVoice === voice.name}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition ${
                          selectedVoice === voice.name
                            ? "border-accent/50 bg-accent/15 text-white"
                            : "border-white/[0.07] bg-white/[0.025] text-white/65 hover:bg-white/[0.07]"
                        }`}
                        key={voice.name}
                        onClick={() => setSelectedVoice(voice.name)}
                      >
                        <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${voice.color}`} />
                        {voice.name}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  className="inline-flex h-[46px] items-center justify-center gap-2.5 rounded-full bg-[#8b74e6] px-6 text-sm font-semibold text-white transition hover:bg-[#9b85ef]"
                  onClick={showBackendNotice}
                >
                  <Sparkles size={16} /> {t.studio.generate}
                </button>
              </div>

              <div className="mt-5 grid gap-3 rounded-2xl border border-white/[0.06] bg-[#100f13]/75 p-4 sm:grid-cols-2 md:p-5">
                <label className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-xs text-white/55">
                    <Gauge size={15} /> {t.studio.pace}
                  </span>
                  <span className="relative">
                    <select
                      aria-label={t.studio.pace}
                      className="appearance-none rounded-full border border-white/10 bg-[#1a1820] py-2 pl-3 pr-8 text-xs text-white/80 outline-none focus:border-accent/50"
                      onChange={(event) => setPace(event.target.value)}
                      value={pace}
                    >
                      <option value="relaxed">{t.studio.relaxed}</option>
                      <option value="natural">{t.studio.natural}</option>
                      <option value="brisk">{t.studio.brisk}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 text-white/45" size={13} />
                  </span>
                </label>
                <label className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-xs text-white/55">
                    <SlidersHorizontal size={15} /> {t.studio.quality}
                  </span>
                  <span className="relative">
                    <select
                      aria-label={t.studio.quality}
                      className="appearance-none rounded-full border border-white/10 bg-[#1a1820] py-2 pl-3 pr-8 text-xs text-white/80 outline-none focus:border-accent/50"
                      onChange={(event) => setQuality(event.target.value)}
                      value={quality}
                    >
                      <option value="fast">{t.studio.fast}</option>
                      <option value="standard">{t.studio.standard}</option>
                      <option value="high">{t.studio.high}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 text-white/45" size={13} />
                  </span>
                </label>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3 py-3 md:px-4">
                <button
                  aria-label={t.studio.audioPreview}
                  className="flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-white/15 text-white/40"
                  disabled
                >
                  <Play className="ml-0.5" fill="currentColor" size={15} />
                </button>
                <Waveform />
                <span className="whitespace-nowrap font-mono text-[11px] text-white/45">
                  00:00
                </span>
                <span className="hidden whitespace-nowrap text-[11px] text-white/35 sm:inline">
                  {t.studio.generateToPreview}
                </span>
              </div>
              <p className="mt-3 text-[11px] leading-5 text-white/35">
                {t.studio.note}
              </p>
            </div>
          </div>
          {notice && (
            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-accent/30 bg-[#211b33] px-4 py-3 text-sm text-[#d7ccff]" role="status">
              <CircleHelp size={16} /> {notice}
            </div>
          )}
        </div>
        <a
          aria-label={t.features.discover}
          className="mx-auto mt-12 flex w-fit items-center gap-2 text-xs text-white/35 transition hover:text-white/70"
          href="#features"
        >
          {t.features.discover} <ArrowDown size={14} />
        </a>
      </section>

      <section className="relative px-4 py-16 md:py-24" id="features">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-10 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#ad9bff]">{t.features.eyebrow}</span>
              <h2 className="max-w-[620px] text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-[42px]">
                {t.features.title}
              </h2>
            </div>
            <p className="max-w-[360px] text-sm leading-6 text-[#a7a3b2]">
              {t.features.description}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon }, index) => {
              const [title, description] = t.features.cards[index];
              return (
                <article
                  className="group min-h-[205px] rounded-[22px] border border-white/[0.065] bg-[#151419] p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-[#19171f]"
                  key={title}
                >
                  <span className="mb-9 flex h-10 w-10 items-center justify-center rounded-[14px] bg-accent/10 text-[#b8a7ff] transition group-hover:bg-accent/20">
                    <Icon size={18} />
                  </span>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/30">0{index + 1}</span>
                    <h3 className="text-[15px] font-semibold">{title}</h3>
                  </div>
                  <p className="text-[13px] leading-6 text-[#a7a3b2]">{description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24" id="about">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-16">
            <div className="md:sticky md:top-28">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-1.5 text-xs font-medium text-[#c5b8ff]">
                <Globe2 size={14} />                 {t.about.eyebrow}
              </span>
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-[42px]">
                {t.about.title}
              </h2>
              <a
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/80 transition hover:border-accent/40 hover:bg-white/[0.07] hover:text-white"
                href="https://github.com/Kalapak-Team"
                rel="noreferrer"
                target="_blank"
              >
                {t.about.github} <ArrowUpRight size={15} />
              </a>
            </div>
            <div>
              <p className="text-[15px] leading-7 text-[#c2becb]" lang={language}>
                {t.about.paragraph}
              </p>
              <p className="mt-4 text-[15px] leading-7 text-[#a7a3b2]" lang={language}>
                {t.about.open}
              </p>
              {language === "km" && (
                <blockquote className="mt-5 border-l-2 border-accent/70 pl-4 text-sm italic leading-6 text-[#d3c9ff]" lang="km">
                  {t.about.quote}
                </blockquote>
              )}
            </div>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
              },
              {
                icon: Code2,
              },
              {
                icon: MapPin,
              },
            ].map(({ icon: Icon }, index) => {
              const [title, description] = t.about.cards[index];
              return (
                <article
                  className="rounded-[20px] border border-white/[0.07] bg-[#151419] p-5"
                  key={title}
                >
                  <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-[#b8a7ff]">
                    <Icon size={17} />
                  </span>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#a7a3b2]">
                    {description}
                  </p>
                </article>
              );
            })}
          </div>

          {language === "en" && (
            <div className="about-khmer-card mt-3 rounded-[22px] border border-accent/15 bg-gradient-to-br from-accent/[0.09] to-[#151419] p-6 md:p-8">
              <h3 className="text-lg font-semibold text-[#eae5ff]" lang="km">
                {t.about.khmerTitle}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#c2becb]" lang="km">
                {t.about.khmerParagraph}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#a7a3b2]" lang="km">
                {t.about.khmerOpen}
              </p>
              <blockquote className="mt-5 border-l-2 border-accent/70 pl-4 text-sm italic leading-6 text-[#d3c9ff]" lang="km">
                {t.about.quote}
              </blockquote>
            </div>
          )}
        </div>
      </section>

      <section className="relative px-4 py-14 md:py-24" id="voices">
        <div className="mx-auto grid max-w-[1120px] gap-8 overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#151419] p-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:p-12">
          <div className="min-w-0 max-w-[430px]">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-[#b9a9ff]">
              <Headphones size={15} /> {t.voicesSection.eyebrow}
            </span>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-[40px]">
              {t.voicesSection.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#a7a3b2]">
              {t.voicesSection.description}
            </p>
            <a className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-[#c7baff]" href="#studio">
              {t.voicesSection.choose} <ArrowRight size={15} />
            </a>
          </div>
          <div className="min-w-0 rounded-[22px] border border-white/[0.06] bg-[#100f13] p-3 sm:p-4">
            {voices.slice(0, 3).map((voice) => (
              <button
                className={`flex w-full items-center gap-3 rounded-[16px] px-3 py-3.5 text-left transition sm:px-4 ${
                  selectedVoice === voice.name ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                }`}
                key={voice.name}
                onClick={() => setSelectedVoice(voice.name)}
              >
                <span className={`h-9 w-9 rounded-full bg-gradient-to-br ${voice.color} p-[1px]`}>
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-[#16141b] text-xs font-semibold text-white">
                    {voice.name[0]}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{voice.name}</span>
                  <span className="mt-0.5 block text-xs text-white/40">
                    {voiceDetails[language][voice.name]}
                  </span>
                </span>
                {selectedVoice === voice.name && <Check className="text-[#b9a9ff]" size={17} />}
                <span className="text-[11px] text-white/30">{t.voicesSection.language}</span>
              </button>
            ))}
            <div className="mt-3 flex items-center gap-3 border-t border-white/[0.06] px-4 pt-4">
              <button
                aria-label={t.voicesSection.preview}
                className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full border border-white/10 text-white/35"
                disabled
              >
                <Play className="ml-0.5" fill="currentColor" size={13} />
              </button>
              <Waveform />
              <span className="whitespace-nowrap text-[11px] text-white/40">{t.voicesSection.sample}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-24" id="how-it-works">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-12 max-w-[520px] text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[#ad9bff]">{t.steps.eyebrow}</span>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-[42px]">{t.steps.title}</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[Layers3, Volume2, Clock3].map((Icon, index) => {
              const [title, copy] = t.steps.cards[index];
              return (
                <article className="rounded-[22px] border border-white/[0.065] bg-[#151419] p-6 md:p-7" key={index}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/[0.06] text-[#b8a7ff]">
                      <Icon size={18} />
                    </span>
                    <span className="font-mono text-xs text-white/30">0{index + 1}</span>
                  </div>
                  <h3 className="mt-9 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#a7a3b2]">{copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-12 md:pb-28 md:pt-20">
        <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[28px] border border-accent/20 bg-[#17141f] px-6 py-14 text-center md:px-12 md:py-20">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[90px]" />
          <div className="relative mx-auto max-w-[670px]">
            <span className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-[#c2b5ff]">
              <Mic2 size={20} />
            </span>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-[48px]">
              {t.closing.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[470px] text-sm leading-7 text-[#aaa6b5] md:text-base">
              {t.closing.description}
            </p>
            <a className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#17151d] transition hover:bg-[#e8e2ff]" href="#studio">
              {t.closing.button} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] bg-[#0a090e]/70 px-4">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-center md:py-12">
            <div>
              <a aria-label="KalapakTTS home" className="inline-flex items-center" href="#home">
                <Image
                  alt="KalapakTTS"
                  className="h-[42px] w-[168px] object-cover object-center sm:h-[54px] sm:w-[216px]"
                  height={941}
                  src={resolvedTheme === "light" ? "/kalapaktts-logo-black.png" : "/kalapaktts-logo-white.png"}
                  width={1672}
                />
              </a>
              <p className="mt-2 max-w-[330px] text-sm leading-6 text-white/45">
                {t.footer.description}
              </p>
            </div>
            <div className="flex flex-col gap-5 md:items-end">
              <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
                <a className={navLinkClass} href="#studio">{t.nav.studio}</a>
                <a className={navLinkClass} href="#voices">{t.nav.voices}</a>
                <a className={navLinkClass} href="#features">{t.nav.features}</a>
                <a className={navLinkClass} href="#how-it-works">{t.nav.howItWorks}</a>
                <a className={navLinkClass} href="#about">{t.nav.about}</a>
                <a className={navLinkClass} href="#download">{t.nav.download}</a>
              </nav>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-white/45">
                <Globe2 size={14} />
                {t.footer.openSource}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t border-white/[0.07] py-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <p>{t.footer.copyright}</p>
            <p>{t.footer.tagline}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
