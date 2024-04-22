import React from 'react';
import { Button } from 'react-daisyui';

import useWsTrade from '@/hooks/useWsTrade';

import DataValidation from '@/components/DataValidation';
import Table from '@/components/Table';

type Props = {
  marketCode: string;
};

const List = ({ marketCode }: Props) => {
  const { socket, isConnected, socketData, isLoading, error, reconnect } =
    useWsTrade({
      marketCode: marketCode || 'KRW-BTC',
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
        emptyMessage="체결 정보가 없습니다."
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
                  <span>코인</span>
                  <span>체결 ID</span>
                  <span>체결 시간</span>
                  <span>ASK/BID</span>
                  <span>체결 가격</span>
                </Table.Head>
                <Table.Body>
                  {[...socketData].reverse().map((item, idx) => (
                    <Table.Row key={`trade-${idx}`}>
                      <span>{item.code} </span>
                      <span>{item.sequential_id} </span>
                      <span>
                        {item.trade_date} {item.trade_time}
                      </span>
                      <span>{item.ask_bid === 'ASK' ? '매도' : '매수'} </span>
                      <span>
                        {item.trade_price >= 1000
                          ? item.trade_price.toLocaleString()
                          : item.trade_price.toLocaleString(undefined, {
                              maximumFractionDigits: 4,
                            })}{' '}
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
