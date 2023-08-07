import Head from 'next/head';

import { JsonLd } from 'types/tutorial';

export default function StructuredData({ data }: { data: JsonLd }) {
  return (
    <Head>
      <script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}
