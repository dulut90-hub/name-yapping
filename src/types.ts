export interface YappingImage {
  id: string;
  name: string;
  url: string;
  timestamp: number;
}

export type UIStyle = 
  | 'modern-dark' 
  | 'brutalist-white' 
  | 'cyber-neon' 
  | 'glass-blur' 
  | 'retro-terminal'
  | 'minimal-light'
  | 'vaporwave'
  | 'bento-grid'
  | 'luxury-gold'
  | 'ethereal-dream'
  | 'technical-mono'
  | 'playful-pop'
  | 'industrial-grain'
  | 'hacker-matrix'
  | 'sunset-gradient'
  | 'arctic-ice'
  | 'forest-night'
  | 'blood-moon'
  | 'royal-amethyst'
  | 'mint-fresh';

export interface UIConfig {
  id: UIStyle;
  name: string;
  bg: string;
  card: string;
  text: string;
  accent: string;
  font: string;
  border?: string;
  shadow?: string;
  buttonClass?: string;
}

export const UI_CONFIGS: UIConfig[] = [
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    bg: 'bg-zinc-950',
    card: 'bg-zinc-900 border border-zinc-800',
    text: 'text-zinc-100',
    accent: 'text-blue-500',
    font: 'font-sans',
    shadow: 'shadow-xl'
  },
  {
    id: 'brutalist-white',
    name: 'Neo Brutalist',
    bg: 'bg-white',
    card: 'bg-white border-4 border-black',
    text: 'text-black',
    accent: 'bg-yellow-400 text-black',
    font: 'font-display',
    shadow: 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    buttonClass: 'border-2 border-black hover:bg-black hover:text-white'
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    bg: 'bg-slate-950',
    card: 'bg-slate-900 border border-cyan-500/50',
    text: 'text-cyan-50',
    accent: 'text-cyan-400',
    font: 'font-tech',
    shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
    buttonClass: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
  },
  {
    id: 'glass-blur',
    name: 'Glass Morphism',
    bg: 'bg-gradient-to-tr from-purple-900 via-violet-900 to-indigo-900',
    card: 'bg-white/10 backdrop-blur-md border border-white/20',
    text: 'text-white',
    accent: 'text-pink-300',
    font: 'font-sans',
    shadow: 'shadow-2xl'
  },
  {
    id: 'retro-terminal',
    name: 'Terminal 80s',
    bg: 'bg-black',
    card: 'bg-black border border-green-500/30',
    text: 'text-green-500',
    accent: 'text-green-400 bg-green-950/30',
    font: 'font-mono',
    shadow: 'shadow-[0_0_5px_rgba(34,197,94,0.2)]',
    buttonClass: 'border border-green-500 hover:bg-green-500 hover:text-black'
  },
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    bg: 'bg-zinc-50',
    card: 'bg-white border border-zinc-200',
    text: 'text-zinc-900',
    accent: 'text-zinc-500',
    font: 'font-sans',
    shadow: 'shadow-sm'
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave',
    bg: 'bg-[#ff71ce]/20 bg-gradient-to-br from-[#01cdfe] to-[#ff71ce]',
    card: 'bg-[#fff] border-2 border-[#b967ff]',
    text: 'text-[#05ffa1] drop-shadow-sm', // Custom color management needed
    accent: 'text-[#fff1e6]',
    font: 'font-serif',
    shadow: 'shadow-[5px_5px_0px_#ff71ce]'
  },
  {
    id: 'bento-grid',
    name: 'Bento Dashboard',
    bg: 'bg-zinc-100',
    card: 'bg-white rounded-3xl border border-zinc-200',
    text: 'text-zinc-800',
    accent: 'text-orange-500',
    font: 'font-tech',
    shadow: 'shadow-lg'
  },
  {
    id: 'luxury-gold',
    name: 'Ebony & Gold',
    bg: 'bg-[#0d0d0d]',
    card: 'bg-[#1a1a1a] border border-[#d4af37]/30',
    text: 'text-[#f2f2f2]',
    accent: 'text-[#d4af37]',
    font: 'font-serif',
    shadow: 'shadow-[0_10px_30px_rgba(212,175,55,0.1)]'
  },
  {
    id: 'ethereal-dream',
    name: 'Ethereal Cloud',
    bg: 'bg-gradient-to-b from-blue-50 to-rose-50',
    card: 'bg-white/60 border border-white/80',
    text: 'text-slate-700',
    accent: 'text-rose-400',
    font: 'font-sans italic',
    shadow: 'shadow-xl shadow-blue-200/50'
  },
  {
    id: 'technical-mono',
    name: 'Draft Layout',
    bg: 'bg-zinc-200',
    card: 'bg-zinc-50 border-t border-l border-zinc-400 border-b-2 border-r-2 border-zinc-800',
    text: 'text-zinc-800',
    accent: 'text-blue-700 font-bold',
    font: 'font-mono',
  },
  {
    id: 'playful-pop',
    name: 'Pop Candy',
    bg: 'bg-pink-100',
    card: 'bg-white rounded-[2rem] border-4 border-pink-400',
    text: 'text-pink-600',
    accent: 'bg-yellow-300 text-pink-700 px-2 rounded-full',
    font: 'font-display',
    shadow: 'shadow-[0_8px_0_0_#f472b6]'
  },
  {
    id: 'industrial-grain',
    name: 'Raw Concrete',
    bg: 'bg-zinc-400',
    card: 'bg-zinc-300 border border-zinc-500 rounded-none mix-blend-multiply',
    text: 'text-zinc-900',
    accent: 'text-zinc-700 uppercase',
    font: 'font-tech',
    shadow: 'shadow-none'
  },
  {
    id: 'hacker-matrix',
    name: 'Digital Rain',
    bg: 'bg-black',
    card: 'bg-black/80 border-b-2 border-green-500/50 backdrop-blur-sm',
    text: 'text-green-400',
    accent: 'text-green-300 animate-pulse',
    font: 'font-mono',
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset Blvd',
    bg: 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600',
    card: 'bg-black/30 border border-white/10',
    text: 'text-white',
    accent: 'text-yellow-200',
    font: 'font-sans font-black',
  },
  {
    id: 'arctic-ice',
    name: 'Arctic Frost',
    bg: 'bg-blue-900',
    card: 'bg-blue-50/10 border border-blue-100/20',
    text: 'text-blue-100',
    accent: 'text-cyan-200',
    font: 'font-tech font-light',
  },
  {
    id: 'forest-night',
    name: 'Shadow Woods',
    bg: 'bg-[#0f1710]',
    card: 'bg-[#1a2e1d] border border-emerald-900/50',
    text: 'text-emerald-50',
    accent: 'text-emerald-400',
    font: 'font-serif',
  },
  {
    id: 'blood-moon',
    name: 'Crimson Night',
    bg: 'bg-zinc-950',
    card: 'bg-red-950/20 border border-red-900/30',
    text: 'text-red-100',
    accent: 'text-red-500',
    font: 'font-display',
  },
  {
    id: 'royal-amethyst',
    name: 'Royal Purple',
    bg: 'bg-purple-950',
    card: 'bg-purple-900/20 border border-purple-500/20 shadow-purple-500/10',
    text: 'text-purple-50',
    accent: 'text-purple-400',
    font: 'font-serif italic',
  },
  {
    id: 'mint-fresh',
    name: 'Spearmint',
    bg: 'bg-teal-50',
    card: 'bg-white border border-teal-100 rounded-2xl',
    text: 'text-teal-900',
    accent: 'text-teal-500',
    font: 'font-sans font-medium',
  }
];
