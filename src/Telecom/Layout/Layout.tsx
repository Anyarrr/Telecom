import React from 'react';
import { Outlet } from 'react-router-dom';
import { TelecomHeader } from '../TelecomHeader/TelecomHeader.tsx';
import { TelecomFooter } from '../TelecomFooter/TelecomFooter.tsx';

export const Layout: React.FC = () => {
  return (
    <>
      <TelecomHeader />
      <Outlet />
      <TelecomFooter />
    </>
  );
};
