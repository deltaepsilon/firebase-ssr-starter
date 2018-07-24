import React from 'react';
import Head from 'next/head';

export default ({ title }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      <link rel="manifest" href="static/manifest.json" />
      <title>{title}</title>
    </Head>
  );
};
