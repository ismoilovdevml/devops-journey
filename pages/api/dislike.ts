import { sql } from '@vercel/postgres';

import { factory } from './logic';

export default factory(
  'dislikes',
  (path) => sql`INSERT INTO posts (path, dislikes) VALUES (${path}, 1)`,
  (path, post) =>
    sql`UPDATE posts SET dislikes = ${post.dislikes} WHERE path = ${path}`,
);
