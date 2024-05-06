'use client';

import { usePathname } from 'next/navigation';
import c from 'classnames';

import Header from './Header';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <main
        className={c('flex-1 w-[1400px]', {
          flex: pathName !== '/',
          'items-center': pathName !== '/',
          'justify-center': pathName !== '/',
          'pt-10': pathName !== '/',
        })}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
