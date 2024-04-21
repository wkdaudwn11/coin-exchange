import React from 'react';
import { Button } from 'react-daisyui';

import useWsOrderbook from '@/hooks/useWsOrderbook';

import DataValidation from '@/components/DataValidation';
import Table from '@/components/Table';

type Props = {
  marketCode: string;
};

const List = ({ marketCode }: Props) => {
  const { socket, isConnected, socketData, isLoading, error, reconnect } =
    useWsOrderbook({
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
          !isLoading &&
          isConnected &&
          socketData &&
          socketData.orderbook_units.length === 0
        }
        emptyMessage="호가 정보가 없습니다."
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
            <div className="flex flex-col gap-1 p-4 bg-slate-800 rounded-md">
              <p>시간: {new Date(socketData.timestamp).toLocaleTimeString()}</p>
              <p>호가 매도 총 잔량: {socketData.total_ask_size}</p>
              <p>호가 매수 총 잔량: {socketData.total_bid_size}</p>
            </div>
            <div className="flex gap-8">
              <Table.Container>
                <Table.Head>
                  <span>매도 물량</span>
                  <span>가격</span>
                </Table.Head>
                <Table.Body>
                  {[...socketData.orderbook_units].reverse().map((ele, idx) => (
                    <Table.Row key={`orderbook-ask-${idx}`}>
                      <span>{ele.ask_size}</span>
                      <span>{ele.ask_price.toLocaleString()}</span>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Container>
              <Table.Container>
                <Table.Head>
                  <span>매수 물량</span>
                  <span>가격</span>
                </Table.Head>
                <Table.Body>
                  {[...socketData.orderbook_units].reverse().map((ele, idx) => (
                    <Table.Row key={`orderbook-ask-${idx}`}>
                      <span>{ele.bid_size}</span>
                      <span>{ele.bid_price.toLocaleString()}</span>
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
