import React, { useEffect } from 'react';
import { TelecomTelephony } from '../TelecomTelephony/TelecomTelephony.tsx';

export const TelephonyPage: React.FC = () => {
  useEffect(() => {
    // Скроллим к началу страницы при монтировании
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <TelecomTelephony />;
};
