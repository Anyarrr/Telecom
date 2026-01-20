import React from 'react';
import { TelecomGeneral } from '../TelecomGeneral/TelecomGeneral.tsx';
import { TelecomTarif } from '../TelecomTarif/TelecomTarif.tsx';
import { TelecomAdvantages } from '../TelecomAdvantages/TelecomAdvantages.tsx';
import { TelecomContacts } from '../TelecomContacts/TelecomContacts.tsx';

export const HomePage: React.FC = () => {
  return (
    <>
      <TelecomGeneral />  
      {/* Общий фон после hero-блока (как "единое полотно" дальше по странице) */}
      <div className="relative bg-black overflow-hidden">
        {/* Мягкие "пятна" и градиенты, чтобы фон был живым, как на референсе */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_25%_0%,rgba(34,197,94,0.10),transparent_60%),radial-gradient(700px_circle_at_80%_35%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/80" />

        <TelecomTarif />
        <TelecomAdvantages />
      </div>
      <TelecomContacts />
    </>
  );
};
