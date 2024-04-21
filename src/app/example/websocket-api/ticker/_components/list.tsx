import React from 'react';
import { Button } from 'react-daisyui';

import type { MarketCode } from '@/types/market-code';

import useWsTicker from '@/hooks/useWsTicker';

import DataValidation from '@/components/DataValidation';
import Table from '@/components/Table';

type Props = {
  marketCodes: MarketCode[];
};

const List = ({ marketCodes }: Props) => {
  const { socket, isConnected, socketData, isLoading, error, reconnect } =
    useWsTicker({
      marketCodes: marketCodes.filter((item) => item.market.includes('KRW')),
    });

  const handleToggleConnect = () => {
    if (isConnected && socket) {
      socket.close();
      return;
    }

    reconnect();
  };

  return (
    <div className="flex justify-center">
      <DataValidation
        isLoading={isLoading}
        error={error}
        isEmpty={
          !isLoading && isConnected && socketData && socketData.length === 0
        }
        emptyMessage="현재가 정보가 없습니다."
      >
        {!isConnected && (
          <div className="flex flex-col gap-4">
            <p>Socket 연결이 끊겼습니다.</p>
            <Button color="primary" onClick={handleToggleConnect}>
              소켓 연결하기
            </Button>
          </div>
        )}

        {isConnected && socketData && (
          <>
            <Button color="error" onClick={handleToggleConnect}>
              연결 끊기
            </Button>
            <div className="flex gap-8">
              <Table.Container>
                <Table.Head>
                  <span>코드</span>
                  <span>이름</span>
                  <span>현재가</span>
                  <span>등락률</span>
                </Table.Head>
                <Table.Body>
                  {socketData.map((item, idx) => (
                    <Table.Row key={`ticker-${idx}`}>
                      <span>{item.code}</span>
                      <span>
                        {
                          marketCodes.find(
                            (item2) => item2.market === item.code,
                          )?.korean_name
                        }
                      </span>
                      <span>
                        {item.trade_price > 1000
                          ? item.trade_price.toLocaleString()
                          : item.trade_price}
                      </span>
                      <span>
                        {item.signed_change_rate.toLocaleString(undefined, {
                          maximumFractionDigits: 4,
                        })}
                      </span>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Container>
            </div>
          </>
        )}
      </DataValidation>
    </div>
  );
};

export default List;
