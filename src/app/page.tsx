'use client';

import React from 'react';

import Layout from '@/components/Layout';

const Home = () => (
  <Layout>
    <div className="flex gap-[10px] pt-[10px] pb-[60px]">
      <section className="flex-1 flex flex-col gap-[10px]">
        <div className="flex items-center h-[50px] px-5 bg-neutral-900">
          공지
        </div>
        <article className="h-[618px] bg-neutral-700">header</article>
        <div className="flex gap-[10px] h-[800px]">
          <div className="flex-1 h-full bg-neutral-600">body left</div>
          <div className="flex-1 h-full bg-neutral-500">body right</div>
        </div>
        <article className="h-[435px] bg-neutral-400">footer</article>
      </section>
      <section className="w-[400px] bg-neutral-800">right</section>
    </div>
  </Layout>
);

export default Home;
