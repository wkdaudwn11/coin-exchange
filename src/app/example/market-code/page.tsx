'use client';

import { useQuery } from '@tanstack/react-query';
import { Table } from 'react-daisyui';

import { getMarketCode } from '@/services/market-code';

// import ErrorBox from '@/components/ErrorBox';
import Layout from '@/components/layout';
// import Loading from '@/components/Loading';
import DataValidation from '@/components/DataValidation';

const MarketCode = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['market-code'],
    queryFn: getMarketCode,
  });

  return (
    <Layout>
      <DataValidation
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        isEmpty={!isLoading && !error && (!data || (data && data.length === 0))}
        emptyMessage="Market code 데이터가 없습니다."
      >
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <span />
              <span>EN</span>
              <span>KR</span>
              <span>Market Code</span>
            </Table.Head>
            <Table.Body>
              {data?.map((item, idx) => (
                <Table.Row hover key={`market-code-${idx}`}>
                  <span>{data.length - idx}</span>
                  <span>{item.english_name}</span>
                  <span>{item.korean_name}</span>
                  <span>{item.market}</span>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </DataValidation>
    </Layout>
  );
};

export default MarketCode;
