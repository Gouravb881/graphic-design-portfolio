import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Download, Menu, X, Share2, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Components
const Sidebar = ({ isOpen, setOpen }) => {
  const links = ['Overview', 'Software', 'Education', 'Skills', 'Portfolio', 'Contact'];
  
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[280px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col",
          "lg:translate-x-0 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-8 lg:hidden">
          <span className="font-bold text-xl tracking-tight">Portfolio.</span>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-zinc-100 dark:border-zinc-800 shadow-sm relative group">
            <img 
              src="/profile.png" 
              alt="Profile" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium">Update</span>
            </div>
          </div>
          <h1 className="font-bold text-xl text-zinc-900 dark:text-zinc-50 tracking-tight">Gourav Bamaniya</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Graphic Designer</p>
        </div>

        <nav className="flex-1 space-y-1">
          {links.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute left-0 w-1 h-full bg-zinc-900 dark:bg-zinc-50 scale-y-0 group-hover:scale-y-100 transition-transform origin-left rounded-r-full" />
              <span>{link}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-2 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center space-x-3 text-xs text-zinc-500 dark:text-zinc-400">
            <Mail size={14} />
            <span>gouravbamaniya441@gmail.com</span>
          </div>
          <a href="/CV.pdf" download="Gourav_Bamaniya_CV.pdf" className="w-full mt-4 flex justify-between items-center px-5 py-3.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm">
            <span>Download CV</span>
            <Download size={16} />
          </a>
        </div>
      </motion.aside>
    </>
  );
};

const Topbar = ({ setSidebarOpen, toggleTheme, isDark }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Gourav Bamaniya | Graphic Designer',
          text: 'Check out this professional graphic design portfolio by Gourav Bamaniya 🚀',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support native sharing
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('✨ Portfolio link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex justify-between items-center lg:px-10 h-20 transition-colors duration-300">
      <div className="flex items-center">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="mr-4 p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden transition-colors"
        >
          <Menu size={20} className="text-zinc-700 dark:text-zinc-300" />
        </button>
        <h2 className="font-semibold text-lg tracking-tight hidden sm:block text-zinc-800 dark:text-zinc-100">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-2xl bg-white/50 dark:bg-zinc-900/50">
        <div className="flex items-center px-1 border-r border-zinc-200 dark:border-zinc-800 mr-1 pr-2">
          <a href="/CV.pdf" download="Gourav_Bamaniya_CV.pdf" className="px-4 py-2 text-sm font-medium rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors hidden sm:block">
            Resume
          </a>
          <a href="#contact" className="px-4 py-2 text-sm font-medium rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors hidden sm:block">
            Contact
          </a>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-zinc-100/80 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDark ? 'dark' : 'light'}
              initial={{ y: -20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </AnimatePresence>
        </button>
        
        <button 
          onClick={handleShare}
          className="p-2.5 rounded-xl bg-zinc-100/80 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95"
          aria-label="Share Portfolio"
        >
          <Share2 size={18} />
        </button>
      </div>
    </header>
  );
};

// Main Sections
const Biography = () => {
  const stats = [
    { label: 'Projects', value: '45+' },
    { label: 'Experience', value: '05+' },
    { label: 'Awards', value: '12' },
    { label: 'Offices', value: '03' }
  ];

  return (
    <motion.section 
      id="overview"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-16 scroll-mt-24"
    >
      <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 md:p-10 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-2/3">
            {/* Mobile Profile Display */}
            <div className="flex items-center gap-5 mb-8 md:hidden">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 shadow-sm ring-4 ring-zinc-50 dark:ring-zinc-900/50">
                <img src="/profile.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-2xl text-zinc-900 dark:text-zinc-50 tracking-tight">Gourav Bamaniya</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Graphic Designer</p>
              </div>
            </div>

            <div className="inline-block px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-300 tracking-wide mb-6">
              Biography
            </div>
            <h3 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white leading-tight">
              Turning ideas into <span className="text-zinc-400 dark:text-zinc-500">visually impactful</span> and <span className="text-zinc-400 dark:text-zinc-500">professional</span> results.
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg mb-8">
              Hi, I’m Gourav Bamaniya, a Graphic Designer with 5+ years of experience specializing in logo design, branding, social media creatives, and modern digital artwork. I deliver fast, reliable, and high-quality design solutions, turning your ideas into visually impactful and professional results. With a strong focus on creativity, detail, and client satisfaction, I help brands build a clean and strategic identity. Let’s bring your vision to life 🚀
            </p>
          </div>
          
          <div className="md:w-1/3 grid grid-cols-2 gap-4 h-fit self-center">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl flex flex-col items-center justify-center border border-zinc-100 dark:border-zinc-800 hover:-translate-y-1 transition-transform"
              >
                <Counter target={stat.value} />
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const isNumber = !isNaN(parseInt(target));
  const numericTarget = isNumber ? parseInt(target) : 0;
  const suffix = target.toString().replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isNumber) return;
    
    let start = 0;
    const end = numericTarget;
    const duration = 2000;
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(easeOutQuart * end));
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [numericTarget, isNumber]);

  return (
    <span className="text-4xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tighter">
      {isNumber ? String(count).padStart(target.toString().length - suffix.length, '0') : target}{suffix}
    </span>
  );
};


