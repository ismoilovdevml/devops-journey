import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  search: {
    codeblocks: true,
  },
  staticImage: true,
  // contentDump: true,
  defaultShowCopyCode: true,
});

/** @type {import('next').NextConfig} */
const config = {
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

// if (process.env.NODE_ENV === 'development') {
//   const withPreconstruct = import('@preconstruct/next');
//   module.exports = withPreconstruct(withNextra(config));
// } else {
//   const withBundleAnalyzer = import('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
//   });
//   module.exports = withBundleAnalyzer(withNextra(config));
// }

export default withNextra(config);
