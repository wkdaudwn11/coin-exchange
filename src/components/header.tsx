'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Menu, Navbar } from 'react-daisyui';

const exampleMenuList = [
  {
    href: '/example/market-code',
    text: '마켓 코드 목록',
  },
];

const Header = () => (
  <Navbar className="bg-slate-800">
    <div className="flex-1">
      <Button tag="a" color="ghost" className="normal-case text-xl">
        Coin Exchange
      </Button>
    </div>
    <div className="flex-none">
      <Menu horizontal className="px-1">
        <Menu.Item>
          <Link href="/">Exchange</Link>
        </Menu.Item>
        <Menu.Item className="w-[140px]">
          <details>
            <summary>Example</summary>
            <ul className="p-2 bg-slate-800">
              {exampleMenuList.map((item, idx) => (
                <li key={`example-menu-${idx}`}>
                  <Link href={item.href}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </details>
        </Menu.Item>
      </Menu>
    </div>
  </Navbar>
);

export default Header;
