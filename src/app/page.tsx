'use client';

import React from 'react';

import Layout from '@/components/Layout';

import Notice from './_components/Notice';

const Home = () => (
  <Layout>
    <div className="flex gap-[10px] pt-[10px] pb-[60px]">
      <section className="flex-1 flex flex-col gap-[10px]">
        <div className="flex items-center h-[50px] px-5 bg-primary-100">
          <Notice />
        </div>
        <article className="h-[618px] bg-primary-100">header</article>
        <div className="flex gap-[10px] h-[800px]">
          <div className="flex-1 h-full bg-primary-100">body left</div>
          <div className="flex-1 h-full bg-primary-100">body right</div>
        </div>
        <article className="h-[435px] bg-primary-100">footer</article>
      </section>
      <section className="w-[400px] bg-primary-100">right</section>
    </div>
  </Layout>
);

export default Home;
