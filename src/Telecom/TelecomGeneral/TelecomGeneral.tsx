import React from 'react';

export const TelecomGeneral: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* ФОНОВАЯ КАРТИНКА С ЗАТЕМНЕНИЕМ */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ 
            filter: 'brightness(0.3) contrast(1.1)',
            backgroundImage: "url('/image1.jpg')" 
          }}
        />
        {/* Градиентные слои для эффекта глубины как на скрине РСХБ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-90" />
        
        {/* Светящийся зеленый шар (эффект со 2-го скрина) */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* КОНТЕНТ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          {/* Маленький надзаголовок */}

          {/* Главный заголовок */}
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
            ИНТЕРНЕТ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
              НА СКОРОСТИ <br /> БУДУЩЕГО
            </span>
          </h1>

          {/* Описание в "стеклянном" стиле */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-xl border-l-2 border-green-500/30 pl-6 backdrop-blur-sm">
            Предоставляем быстрый и надежный доступ к сети интернет и IP телефонии 
            для повышения продуктивности вашего бизнеса.
          </p>

          {/* Кнопки действия */}
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => {
                const element = document.getElementById('contacts');
                if (element) {
                  const headerHeight = 96;
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const viewportHeight = window.innerHeight;
                  const elementHeight = element.offsetHeight;
                  
                  let offsetPosition;
                  if (elementHeight > viewportHeight - headerHeight) {
                    offsetPosition = elementPosition - headerHeight;
                  } else {
                    offsetPosition = elementPosition - headerHeight - (viewportHeight - headerHeight - elementHeight) / 2;
                  }

                  window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                  });
                }
              }}
              className="bg-green-500 text-black px-10 py-5 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all active:scale-95"
            >
              Связаться с нами
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('tariffs');
                if (element) {
                  const headerHeight = 96;
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - headerHeight;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="group flex items-center gap-4 text-white uppercase tracking-widest text-xs font-bold cursor-pointer"
            >
              <span className="w-12 h-12 rounded-full border border-white/25 flex items-center justify-center group-hover:border-green-500 transition-colors">
               <span className="text-2xl">↓</span> 
              </span>
              Узнать тарифы
            </button>
          </div>
        </div>
      </div>

      {/* Декоративная сетка (как на скрине РСХБ) */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  );
};