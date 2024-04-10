'use client';

import React from 'react';
import { Loading as DaisyLoading } from 'react-daisyui';

type Props = {
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'accent'
    | 'ghost';
};

const Loading = ({ color = 'ghost' }: Props) => (
  <DaisyLoading variant="dots" color={color} />
);

export default Loading;
