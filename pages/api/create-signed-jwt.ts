import { signAccessJwt } from 'livepeer/crypto';
import { NextApiRequest, NextApiResponse } from 'next';

import { ApiError } from '../../lib/error';

export type CreateSignedPlaybackBody = {
  playbackId: string;
  secret: string;
};

export type CreateSignedPlaybackResponse = {
  token: string;
};

const accessControlPrivateKey = process.env.ACCESS_CONTROL_PRIVATE_KEY;
const accessControlPublicKey =
  process.env.NEXT_PUBLIC_ACCESS_CONTROL_PUBLIC_KEY;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateSignedPlaybackResponse | ApiError>,
) => {
  try {
    const method = req.method;

    if (method === 'POST') {
      if (!accessControlPrivateKey || !accessControlPublicKey) {
        return res
          .status(500)
          .json({ message: 'No private/public key configured.' });
      }

      const { playbackId, secret }: CreateSignedPlaybackBody = req.body;

      if (!playbackId || !secret) {
        return res.status(400).json({ message: 'Missing data in body.' });
      }

      // we check that the "supersecretkey" was passed in the body
      // this could be a more complex check, like taking a signed payload,
      // getting the address for that signature, and fetching if they own an NFT
      //
      // https://docs.ethers.io/v5/single-page/#/v5/api/utils/signing-key/-%23-SigningKey--other-functions
      if (secret !== 'supersecretkey') {
        return res.status(401).json({ message: 'Incorrect secret.' });
      }

      const token = await signAccessJwt({
        privateKey: accessControlPrivateKey,
        publicKey: accessControlPublicKey,
        issuer: 'https://docs.livepeer.org',
        // playback ID to include in the JWT
        playbackId,
        // expire the JWT in 1 hour
        expiration: '1h',
        // custom metadata to include
        custom: {
          userId: 'user-id-1',
        },
      });

      return res.status(200).json({
        token,
      });
    }

    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: (err as Error)?.message ?? 'Error' });
  }
};

export default handler;
