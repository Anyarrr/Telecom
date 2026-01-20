import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const TelecomContacts: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Функция для проверки и активации подсветки
    const checkAndHighlight = () => {
      const shouldHighlight = sessionStorage.getItem('highlightForm');
      if (shouldHighlight === 'true') {
        setIsFormHighlighted(true);
        sessionStorage.removeItem('highlightForm');
        
        // Убираем подсветку через 1 секунду
        setTimeout(() => {
          setIsFormHighlighted(false);
        }, 1000);
        return true;
      }
      return false;
    };

    // Проверяем сразу при монтировании
    checkAndHighlight();

    // Проверяем периодически (для случая, когда пользователь кликает на кнопку после монтирования)
    const interval = setInterval(() => {
      checkAndHighlight();
    }, 200);

    // Слушаем события скролла - когда секция становится видимой, проверяем флаг
    const handleScroll = () => {
      const contactsSection = document.getElementById('contacts');
      if (contactsSection) {
        const rect = contactsSection.getBoundingClientRect();
        // Если секция видна в viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          checkAndHighlight();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Отправка формы через EmailJS
      // ВАЖНО: Замените значения ниже на ваши из EmailJS аккаунта
      // Или используйте переменные окружения (см. EMAILJS_SETUP.md)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        // alert('Пожалуйста, настройте EmailJS. См. инструкцию в файле EMAILJS_SETUP.md');
        setIsSubmitting(false);
        return;
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: 'info@a1-telecom.ru'
        },
        publicKey
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        // Очищаем форму
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
        // Убираем сообщение об успехе через 5 секунд
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      setSubmitStatus('error');
      // Убираем сообщение об ошибке через 5 секунд
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacts" className="py-32 px-6 relative overflow-hidden bg-black">
      {/* Множественные светящиеся эффекты с разных сторон */}
      <div className="pointer-events-none absolute inset-0">
        {/* Верхний центр */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(34,197,94,0.24),transparent_60%)] blur-[80px]" />
        {/* Левый верх */}
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(34,197,94,0.21),transparent_60%)] blur-[90px]" />
        {/* Правый верх */}
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_60%)] blur-[85px]" />
        {/* Центр */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(34,197,94,0.19),transparent_60%)] blur-[100px]" />
        {/* Левый низ */}
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(34,197,94,0.23),transparent_60%)] blur-[80px]" />
        {/* Правый низ */}
        <div className="absolute bottom-0 right-1/3 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(255,255,255,0.09),transparent_60%)] blur-[90px]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-green-500/50"></span>
            <h2 className="text-green-500 uppercase tracking-[0.4em] text-xs font-black">
              Связь с нами
            </h2>
            <span className="h-px w-8 bg-green-500/50"></span>
          </div>
          
          <h3 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-none italic uppercase">
            Связаться <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-200">
              с нами
            </span>
          </h3>
          
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-80">
            Оставьте заявку, и мы свяжемся с вами в ближайшее время для обсуждения подключения интернета и IP-телефонии.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Контактная информация */}
          <div className="space-y-8">
            <div>
              <h4 className="text-white text-xl font-bold mb-6 uppercase tracking-wider">Контакты</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-green-500/50 transition-colors">
                    <Phone className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Телефон</p>
                    <a href="tel:+78634453333" className="text-white font-bold text-lg hover:text-green-500 transition-colors">
                      +7 8634 45 33 33
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-green-500/50 transition-colors">
                    <Mail className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:info@a1-telecom.ru" className="text-white font-bold text-lg hover:text-green-500 transition-colors">
                      info@a1-telecom.ru
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-gray-500 text-sm leading-relaxed">
                Служба продаж работает для вас. Свяжитесь с нами удобным способом, и мы поможем выбрать оптимальное решение для вашего бизнеса.
              </p>
            </div>
          </div>

          {/* Форма */}
          <form 
            onSubmit={handleSubmit} 
            className={`space-y-4 transition-all duration-1000 ${
              isFormHighlighted 
                ? 'ring-4 ring-green-500 shadow-[0_0_80px_rgba(34,197,94,0.8)] rounded-2xl p-6 bg-green-500/5 border-2 border-green-500/50' 
                : ''
            }`}
          >
            <div>
              <label htmlFor="name" className="block text-gray-400 text-xs uppercase tracking-widest mb-2">
                Имя
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                  placeholder="Ваше имя"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-400 text-xs uppercase tracking-widest mb-2">
                Телефон
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-400 text-xs uppercase tracking-widest mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-400 text-xs uppercase tracking-widest mb-2">
                Сообщение
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all resize-none"
                  placeholder="Расскажите о ваших потребностях..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 text-black px-8 py-5 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-white hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </button>

            {/* Сообщения о статусе отправки */}
            {submitStatus === 'success' && (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500">
                <CheckCircle className="w-5 h-5" />
                <p className="text-sm font-medium">Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm font-medium">Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
