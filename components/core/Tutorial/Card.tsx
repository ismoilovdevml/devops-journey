import Image from 'next/image';

import Link from 'next/link';

import { Tutorial } from 'types/tutorial';

function Card({
  level,
  title,
  href,
  category,
  author,
  createdAt,
  minutesRead,
}: Tutorial) {
  return (
    <Link href={href}>
      <div className="h-full p-4 group flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 bg-transparent text-current no-underline shadow-sm shadow-gray-100 transition-all duration-200 dark:border-neutral-700 dark:shadow-none hover:border-gray-300 hover:bg-slate-50 hover:shadow-md hover:shadow-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-900 dark:hover:shadow-none active:shadow-sm active:shadow-gray-200">
        <div className="mb-3 text-sm nx-text-gray-400 uppercase">
          {category}
        </div>
        <h3 className="text-2xl mb-10 font-bold w-3/4">{title}</h3>
        <div className="flex items-center mb-1 justify-between">
          <div className="flex items-center">
            <div className="h-7 w-7 relative">
              <Image
                src={author?.image}
                alt={`Picture of ${author?.name}`}
                fill
                className="rounded-full"
              />
            </div>
            <div className="text-sm font-semibold ml-2">{author?.name}</div>
            <div className="text-sm nx-text-gray-400 ml-4">{createdAt}</div>
            <div className="text-sm nx-text-gray-400 ml-4">
              {minutesRead} daqiqa o'qiladi
            </div>
          </div>
          <div className="text-sm bg-gray-200 p-1.5 px-4 rounded-full dark:bg-zinc-800 nx-text-gray-400 uppercase">
            {level}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Cards({ children, num, ...props }: any) {
  return (
    <div
      style={{
        marginTop: 20,
        gap: '16px',
        display: 'grid',
        gridAutoRows: '1fr',
        '--rows': num || 3,
        gridTemplateColumns:
          'repeat(auto-fill, minmax(max(250px, calc((100% - 1rem * 2) / var(--rows))), 1fr))',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
