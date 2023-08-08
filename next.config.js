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
    domains: ['devops-journey.vercel.app'],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/video-miners/getting-started',
  //       destination: '/guides/orchestrating/get-started',
  //       permanent: false,
  //     },
  //   ];
  // },
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
