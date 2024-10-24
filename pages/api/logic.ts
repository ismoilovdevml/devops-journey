import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export type Post = {
  path: string;
  likes: number;
  dislikes: number;
  views: number;
  _nonexist?: true;
};

export const factory =
  (
    field: Exclude<keyof Post, 'path' | '_nonexist'>,
    insertQuery: (path: string) => ReturnType<typeof sql>,
    updateQuery: (path: string, post: Post) => ReturnType<typeof sql>,
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { path: pathQuery } = req.query;
    const { path: pathBody } = req.body;
    const path = pathQuery ?? pathBody;

    if (typeof path != 'string')
      return res.status(400).json(['path field is missing']);

    const { rows } =
      await sql`SELECT * FROM posts WHERE path = ${path} LIMIT 1;`;
    const post = (rows[0] as Post) ?? {
      path,
      likes: 0,
      dislikes: 0,
      views: 0,
      _nonexist: true,
    };

    if (req.method !== 'POST') return res.status(200).json(post);

    if (post._nonexist == true) {
      try {
        await insertQuery(path);
        delete post._nonexist;
      } catch (e) {
        return res.status(500).json(['oncreate', e?.toString?.()]);
      }
    } else {
      try {
        post[field]++;
        await updateQuery(path, post);
      } catch (e) {
        return res.status(500).json(['onupdate', e?.toString?.()]);
      }
    }

    return res.status(200).json(post);
  };
