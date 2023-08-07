import { getCssText } from '@livepeer/react';
import { SkipNavLink } from '@reach/skip-nav';
import {
  Head,
  Html,
  Main,
  default as NextDocument,
  NextScript,
} from 'next/document';
import * as React from 'react';

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
            }}
          />
        </Head>
        <body>
          <SkipNavLink />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
