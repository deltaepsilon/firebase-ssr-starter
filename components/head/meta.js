import React from 'react';
import Head from 'next/head';

export default ({ title }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
    </Head>
  );
};
