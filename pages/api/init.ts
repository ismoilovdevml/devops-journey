import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json(["qorin og'rib qomadimi?"]);
  }

  try {
    await sql`
            CREATE TABLE IF NOT EXISTS posts (
                path varchar(1024) NOT NULL,
                likes integer NOT NULL DEFAULT 0,
                dislikes integer NOT NULL DEFAULT 0,
                views integer NOT NULL DEFAULT 0
            );
        `;

    await sql`
            CREATE UNIQUE INDEX IF NOT EXISTS posts_path ON posts (path);
        `;
  } catch (e) {
    return res.status(500).json([e?.toString?.()]);
  }

  return res.status(200).json({ message: 'OK' });
}
