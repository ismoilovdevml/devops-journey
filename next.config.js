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
  output: 'standalone',
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
  try {
    const withPreconstruct = require('@preconstruct/next');
    module.exports = withPreconstruct(withNextra(config));
  } catch (e) {
    module.exports = withNextra(config);
  }
} else if (process.env.ANALYZE === 'true') {
  try {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: true,
    });
    module.exports = withBundleAnalyzer(withNextra(config));
  } catch (e) {
    console.warn('Warning: @next/bundle-analyzer not available');
    module.exports = withNextra(config);
  }
} else {
  module.exports = withNextra(config);
}
