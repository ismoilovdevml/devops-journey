export interface Tutorial {
  title: string;
  longTitle: string;
  description: string;
  level: string;
  category: string;
  author: Author;
  createdAt: string;
  minutesRead: number;
  href: string;
  theme: Theme;
}

export interface Author {
  name: string;
  image: string;
}

export interface Theme {
  breadcrumb: boolean;
  footer: boolean;
  sidebar: boolean;
  toc: boolean;
  pagination: boolean;
}

export interface JsonLd {
  '@context': string | string[] | { [key: string]: string | object };
  '@id'?: string | string[];
  '@type'?: string | string[];
  mainEntityOfPage?: {
    '@type'?: string | string[];
    '@id': string;
  };
  headline?: string;
  description?: string;
  image?:
    | {
        '@type': string;
        url: string;
        width: string;
        height: string;
      }
    | string[];
  datePublished?: string;
  dateModified?: string;
  author?:
    | {
        '@type': string;
        name: string;
        url?: string;
      }
    | {
        '@type': string;
        [key: string]: any;
      };
  publisher?: {
    '@type': string;
    name: string;
    logo?: string | { '@type': string; url: string };
  };
  [key: string]: any;
}
