import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
        </Head>
        <body className="bg-madiwala-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
