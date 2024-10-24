/**
 * @type {import('nextra-theme-docs').DocsThemeConfig}
 */
import { useRouter } from 'next/router';
import { GithubSponsors } from '@components/github-sponsors';
import dynamic from 'next/dynamic';
const Zoom = dynamic(() => import('react-medium-image-zoom'), {
  ssr: false,
})

const github = 'https://github.com/ismoilovdevml/devops-journey';

const TITLE_WITH_TRANSLATIONS = {
  'en-UZ': 'DevOps Journey',
} as const;

const EDIT_LINK_WITH_TRANSLATIONS = {
  'en-UZ': "GitHub-da o'zgartirish ->",
} as const;

import { DocsThemeConfig, useConfig, useTheme } from 'nextra-theme-docs';

const Logo = ({ height, width }: { height: number; width: number }) => {
  const { theme } = useTheme();
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
      <svg
        width={height || 18}
        height={width || 18}
        viewBox="0 0 64 68"
        fill="none"
      >
        <use href="public/logos/logo-dark.svg" />
      </svg>
      <img className='logo-img' src="/hero.png" alt="Hero" height="50" width="50" />
      <span className='logo-text' style={{ fontWeight: 'bold', fontSize: 18 }}>DevOps Journey</span>
    </div>
  );
};

const ArticleFooter = dynamic(() => import("@components/article-footer"), { ssr: false })

const config: DocsThemeConfig = {
  docsRepositoryBase: `${github}/blob/main`,
  chat: {
    link: 'https://discord.gg/rq9rUdnKpm',
  },
  toc: {
    float: true,
  },
  project: {
    link: github,
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark',
  },
  primaryHue: {
    dark: 162,
    light: 212,
  },
  footer: {
    text: `GPL-3.0 Licensed | Hamma huquqlar himoyalangan ${new Date().getFullYear()} ©Uzbek Developers Consortium.`,
  },
  navbar: {
    extraContent: <GithubSponsors />,
  },
  logo() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (
      <div className="flex items-center gap-2">
        <Logo width={18} height={18} />
      </div>
    );
  },
  useNextSeoProps() {
    return {
      titleTemplate: `%s - DevOps Journey`,
    };
  },
  head() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { frontMatter } = useConfig();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { theme } = useTheme();
    const title = frontMatter?.title || 'DevOps Journey';
    const description =
      frontMatter?.description ||
      "DevOps bo'yicha bepul ta'lim platformasi bo'lgan DevOps Journey-ga xush kelibsiz";
    const image = frontMatter?.type
      ? `https://devops-journey.uz/api/og?title=${frontMatter?.ogImageText}&category=Developing`
      : frontMatter?.image || '/banner.png';
    const folder = theme === 'light' ? '/light' : '/dark';

    const composedTitle = `${title} - DevOps Journey`;

    return (
      <>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${folder}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${folder}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${folder}/favicon-16x16.png`}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#00a300" />
        <link rel="manifest" href={`${folder}/site.webmanifest`} />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="title" content={composedTitle} />
        <meta name="description" content={description} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image} />

        <meta property="og:description" content={description} />
        <meta property="og:title" content={composedTitle} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
        <meta
          name="apple-mobile-web-app-title"
          content="DevOps Journey"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YNF68V1ND1"
        ></script>
        <script>
          {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
 
             gtag('config', 'G-YNF68V1ND1');
           `}
        </script>
      </>
    );
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    titleComponent: ({ title, type }) =>
      type === 'separator' ? (
        <div className="flex items-center gap-2">
          <Logo height={10} width={10} />
          {title}
        </div>
      ) : (
        <>{title}</>
      ),
  },
  editLink: {
    text() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { locale } = useRouter();
      return (
        <>
          {
            EDIT_LINK_WITH_TRANSLATIONS[
            (locale as keyof typeof EDIT_LINK_WITH_TRANSLATIONS) ?? 'en-UZ'
            ]
          }
        </>
      );
    },
  },
  i18n: [{ locale: 'en-UZ', text: 'O\'zbek' }],
  gitTimestamp: ({ timestamp }) => (
    <>Last updated on {timestamp.toLocaleDateString()}</>
  ),
  components: {
    img: props => <Zoom><img {...props} /></Zoom>
  },
  main({ children }) {
    return <>
      {children}
      <ArticleFooter />
    </>
  }
};

export default config;