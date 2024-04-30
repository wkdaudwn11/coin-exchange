'use client';

import { usePathname } from 'next/navigation';
import c from 'classnames';

import Header from './header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <main
        className={c(
          'flex items-center justify-center flex-1 w-full max-w-[1400px]',
          {
            'pt-10': pathName !== '/',
          },
        )}
      >
        {children}
      </main>
      <footer className="text-white p-4">
        <p>© 2024 wkdaudwn11.</p>
      </footer>
    </div>
  );
};

export default Layout;
