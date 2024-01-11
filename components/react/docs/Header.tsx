import { useRouter } from 'next/router';

const TITLE_WITH_TRANSLATIONS: Record<string, string> = {
  'en-UZ': 'livepeer.js',
};

export function Header() {
  const { locale, defaultLocale = 'en-UZ' } = useRouter();
  const resolvedLocale = locale || defaultLocale;
  const title = TITLE_WITH_TRANSLATIONS[resolvedLocale];

  return (
    <header className="flex flex-col">
      <h1 className="font-bold text-3xl mt-4 mb-8 md:!text-4xl">{title}</h1>

      <div className="flex flex-wrap gap-2 max-w-[28rem] min-h-[3rem]">
        <a
          aria-label="Version"
          href="https://www.npmjs.com/package/livepeer"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/npm/v/livepeer?colorA=2B323B&colorB=1e2329&style=flat&label=Version"
          />
        </a>

        <a
          aria-label="License"
          href="https://www.npmjs.com/package/livepeer"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/github/license/livepeer/livepeer.js?colorA=2B323B&colorB=1e2329&style=flat&label=License"
          />
        </a>

        <a
          aria-label="Downloads"
          href="https://www.npmjs.com/package/livepeer"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/npm/dm/livepeer?colorA=2B323B&colorB=1e2329&style=flat&label=Downloads"
          />
        </a>

        <a
          aria-label="Stars"
          href="https://github.com/livepeer/livepeer.js"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/github/stars/livepeer/livepeer.js?colorA=2B323B&colorB=1e2329&style=flat&label=Stars"
          />
        </a>
      </div>
    </header>
  );
}
