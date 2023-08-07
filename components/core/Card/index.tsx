import Link from 'next/link';

function Card({ title, description, icon, href }: any) {
  return (
    <Link href={href}>
      <div className="h-full p-4 group flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 bg-transparent text-current no-underline shadow-sm shadow-gray-100 transition-all duration-200 dark:border-neutral-700 dark:shadow-none hover:border-gray-300 hover:bg-slate-50 hover:shadow-md hover:shadow-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-900 dark:hover:shadow-none active:shadow-sm active:shadow-gray-200">
        <div className="mb-2 text-lg">{icon}</div>
        <div>
          <h3 className="text-lg mb-1 font-bold">{title}</h3>
          {description && <div className="nx-text-gray-400">{description}</div>}
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
