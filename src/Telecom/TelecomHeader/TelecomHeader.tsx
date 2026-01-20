import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const TelecomHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Следим за скроллом для эффекта прозрачности
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBlock = (id: string) => {
    setIsMenuOpen(false);
    
    // Если мы на странице телефонии, сначала переходим на главную
    if (location.pathname !== '/') {
      navigate('/');
      // Ждем перехода и рендеринга элементов, затем скроллим
      const attemptScroll = (attempts = 0) => {
        const element = document.getElementById(id);
        if (element) {
          scrollToElement(id);
        } else if (attempts < 10) {
          // Пытаемся найти элемент до 10 раз с интервалом 50мс
          setTimeout(() => attemptScroll(attempts + 1), 50);
        }
      };
      setTimeout(() => attemptScroll(), 100);
    } else {
      scrollToElement(id);
    }
  };

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 96; // Высота header (h-24 = 96px)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      
      // Если элемент выше viewport, скроллим так, чтобы он был полностью виден
      let offsetPosition;
      if (elementHeight > viewportHeight - headerHeight) {
        // Для больших блоков - показываем начало блока
        offsetPosition = elementPosition - headerHeight;
      } else {
        // Для маленьких блоков - центрируем в viewport
        offsetPosition = elementPosition - headerHeight - (viewportHeight - headerHeight - elementHeight) / 2;
      }

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-black/90 backdrop-blur-md border-white/10' : 'bg-black border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* LOGO */}
          <Link 
            to="/"
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="relative p-2 rounded-lg border-2 border-green-500/30 group-hover:border-green-500 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-300">
              <img
                src="/png_logo.png"
                alt="a1"
                className="w-12 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-widest text-sm uppercase">интернет</span>
              <span className="text-green-500 text-[15px] font-medium leading-none tracking-tighter">для бизнеса</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { id: 'tariffs', label: 'Услуги', isRoute: false },
              { id: 'telephony', label: 'Телефония', isRoute: true, path: '/telephony' },
              { id: 'benefits', label: 'Преимущества', isRoute: false },
              { id: 'contacts', label: 'Контакты', isRoute: false }
            ].map((item) => {
              if (item.isRoute) {
                return (
                  <Link
                    key={item.id}
                    to={item.path || '/'}
                    className="relative px-4 py-2 text-gray-400 hover:text-white text-sm font-medium transition-all uppercase tracking-widest group/link"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover/link:scale-100 transition-transform duration-300" />
                    <span className={`absolute left-0 right-0 bottom-0 h-[2px] bg-green-500 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-100'} origin-center transition-transform duration-300`} />
                  </Link>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToBlock(item.id)}
                  className="relative px-4 py-2 text-gray-400 hover:text-white text-sm font-medium transition-all uppercase tracking-widest group/link"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover/link:scale-100 transition-transform duration-300" />
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-green-500 scale-x-0 group-hover/link:scale-x-100 origin-center transition-transform duration-300" />
                </button>
              );
            })}
          </nav>

          {/* CONTACTS & CTA (DESKTOP) */}
          <div className="hidden lg:flex items-center gap-8">
          <div className="flex flex-col items-end border-l border-white/10 pl-8">

              <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Служба продаж</span>
              <a href="tel:+78634453333" className="text-white font-medium hover:text-green-500 transition-colors">
                +7 8634 45 33 33
              </a>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV (DROPDOWN) */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-black border-b border-white/10 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-4 pb-8 space-y-6">
          <div className="flex flex-col gap-4">
            <button onClick={() => scrollToBlock('tariffs')} className="text-gray-400 text-left text-lg py-2">Услуги</button>
            <Link to="/telephony" onClick={() => setIsMenuOpen(false)} className="text-gray-400 text-left text-lg py-2 hover:text-white transition-colors">Телефония</Link>
            <button onClick={() => scrollToBlock('benefits')} className="text-gray-400 text-left text-lg py-2">Преимущества</button>
            <button onClick={() => scrollToBlock('contacts')} className="text-gray-400 text-left text-lg py-2">Контакты</button>
          </div>
          <div className="pt-6 border-t border-white/10">
            <p className="text-gray-500 text-xs uppercase mb-2">Служба продаж</p>
            <a href="tel:+78634453333" className="text-white text-xl font-bold block mb-6">+7 8634 45 33 33</a>
            <button className="w-full bg-green-500 text-black py-4 rounded-sm font-bold uppercase tracking-widest">
              Личный кабинет
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
    </header>
  );
};