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
    locales: ['en-UZ'],
    defaultLocale: 'en-UZ',
  },
  reactStrictMode: true,
  typescript: {
    // Disable type checking since eslint handles this
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/devops-journey-uz/**',
      },
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  const withPreconstruct = require('@preconstruct/next');
  module.exports = withPreconstruct(withNextra(config));
} else {
  try {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: process.env.ANALYZE === 'true',
    });
    module.exports = withBundleAnalyzer(withNextra(config));
  } catch (e) {
    // If @next/bundle-analyzer is not available, just use withNextra
    console.warn('Warning: @next/bundle-analyzer not found, skipping bundle analysis');
    module.exports = withNextra(config);
  }
}