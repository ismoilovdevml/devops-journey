import { sql } from '@vercel/postgres';

import { factory } from './logic';

export default factory(
  'likes',
  (path) => sql`INSERT INTO posts (path, likes) VALUES (${path}, 1)`,
  (path, post) =>
    sql`UPDATE posts SET likes = ${post.likes} WHERE path = ${path}`,
);
