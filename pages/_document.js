//https://github.com/zeit/next.js/blob/48e6decc2d7e081d87b7c4c4a779d84023484375/examples/with-next-sass/pages/_document.js

import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body className="mdc-typography">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
