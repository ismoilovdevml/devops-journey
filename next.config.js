// const { withSentryConfig } = require('@sentry/nextjs');

// const sentryWebpackPluginOptions = {
//   // Additional config options for the Sentry Webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, org, project, authToken, configFile, stripPrefix,
//   //   urlPrefix, include, ignore

//   silent: true, // Suppresses all logs
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
// };

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  flexsearch: {
    codeblocks: true,
  },
  staticImage: true,
  contentDump: true,
  defaultShowCopyCode: true,
});

/** @type {import('next').NextConfig} */
const config = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  reactStrictMode: true,
  typescript: {
    // Disable type checking since eslint handles this
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cs-uz.vercel.app'],
  },
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },
  async redirects() {
    return [
      {
        source: '/video-miners/getting-started',
        destination: '/guides/orchestrating/get-started',
        permanent: false,
      },
      {
        source: '/video-miners',
        destination: '/guides/orchestrating',
        permanent: false,
      },
      {
        source: '/video-miners/guides/metrics-monitoring',
        destination: '/guides/orchestrating/monitor-metrics',
        permanent: false,
      },
      // temporary until protocol docs are properly imported
      {
        source: '/protocol',
        destination: '/guides/orchestrating',
        permanent: false,
      },
      {
        source: '/developers',
        destination: '/guides/developers',
        permanent: false,
      },
      {
        source: '/protocol/reference/deployed',
        destination: '/reference/deployed-contract-addresses',
        permanent: false,
      },
      {
        source: '/delegators/how-to-guides/bridge-lpt',
        destination: '/guides/delegating/bridge-lpt-to-arbitrum',
        permanent: false,
      },
      {
        source: '/orchestrators',
        destination: '/guides/orchestrating/get-started',
        permanent: false,
      },
      {
        source: '/reference/api/:slug',
        destination: '/reference/api',
        permanent: false,
      },
      {
        source: '/react/LivepeerConfig',
        destination: '/reference/livepeer-js/LivepeerConfig',
        permanent: false,
      },
      {
        source: '/docs/Player',
        destination: '/reference/livepeer-js/Player',
        permanent: false,
      },
    ];
  },
};

if (process.env.NODE_ENV === 'development') {
  const withPreconstruct = require('@preconstruct/next');
  module.exports = withPreconstruct(withNextra(config));
} else {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  module.exports = withBundleAnalyzer(withNextra(config));
}
