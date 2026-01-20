import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, PhoneCall } from 'lucide-react';

export const TelecomTarif: React.FC = () => {
  const navigate = useNavigate();
  const tariffs = [
    {
      speed: "100 Мбит/с",
      price: "4200₽",
      desc: "Оптимально для небольшого офиса и стабильной работы почты.",
      icon: <Zap className="text-green-500" />,
      featured: false
    },
    {
      speed: "1 Гбит/с",
      price: "6300₽",
      desc: "Максимальная мощь для крупных компаний и работы с облаками.",
      icon: <ShieldCheck className="text-green-500" />,
      featured: false
    },
    {
      speed: "IP - Телефония",
      price: "по запросу",
      desc: "Современная связь с вашими клиентами без границ.",
      icon: <PhoneCall className="text-green-500" />,
      featured: false
    }
  ];

  return (
    <section id="tariffs" className="min-h-screen py-24 px-6 relative overflow-hidden flex items-center">
      {/* Множественные светящиеся эффекты с разных сторон */}
      <div className="pointer-events-none absolute inset-0">
        {/* Верхний центр */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(34,197,94,0.25),transparent_60%)] blur-[80px]" />
        {/* Левый верх */}
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(34,197,94,0.20),transparent_60%)] blur-[90px]" />
        {/* Правый верх */}
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)] blur-[85px]" />
        {/* Центр */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(34,197,94,0.18),transparent_60%)] blur-[100px]" />
        {/* Левый низ */}
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(34,197,94,0.22),transparent_60%)] blur-[80px]" />
        {/* Правый низ */}
        <div className="absolute bottom-0 right-1/3 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_60%)] blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
         <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-green-500/50"></span>
            <h2 className="text-green-500 uppercase tracking-[0.4em] text-xs font-black">
              Наши предложения
            </h2>
            <span className="h-px w-8 bg-green-500/50"></span>
          </div>
          
          <h3 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-none italic uppercase">
            Выгодные условия<br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-200">
              для бизнеса
            </span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tariffs.map((tariff, index) => (
            <div 
              key={index}
              className="relative group p-8 rounded-2xl border bg-white/5 border-white/10 hover:bg-white/10 hover:border-green-500/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)] hover:scale-105 transition-all duration-500"
            >
              
              <div className="mb-6 p-3 bg-black/50 rounded-lg inline-block">
                {tariff.icon}
              </div>

              <h4 className="text-2xl font-bold text-white mb-2">{tariff.speed}</h4>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                {tariff.desc}
              </p>

              <div className="mb-8">
                <span className="text-4xl font-black text-white">{tariff.price}</span>
                {tariff.price !== 'по запросу' && <span className="text-gray-500 text-sm ml-2">/ мес</span>}
              </div>

              <button 
                onClick={() => {
                  if (tariff.price === 'по запросу') {
                    // Переход на страницу телефонии
                    navigate('/telephony');
                  } else {
                    // Устанавливаем флаг для подсветки формы
                    sessionStorage.setItem('highlightForm', 'true');
                    
                    // Скроллим к секции контактов
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
                  }
                }}
                className="w-full py-4 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] bg-white/10 text-white hover:bg-green-500 hover:text-black border border-white/10 hover:border-green-500/50 hover:shadow-[0_10px_20px_rgba(34,197,94,0.2)] transition-all"
              >
                {tariff.price === 'по запросу' ? 'Узнать о тарифах' : 'Подключить'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};