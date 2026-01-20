import React from 'react';
import { Phone, Mail, FileText } from 'lucide-react';

export const TelecomFooter: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* О компании */}
          <div className="col-span-2">
            <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-md">
              ИП Григорян Борис Леонович. Профессиональные решения в сфере связи для юридических лиц.
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+78634453333" 
                  className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors group"
                >
                  <Phone className="w-4 h-4 group-hover:text-green-500 transition-colors" />
                  <span>+7 8634 45 33 33</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@a1-telecom.ru" 
                  className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:text-green-500 transition-colors" />
                  <span>info@a1-telecom.ru</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Документы */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Документы</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="http://www.kremlin.ru/acts/bank/19708" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors group"
                >
                  <FileText className="w-4 h-4 group-hover:text-green-500 transition-colors" />
                  <span>Закон о связи</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-600 text-sm">
            © 2026 ИП Григорян Борис Леонович. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};
