'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Menu } from 'react-daisyui';
import c from 'classnames';

const restApiExampleList = [
  {
    href: '/example/rest-api/market-code',
    text: '종목 - 마켓 코드 목록',
  },
  {
    href: '/example/rest-api/candles-minutes',
    text: '캔들 - 분봉 데이터 목록',
  },
  {
    href: '/example/rest-api/candles-days',
    text: '캔들 - 일봉 데이터 목록',
  },
  {
    href: '/example/rest-api/candles-weeks',
    text: '캔들 - 주봉 데이터 목록',
  },
  {
    href: '/example/rest-api/candles-months',
    text: '캔들 - 월봉 데이터 목록',
  },
  {
    href: '/example/rest-api/trades-ticks',
    text: '체결 - 최근 체결 내역',
  },
  {
    href: '/example/rest-api/orderbook',
    text: '호가 - 정보 조회',
  },
];

const webSocketApiExampleList = [
  {
    href: '/example/websocket-api/order-book',
    text: '실시간 호가 정보',
  },
  {
    href: '/example/websocket-api/ticker',
    text: '실시간 현재가 정보',
  },
  {
    href: '/example/websocket-api/trade',
    text: '실시간 체결 정보',
  },
];

const Header = () => {
  const pathName = usePathname();

  return (
    <header className="flex justify-center w-full h-[60px] bg-header">
      <div className="flex items-center w-full h-full max-w-[1400px]">
        <Button tag="a" color="ghost" className="normal-case text-xl">
          Coin Exchange
        </Button>
        <div className="flex-none">
          <Menu horizontal className="px-1 text-neutral-400">
            <Menu.Item
              className={c('', {
                'text-neutral-50': pathName === '/',
                'font-bold': pathName === '/',
              })}
            >
              <Link href="/">거래소</Link>
            </Menu.Item>

            <Menu.Item className="z-[1]">
              <details>
                <summary
                  className={c('', {
                    'text-neutral-50': pathName.includes(
                      '/example/websocket-api/',
                    ),
                    'font-bold': pathName.includes('/example/websocket-api/'),
                  })}
                >
                  Web Socket API 예제
                </summary>
                <ul className="p-2 bg-header w-[185px] right-0">
                  {webSocketApiExampleList.map((item, idx) => (
                    <li key={`websocket-example-menu-${idx}`}>
                      <Link
                        href={item.href}
                        className={c('', {
                          'text-neutral-50': pathName === item.href,
                          'font-bold': pathName === item.href,
                        })}
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </Menu.Item>
            <Menu.Item className="z-[1]">
              <details>
                <summary
                  className={c('', {
                    'text-neutral-50': pathName.includes('/example/rest-api/'),
                    'font-bold': pathName.includes('/example/rest-api/'),
                  })}
                >
                  Rest API 예제
                </summary>
                <ul className="p-2 bg-header w-[180px] right-0">
                  {restApiExampleList.map((item, idx) => (
                    <li key={`rest-api-example-menu-${idx}`}>
                      <Link
                        href={item.href}
                        className={c('', {
                          'text-neutral-50': pathName === item.href,
                          'font-bold': pathName === item.href,
                        })}
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
