import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" dir="rtl">
      <Head>
        <link rel="icon" href="./assets/images/site_icon.png" />
      </Head>
      <body className="flex items-start justify-center">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
