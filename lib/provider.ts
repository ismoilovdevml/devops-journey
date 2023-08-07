import { defaultStudioConfig, studioProvider } from '@livepeer/react';

export const provider = studioProvider({
  apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY ?? '',
  baseUrl: defaultStudioConfig.baseUrl,
});
