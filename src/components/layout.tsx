'use client';

import React from 'react';

import Header from './header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex items-center justify-center flex-1 p-4 w-full">
      <div className="w-full max-w-7xl flex items-center justify-center">
        {children}
      </div>
    </main>
    <footer className="text-white p-4">
      <p>© 2024 wkdaudwn11.</p>
    </footer>
  </div>
);

export default Layout;