const SoftwareTool = ({ tool, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group flex flex-col items-center cursor-default"
    >
      <div className="relative w-28 h-28 md:w-32 md:h-32 mb-5 flex items-center justify-center">
        {/* Soft neumorphic outer circle */}
        <div className="absolute inset-0 rounded-full bg-zinc-100 dark:bg-zinc-800
          shadow-[4px_4px_12px_rgba(0,0,0,0.1),-4px_-4px_12px_rgba(255,255,255,0.9)]
          dark:shadow-[4px_4px_12px_rgba(0,0,0,0.5),-4px_-4px_12px_rgba(255,255,255,0.04)]
          group-hover:shadow-[6px_6px_18px_rgba(0,0,0,0.15),-6px_-6px_18px_rgba(255,255,255,0.95)]
          dark:group-hover:shadow-[6px_6px_18px_rgba(0,0,0,0.6),-6px_-6px_18px_rgba(255,255,255,0.06)]
          group-hover:scale-105 transition-all duration-500 ease-out" />

        {/* Icon container */}
        <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          {tool.img ? (
            <img
              src={tool.img}
              alt={tool.name}
              className="w-full h-full object-contain drop-shadow-sm"
            />
          ) : (
            <div
              className="w-full h-full rounded-xl flex items-center justify-center font-black text-white text-lg tracking-tight leading-none shadow-md"
              style={{ background: tool.bg }}
            >
              {tool.abbr}
            </div>
          )}
        </div>
      </div>

      <span className="text-[12px] font-bold text-zinc-500 dark:text-zinc-400 tracking-[0.12em] uppercase text-center leading-tight">
        {tool.name}
      </span>
    </motion.div>
  );
};

const SoftwareGrid = () => {
  const tools = [
    {
      name: 'ILLUSTRATOR',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg',
    },
    {
      name: 'PHOTOSHOP',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg',
    },
    {
      name: 'AFTER EFFECTS',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-plain.svg',
    },
    {
      name: 'AUTOCAD',
      img: 'https://cdn.simpleicons.org/autocad/E51937',
    },
    {
      name: '3DS MAX',
      img: null,
      abbr: '3DS',
      bg: 'linear-gradient(135deg, #1565C0, #0D47A1)',
    },
    {
      name: 'SKETCHUP',
      img: 'https://cdn.simpleicons.org/sketchup/005F9E',
    },
    {
      name: 'V-RAY',
      img: null,
      abbr: 'VR',
      bg: 'linear-gradient(135deg, #1A1A1A, #444)',
    },
    {
      name: 'ENSCAPE',
      img: null,
      abbr: 'EN',
      bg: 'linear-gradient(135deg, #0C7B5E, #0a5e47)',
    },
  ];

  return (
    <section id="software" className="mb-16 scroll-mt-24">
      <div className="flex items-center mb-12">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Software Proficiency</h3>
        <div className="ml-4 h-px flex-1 bg-gradient-to-r from-zinc-200 dark:from-zinc-800 to-transparent"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6">
        {tools.map((tool, i) => (
          <SoftwareTool key={tool.name} tool={tool} index={i} />
        ))}
      </div>
    </section>
  );
};


