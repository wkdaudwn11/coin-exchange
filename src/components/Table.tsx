import React from 'react';
import { Table as DaisyUiTable } from 'react-daisyui';

type Props = {
  children: React.ReactNode[] | undefined;
};

const Container = ({ children }: Props) => (
  <DaisyUiTable>{children}</DaisyUiTable>
);

const Head = ({ children }: Props) => (
  <DaisyUiTable.Head className="sticky top-0 z-10 bg-slate-900 text-center">
    {children}
  </DaisyUiTable.Head>
);

const Body = ({ children }: Props) => (
  <DaisyUiTable.Body>{children}</DaisyUiTable.Body>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Row = ({ children }: any) => (
  <DaisyUiTable.Row hover className="text-right">
    {children}
  </DaisyUiTable.Row>
);

const Table = {
  Container,
  Head,
  Body,
  Row,
};

export default Table;
