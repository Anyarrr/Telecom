import React from 'react';
import { Rocket, Wallet, Headphones, Globe } from 'lucide-react';

export const TelecomAdvantages: React.FC = () => {
  const benefits = [
    {
      title: "Высокоскоростной интернет",
      description: "Наслаждайтесь скоростью до 1 Гб/с.",
      icon: <Rocket className="w-8 h-8 text-green-500" />
    },
    {
      title: "Гибкие тарифные планы",
      description: "Тарифы на любой бюджет.",
      icon: <Wallet className="w-8 h-8 text-green-500" />
    },
    {
      title: "Качественная IP-телефония",
      description: "Современные решения для вашего бизнеса.",
      icon: <Globe className="w-8 h-8 text-green-500" />
    },
    {
      title: "Надежность и поддержка",
      description: "Круглосуточная помощь для наших клиентов.",
      icon: <Headphones className="w-8 h-8 text-green-500" />
    }
  ];

  return (
    <section id="benefits" className="min-h-screen py-32 px-6 relative overflow-hidden bg-black flex items-center">
      {/* Множественные светящиеся эффекты с разных сторон */}
      <div className="pointer-events-none absolute inset-0">
        {/* Верхний центр */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(34,197,94,0.22),transparent_60%)] blur-[80px]" />
        {/* Левый верх */}
        <div className="absolute top-1/4 left-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(34,197,94,0.18),transparent_60%)] blur-[90px]" />
        {/* Правый верх */}
        <div className="absolute top-1/3 right-0 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)] blur-[85px]" />
        {/* Центр */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[radial-gradient(circle,rgba(34,197,94,0.20),transparent_60%)] blur-[100px]" />
        {/* Левый низ */}
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(34,197,94,0.19),transparent_60%)] blur-[80px]" />
        {/* Правый низ */}
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_60%)] blur-[90px]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* НОВЫЙ ЗАГОЛОВОК БЛОКА */}
        <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-green-500/50"></span>
            <h2 className="text-green-500 uppercase tracking-[0.4em] text-xs font-black">
              Наши преимущества
            </h2>
            <span className="h-px w-8 bg-green-500/50"></span>
          </div>
          
          <h3 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-none italic uppercase">
            Почему выбирают <br /> 
            <span className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-none italic uppercase">
              именно нас
            </span>
          </h3>
          
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-80">
            Мы предлагаем высокие скорости до 1 Гб/с и конкурентоспособные тарифы для надежного подключения вашего бизнеса к интернету и IP-телефонии.
          </p>
        </div>

        {/* СЕТКА ПРЕИМУЩЕСТВ (оставлена без изменений, так как вам нравится расположение) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-black p-10 hover:bg-white/[0.03] transition-all duration-500 group relative"
            >
              {/* Декоративный эффект при наведении */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
              
              <div className="mb-8 transform group-hover:scale-110 group-hover:translate-x-2 transition-transform duration-500">
                {benefit.icon}
              </div>
              
              <h4 className="text-white font-bold text-lg mb-4 tracking-tight group-hover:text-green-500 transition-colors italic uppercase">
                {benefit.title}
              </h4>
              
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Нижний декоративный свет */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[radial-gradient(600px_circle_at_50%_100%,rgba(34,197,94,0.03),transparent_70%)]" />
    </section>
  );
};