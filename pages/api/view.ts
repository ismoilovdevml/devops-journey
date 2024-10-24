import { sql } from '@vercel/postgres';

import { factory } from './logic';

export default factory(
  'views',
  (path) => sql`INSERT INTO posts (path, views) VALUES (${path}, 1)`,
  (path, post) =>
    sql`UPDATE posts SET views = ${post.views} WHERE path = ${path}`,
);
