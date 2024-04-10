'use client';

import React from 'react';

import Header from './header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 p-4">{children}</main>
    <footer className="text-white p-4">
      <p>© 2024 wkdaudwn11.</p>
    </footer>
  </div>
);

export default Layout;
