'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Checkbox, Form, Table } from 'react-daisyui';

import { getMarketCode } from '@/services/market-code';

import Layout from '@/components/layout';
import DataValidation from '@/components/DataValidation';

const MarketCodePage = () => {
  const [isDetails, setIsDetails] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['market-code', isDetails],
    queryFn: () => getMarketCode({ isDetails }),
  });

  const handleChange = () => {
    setIsDetails((prev) => !prev);
  };

  return (
    <Layout>
      <DataValidation
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        isEmpty={!isLoading && !error && (!data || (data && data.length === 0))}
        emptyMessage="마켓코드 데이터가 없습니다."
        title="마켓코드 목록"
      >
        <div className="flex flex-col gap-4">
          <Form className="shadow bg-base-200 w-36 rounded-lg px-2">
            <Form.Label title="자세히 보기">
              <Checkbox checked={isDetails} onChange={handleChange} />
            </Form.Label>
          </Form>

          <Table>
            {isDetails ? (
              <Table.Head className="sticky top-0 z-10 bg-slate-900">
                <span />
                <span>영문 이름</span>
                <span>한글 이름</span>
                <span>마켓 코드</span>
                <span>경고</span>
                <span>가격 급등락</span>
                <span>거래량 급등</span>
                <span>입금량 급등</span>
                <span>가격 차이</span>
                <span>소수 계정 집중</span>
              </Table.Head>
            ) : (
              <Table.Head className="sticky top-0 z-10 bg-slate-900">
                <span />
                <span>EN</span>
                <span>KR</span>
                <span>Market Code</span>
              </Table.Head>
            )}
            <Table.Body>
              {data?.map((item, idx) =>
                item.market_event ? (
                  <Table.Row hover key={`market-code-${idx}`}>
                    <span>{data.length - idx}</span>
                    <span>{item.english_name}</span>
                    <span>{item.korean_name}</span>
                    <span>{item.market}</span>
                    <span>
                      <Checkbox
                        checked={item.market_event.warning}
                        color="warning"
                      />
                    </span>
                    <span>
                      <Checkbox
                        checked={item.market_event.caution.PRICE_FLUCTUATIONS}
                        color="warning"
                      />
                    </span>
                    <span>
                      <Checkbox
                        checked={
                          item.market_event.caution.TRADING_VOLUME_SOARING
                        }
                        color="warning"
                      />
                    </span>
                    <span>
                      <Checkbox
                        checked={
                          item.market_event.caution.DEPOSIT_AMOUNT_SOARING
                        }
                        color="warning"
                      />
                    </span>
                    <span>
                      <Checkbox
                        checked={
                          item.market_event.caution.GLOBAL_PRICE_DIFFERENCES
                        }
                        color="warning"
                      />
                    </span>
                    <span>
                      <Checkbox
                        checked={
                          item.market_event.caution
                            .CONCENTRATION_OF_SMALL_ACCOUNTS
                        }
                        color="warning"
                      />
                    </span>
                  </Table.Row>
                ) : (
                  <Table.Row hover key={`market-code-${idx}`}>
                    <span>{data.length - idx}</span>
                    <span>{item.english_name}</span>
                    <span>{item.korean_name}</span>
                    <span>{item.market}</span>
                  </Table.Row>
                ),
              )}
            </Table.Body>
          </Table>
        </div>
      </DataValidation>
    </Layout>
  );
};

export default MarketCodePage;
