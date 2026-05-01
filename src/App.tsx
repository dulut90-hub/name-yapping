import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  History, 
  Settings2, 
  Download, 
  Trash2, 
  RefreshCw, 
  Layers,
  Search,
  ExternalLink,
  Github,
  Zap,
  Layout,
  Palette,
  Image as ImageIcon,
  Cpu
} from 'lucide-react';
import { UI_CONFIGS, UIConfig, YappingImage } from './types';

// Helper to encode name
const getImageUrl = (name: string) => `https://api.sxtream.my.id/maker/yapping?name=${encodeURIComponent(name)}`;

export default function App() {
  const [nameInput, setNameInput] = useState('');
  const [currentStyle, setCurrentStyle] = useState<UIConfig>(UI_CONFIGS[0]);
  const [history, setHistory] = useState<YappingImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<YappingImage | null>(null);
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('yapping_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('yapping_history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async () => {
    if (!nameInput.trim()) return;
    
    setIsLoading(true);
    const url = getImageUrl(nameInput);
    
    // Create new image object
    const newImage: YappingImage = {
      id: crypto.randomUUID(),
      name: nameInput,
      url: url,
      timestamp: Date.now()
    };

    // Simulate loading for better UX and to show the "cool" animation
    setTimeout(() => {
      setLastGenerated(newImage);
      setHistory(prev => [newImage, ...prev].slice(0, 50)); // Keep last 50
      setIsLoading(false);
    }, 1500);
  };

  const deleteFromHistory = (id: string) => {
    setHistory(prev => prev.filter(img => img.id !== id));
  };

  const downloadImage = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `yapping-${name}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${currentStyle.bg} ${currentStyle.font} ${currentStyle.text} overflow-x-hidden p-4 md:p-8`}>
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-current to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tl from-current to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className={`p-3 rounded-2xl ${currentStyle.card} rotate-12 flex items-center justify-center`}>
              <Zap className={currentStyle.accent} size={32} fill="currentColor" fillOpacity={0.2} />
            </div>
            <div>
              <h1 className="text-4xl font-display uppercase tracking-tighter leading-none">Name-Yapping</h1>
              <p className="opacity-60 text-sm mt-1 uppercase tracking-widest font-mono">Premium Generator v2.0</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsStyleMenuOpen(!isStyleMenuOpen)}
              className={`p-3 rounded-xl ${currentStyle.card} ${currentStyle.shadow} hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer`}
            >
              <Palette className="group-hover:rotate-45 transition-transform" />
              <span className="hidden sm:inline font-mono text-xs uppercase font-bold">Switch Theme</span>
            </button>
            <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl ${currentStyle.card} border-zinc-800`}>
              <Cpu size={16} className="opacity-50" />
              <span className="font-mono text-[10px] opacity-50 uppercase tracking-tighter">Lat: 12ms / API: STABLE</span>
            </div>
          </div>
        </header>

        {/* Style Selection Drawer/Overlay */}
        <AnimatePresence>
          {isStyleMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`mb-12 overflow-hidden rounded-3xl ${currentStyle.card} border-opacity-20`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                    <Layout size={20} /> Select Your Aesthetic
                  </h2>
                  <span className="text-[10px] opacity-40 font-mono italic">20/20 UI VARIATIONS LOADED</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                  {UI_CONFIGS.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        setCurrentStyle(style);
                        setIsStyleMenuOpen(false);
                      }}
                      className={`p-4 rounded-2xl transition-all border-2 text-left group cursor-pointer
                        ${currentStyle.id === style.id ? 'border-current' : 'border-transparent hover:border-current/20'}
                        ${style.bg} ${style.text}
                      `}
                    >
                      <div className="text-xs font-bold uppercase tracking-tight mb-2 truncate">{style.name}</div>
                      <div className="flex gap-1">
                        <div className={`w-2 h-2 rounded-full ${style.accent.includes('text') ? style.accent.replace('text', 'bg') : 'bg-current'}`} />
                        <div className="w-2 h-2 rounded-full bg-current opacity-20" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Generator Section */}
          <section className="lg:col-span-7">
            <motion.div 
              layout
              className={`p-6 md:p-10 rounded-[2.5rem] ${currentStyle.card} ${currentStyle.shadow} relative overflow-hidden`}
            >
              {/* Decorative Gradients inside card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-current opacity-[0.03] blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <Sparkles className={currentStyle.accent} />
                    Create Your Yap
                  </h3>
                  <p className="opacity-50 text-sm max-w-md">
                    Enter your name and our high-performance rendering engine will generate a stunning custom graphic in real-time.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-3 opacity-40 px-1">Identity / Name</label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        placeholder="ENTER NAME HERE"
                        className={`w-full py-5 px-8 rounded-2xl bg-zinc-500/5 border-2 border-zinc-500/10 focus:border-current/30 outline-none transition-all text-xl font-mono uppercase tracking-widest placeholder:opacity-20`}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                        <Search size={20} />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={isLoading || !nameInput.trim()}
                    className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale cursor-pointer
                      ${currentStyle.buttonClass || `${currentStyle.accent.includes('bg') ? currentStyle.accent : 'bg-current text-zinc-950'} hover:opacity-90`}
                    `}
                  >
                    {isLoading ? (
                      <RefreshCw className="animate-spin" />
                    ) : (
                      <Zap size={20} />
                    )}
                    {isLoading ? 'Processing Signal...' : 'Generate Artifact'}
                  </button>
                </div>

                {/* Result Area */}
                <AnimatePresence mode="wait">
                  {lastGenerated ? (
                    <motion.div 
                      key={lastGenerated.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="mt-10"
                    >
                      <div className="relative group">
                        <div className={`p-2 rounded-3xl ${currentStyle.card} border-opacity-30 overflow-hidden relative overflow-hidden aspect-video bg-zinc-500/5 flex items-center justify-center`}>
                          <img 
                            src={lastGenerated.url} 
                            alt={lastGenerated.name}
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Inner UI element */}
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <div className="bg-black/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-mono text-white/70">
                               ID: {lastGenerated.id.split('-')[0]}
                             </div>
                             <div className="flex gap-2">
                               <button 
                                 onClick={() => downloadImage(lastGenerated.url, lastGenerated.name)}
                                 className="bg-white text-black p-2 rounded-full hover:bg-neutral-200 cursor-pointer"
                                >
                                 <Download size={16} />
                               </button>
                             </div>
                          </div>
                        </div>
                        
                        {/* Shadow glow matching image (simulated with current color) */}
                        <div className="absolute inset-0 bg-current opacity-10 blur-3xl -z-10 rounded-full scale-90" />
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 px-2">
                        <div>
                          <p className="text-xs opacity-50 font-mono">ENCODED_OUTPUT</p>
                          <h4 className="font-bold text-lg uppercase tracking-wider">{lastGenerated.name}</h4>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => downloadImage(lastGenerated.url, lastGenerated.name)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-current border-opacity-10 hover:bg-current hover:text-zinc-950 transition-colors text-xs font-bold cursor-pointer`}
                          >
                             <Download size={14} /> SAVE
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : !isLoading && (
                    <motion.div 
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-10 border-2 border-dashed border-current border-opacity-10 rounded-[2rem] aspect-video flex flex-col items-center justify-center text-center p-8 opacity-30"
                    >
                      <ImageIcon size={48} className="mb-4" />
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em]">Awaiting Signal Input</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </section>

          {/* Sidebar / History Section */}
          <aside className="lg:col-span-5 space-y-6">
            <div className={`p-8 rounded-[2rem] ${currentStyle.card} ${currentStyle.shadow}`}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <History size={20} className={currentStyle.accent} />
                  Registry
                </h3>
                <span className="text-[10px] font-mono opacity-40 bg-current/5 px-2 py-1 rounded uppercase tracking-widest">{history.length} ENTRIES</span>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-12 opacity-30">
                  <Layers size={32} className="mx-auto mb-3" />
                  <p className="text-[10px] uppercase font-mono">No data found in local storage</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scroll scrollbar-hide">
                  {history.map((img) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={img.id}
                      className={`group p-3 rounded-2xl bg-current/5 hover:bg-current/[0.08] transition-all flex items-center gap-4 border border-transparent hover:border-current/10`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-500/10 flex-shrink-0">
                        <img 
                          src={img.url} 
                          alt={img.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold uppercase truncate text-sm">{img.name}</p>
                        <p className="text-[10px] font-mono opacity-40 uppercase">
                          {new Date(img.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => downloadImage(img.url, img.name)}
                          className="p-2 rounded-lg hover:bg-white hover:text-black transition-colors cursor-pointer text-xs"
                        >
                          <Download size={14} />
                        </button>
                        <button 
                          onClick={() => deleteFromHistory(img.id)}
                          className="p-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors cursor-pointer text-xs"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  
                  {history.length > 0 && (
                    <button 
                      onClick={() => setHistory([])}
                      className="w-full py-3 mt-4 text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Trash2 size={12} /> Wipe All Records
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Tech Specs Block */}
            <div className={`p-6 rounded-[2rem] ${currentStyle.card} ${currentStyle.shadow} bg-opacity-50`}>
              <div className="flex items-center gap-2 mb-4 opacity-70">
                <Settings2 size={16} />
                <h4 className="text-xs font-bold uppercase tracking-widest">Metadata Context</h4>
              </div>
              <div className="space-y-3 font-mono text-[10px] opacity-60">
                <div className="flex justify-between border-b border-current border-opacity-10 pb-2">
                  <span>INTERFACE_MODE</span>
                  <span className="text-current font-bold uppercase">{currentStyle.id.replace(/-/g, '_')}</span>
                </div>
                <div className="flex justify-between border-b border-current border-opacity-10 pb-2">
                  <span>RENDER_RESOLUTION</span>
                  <span>1080x1080_DYNAMIC</span>
                </div>
                <div className="flex justify-between">
                  <span>API_SOURCE</span>
                  <span className="flex items-center gap-1">SXTREAM_V2 <ExternalLink size={8} /></span>
                </div>
              </div>
            </div>
          </aside>
        </main>

        <footer className="mt-20 pb-12 flex flex-col md:flex-row items-center justify-between border-t border-current border-opacity-10 pt-8 gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           <div className="flex items-center gap-2">
              <Zap size={16} />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">Developed by AI Studio Artisan</span>
           </div>
           
           <div className="flex items-center gap-4 text-xs font-mono uppercase font-bold tracking-tighter">
              <a href="#" className="hover:text-current transition-colors">Documentation</a>
              <span>/</span>
              <a href="#" className="hover:text-current transition-colors">API Status</a>
              <span>/</span>
              <a href="https://github.com" className="flex items-center gap-1 hover:text-current transition-colors">
                <Github size={14} /> Source
              </a>
           </div>

           <div className="text-[10px] uppercase font-mono tracking-tighter text-center md:text-right">
              &copy; 2026 NEXUS_DESIGN_LABS. <br />
              ALL SIGNAL RIGHTS RESERVED.
           </div>
        </footer>
      </div>
    </div>
  );
}