const Education = () => {
  const roadmap = [
    { year: '2023 — 2025', degree: 'Masters in Interior Architecture', institute: '' },
    { year: '2019 — 2023', degree: 'Bachelor of Design', institute: '' },
    { year: '2017 — 2019', degree: 'Pre-Architecture Diploma', institute: '' },
  ];

  return (
    <section id="education" className="mb-16 scroll-mt-24">
      <div className="flex justify-between md:gap-10 flex-col md:flex-row">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <div className="flex items-center mb-8">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Education</h3>
          </div>
          
          <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-10">
            {roadmap.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative"
              >
                <div className="absolute w-4 h-4 rounded-full bg-zinc-900 dark:bg-white border-4 border-white dark:border-zinc-950 -left-[35px] top-1"></div>
                <div className="text-sm font-bold text-zinc-400 mb-1">{item.year}</div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">{item.degree}</h4>
                {item.institute && <div className="text-zinc-600 dark:text-zinc-400 font-medium">{item.institute}</div>}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2" id="skills">
          <div className="flex items-center mb-8">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Languages</h3>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200/80 dark:border-zinc-800 space-y-7">
            <LanguageProgress label="Hindi" percent={90} proficiency="Fluent" />
            <LanguageProgress label="English" percent={100} proficiency="Native" />
          </div>
        </div>
      </div>
    </section>
  );
};

const LanguageProgress = ({ label, percent, proficiency }) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-base font-bold text-zinc-800 dark:text-zinc-200">{label}</span>
        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase self-end">{proficiency}</span>
      </div>
      <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
        />
      </div>
    </div>
  );
};


const SkillsAndStrengths = () => {
  const strengths = [
    'Vector Tracing', 'T-Shirt Graphics', 'Branding & Identity', 'Logo Design',
    'Typography', 'Social Media Creatives', 'Digital Artwork', 'Print Design', 
    'Color Theory', 'Layout Design', 'Mockup Creation', 'Vector Illustration'
  ];

  return (
    <section className="mb-16 scroll-mt-24">
      <div className="flex items-center mb-8">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Professional Strengths</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {strengths.map((str, i) => (
          <motion.div
            key={str}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.5) }}
            className="px-5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-default"
          >
            {str}
          </motion.div>
        ))}
      </div>
    </section>
  );
};


