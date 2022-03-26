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
          <link rel="icon" href="/favicon.png" />
        </Head>
        <body className="bg-background">
          <section className="flex flex-col items-center justify-center px-5 py-4 mb:p-8 pt-16 text-center">
            <h1 className="text-4xl text-chennai-900 font-bold mb-5 md:mb-8">
              We thank all our contributors
            </h1>
            <p className="text-lg mb-4 md:mb-8 text-chennai-800 max-w-lg ml-auto mr-auto">
              Chatwoot would not have been what it is today without the help of
              our amazing contributors.
            </p>
            <div className="py-2 md:py-4 flex flex-col md:flex-row items-center">
              <a
                href="https://github.com/chatwoot/chatwoot"
                className="px-4 mb-2 py-2 border-2 text-chennai-700 font-semibold border-chennai-600 bg-chennai-100 md:drop-shadow-flat mr-0 md:mr-4"
              >
                🐙 Star us on GitHub
              </a>
              <a
                href="https://www.chatwoot.com/docs/contributing-guide"
                className="px-4 mb-2 py-2 border-2 text-chennai-700 font-semibold border-chennai-600 bg-chennai-100 md:drop-shadow-flat mr-0 md:mr-4"
              >
                📚 How to contribute
              </a>
              <a
                href="https://github.com/sponsors/chatwoot"
                className="px-4 mb-2 py-2 border-2 text-chennai-700 font-semibold border-chennai-600 bg-chennai-100 md:drop-shadow-flat"
              >
                ❤️ Sponsor us
              </a>
            </div>
          </section>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
