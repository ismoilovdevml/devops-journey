import { Files, IncomingForm } from 'formidable';

import { createAsset } from 'livepeer/actions';
import { Asset } from 'livepeer/types';
import { NextApiRequest, NextApiResponse } from 'next';

import { ApiError } from '../../lib/error';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Asset | ApiError>,
) => {
  try {
    const method = req.method;

    if (method === 'POST') {
      // parse form with a Promise wrapper
      const data: Files = await new Promise((resolve, reject) => {
        const form = new IncomingForm();

        form.parse(req, (err, _fields, files) => {
          if (err) return reject(err);
          resolve(files);
        });
      });

      const file = Array.isArray(data?.file)
        ? data?.file?.[0] ?? null
        : data?.file ?? null;

      if (!file) {
        return res.status(500).json({ message: 'No file provided.' });
      }

      const asset = await createAsset({
        sources: [
          {
            name: 'slkdf',
            file: fs.createReadStream(file?.filepath),
          },
        ] as const,
      });

      return res.status(200).json(asset[0]);
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