const PortfolioGallery = () => {
  const projects = [
    {
      title: 'Business Card Design',
      category: 'Branding',
      img: '/Product/card.png',
      tall: true,
    },
    {
      title: 'Brand Colors',
      category: 'Design System',
      img: '/Product/col.jpg',
      tall: false,
    },
    {
      title: 'Essential Branding',
      category: 'Branding',
      img: '/Product/essential.jpg',
      tall: false,
    },
    {
      title: 'Color Variation',
      category: 'Mockups',
      img: '/Product/colour cha.jpg',
      tall: false,
    },
    {
      title: 'Dynamic Mockups',
      category: 'Mockups',
      img: '/Product/colour changable.jpg',
      tall: true,
    },
    {
      title: 'Men in Black Concept',
      category: 'Graphic Design',
      img: '/Product/men in black.jpg',
      tall: true,
    },
    {
      title: 'Creative Branding',
      category: 'Branding',
      img: '/Product/vsdvev.jpg',
      tall: false,
    },
    {
      title: 'New Collection',
      category: 'Fashion',
      img: '/Product/new.jpg',
      tall: false,
    },
    {
      title: 'Apparel Mockup',
      category: 'Mockups',
      img: '/Product/download (3).jpg',
      tall: true,
    },
    {
      title: 'Fashion Design',
      category: 'Fashion',
      img: '/Product/download (5).jpg',
      tall: false,
    },
    {
      title: 'Trending Thumbnail',
      category: 'Digital Art',
      img: '/Product/thumbnail 2.jpg',
      tall: true,
    },
    {
      title: 'T-Shirt Concept',
      category: 'Apparel',
      img: '/Product/download (7).jpg',
      tall: false,
    },
    {
      title: 'Streetwear Idea',
      category: 'Fashion',
      img: '/Product/download (12).jpg',
      tall: true,
    },
    {
      title: 'Social Media Thumbnail',
      category: 'Digital Marketing',
      img: '/Product/thumbnail.png',
      tall: false,
    },
  ];

  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section id="portfolio" className="mb-16 scroll-mt-24">
      <div className="flex items-center mb-8">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Selected Work</h3>
        <div className="ml-4 h-px flex-1 bg-gradient-to-r from-zinc-200 dark:from-zinc-800 to-transparent"></div>
      </div>

      <div className="columns-1 md:columns-2 gap-6">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setSelectedImg(proj.img)}
            className={cn(
              "group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 break-inside-avoid mb-6",
              proj.tall ? "aspect-[3/4]" : "aspect-square md:aspect-[4/3]"
            )}
          >
            <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-zinc-900/40 transition-colors z-10" />
            <img 
              src={proj.img} 
              alt={proj.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 flex justify-between items-end">
              <div>
                 <p className="text-white/80 text-sm font-medium mb-1">Web Design</p>
                 <h4 className="text-white text-xl font-bold">{proj.title}</h4>
              </div>
              <div className="w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:scale-110 transition-transform">
                <ExternalLink size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all"
              onClick={() => setSelectedImg(null)}
            >
              <X size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImg} 
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


const Contact = () => {
  return (
    <section id="contact" className="mb-16 scroll-mt-24">
      <div className="flex items-center mb-8">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Get in Touch</h3>
        <div className="ml-4 h-px flex-1 bg-gradient-to-r from-zinc-200 dark:from-zinc-800 to-transparent"></div>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 md:p-10 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 italic">Let's work together.</h4>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Have a project in mind? Looking for a long-term design partner? Or just want to say hi? 
              Drop me a message and I'll get back to you as soon as possible. Let's create something extraordinary 🚀
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-5 group p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Contact via Email</p>
                  <p className="text-zinc-900 dark:text-white font-semibold">gouravbamaniya441@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-5 group p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:scale-110 transition-transform">
                   <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Location</p>
                  <p className="text-zinc-900 dark:text-white font-semibold">Madhya Pradesh, India</p>
                </div>
              </div>
            </div>
          </div>
          
          <form action="https://formsubmit.co/gouravbamaniya441@gmail.com" method="POST" className="space-y-4">
            <input type="hidden" name="_subject" value="New Portfolio Inquiry!" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 ml-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 transition-all text-zinc-900 dark:text-white text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 ml-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 transition-all text-zinc-900 dark:text-white text-sm"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 ml-1">Subject</label>
              <input 
                type="text" 
                name="subject"
                required
                placeholder="Inquiry about Branding"
                className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 transition-all text-zinc-900 dark:text-white text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 ml-1">Message</label>
              <textarea 
                name="message"
                required
                rows="4"
                placeholder="Tell me about your project..."
                className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 transition-all text-zinc-900 dark:text-white text-sm resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl font-bold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md mt-2 flex items-center justify-center space-x-2"
            >
              <span>Send Message</span>
              <Share2 size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on load
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />
      
      <main className="lg:pl-[280px] w-full min-h-screen flex flex-col transition-all duration-300">
        <Topbar setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} isDark={isDark} />
        
        <div className="flex-1 p-6 lg:p-10 max-w-6xl w-full mx-auto relative pt-8 md:pt-14">
          <Biography />
          <SoftwareGrid />
          <Education />
          <SkillsAndStrengths />
          <PortfolioGallery />
          <Contact />
          
          <footer className="mt-20 pt-8 pb-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 dark:text-zinc-400">
            <p>© {new Date().getFullYear()} Gourav Bamaniya. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Dribbble</a>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">LinkedIn</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
