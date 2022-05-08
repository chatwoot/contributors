import Document, { Html, Head, Main, NextScript } from 'next/document';
import ContributorsConfig from '../../contributors.config';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const {
      pageTitle,
      pageDescription,
      githubLink,
      contributingGuide,
      sponsorsLink,
    } = ContributorsConfig;
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <body>
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col bg-gradient-to-t from-brand-200 to-background items-center justify-center px-5 py-24 lg:py-0 text-center lg:h-screen">
              <h1 className="text-4xl text-brand-900 font-bold mb-5 lg:mb-8">
                {pageTitle}
              </h1>
              <p className="text-lg mb-4 lg:mb-8 text-brand-800 max-w-lg ml-auto mr-auto">
                {pageDescription}
              </p>
              <div className="py-2 md:py-4 flex flex-col md:flex-row items-center">
                {githubLink && (
                  <a
                    href={githubLink}
                    className="px-4 mb-2 py-2 border-2 text-brand-600 font-semibold border-brand-600 bg-brand-100 md:drop-shadow-flat mr-0 md:mr-4"
                  >
                    🐙 Star us on GitHub
                  </a>
                )}

                {contributingGuide && (
                  <a
                    href={contributingGuide}
                    className="px-4 mb-2 py-2 border-2 text-brand-600 font-semibold border-brand-600 bg-brand-100 md:drop-shadow-flat mr-0 md:mr-4"
                  >
                    📚 How to contribute
                  </a>
                )}
                {sponsorsLink && (
                  <a
                    href={sponsorsLink}
                    className="px-4 mb-2 py-2 border-2 text-brand-600 font-semibold border-brand-600 bg-brand-100 md:drop-shadow-flat"
                  >
                    ❤️ Sponsor us
                  </a>
                )}
              </div>

              <div className="text-center p-6 absolute bottom-0 hidden lg:block">
                Created using{' '}
                <a
                  className="text-brand-600"
                  href="https://github.com/chatwoot/contributors"
                >
                  Contributors template
                </a>{' '}
                from{' '}
                <a className="text-brand-600" href="https://www.chatwoot.com">
                  Chatwoot
                </a>
              </div>
            </div>

            <div className="overflow-auto lg:h-screen">
              <Main />
              <NextScript />
            </div>
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
