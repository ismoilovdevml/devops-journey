import { prefetchPlayer, studioProvider } from '@livepeer/react';

export const prefetchPlayerStaticProps = async (playbackId: string) => {
  const dehydratedState = await prefetchPlayer(
    {
      playbackId,
    },
    {
      provider: studioProvider({
        apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY ?? '',
      }),
    },
  );

  return {
    props: {
      dehydratedState,
    },
    revalidate: 600,
  };
};
