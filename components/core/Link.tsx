import NextLink from 'next/link';
import { ReactNode } from 'react';

type Props = {
  href: string;
  children?: ReactNode;
};

const Link = ({ href, children }: Props) => (
  <NextLink
    className="flex nx-text-sm contrast-more:nx-text-gray-700 contrast-more:dark:nx-text-gray-100 -nx-ml-2 nx-hidden nx-whitespace-nowrap nx-p-2 md:nx-inline-block nx-relative nx-text-gray-600 hover:nx-text-gray-800 dark:nx-text-gray-400 dark:hover:nx-text-gray-200"
    href={href}
  >
    {children}
  </NextLink>
);

export default Link;
