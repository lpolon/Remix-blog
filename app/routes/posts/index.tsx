import type { LoaderFunction } from 'remix';
import { useLoaderData, Link } from 'remix';
import { getPosts } from '~/post';
import type { Post } from '~/post';

// this is my "API". "Views" using react as template-like (but there is hydration and stuff)
export const loader: LoaderFunction = () => {
  return getPosts();
};

// and this is my client code
const Posts: React.FC = () => {
  const posts = useLoaderData<Post[]>();
  return (
    <div>
      <h1>posts</h1>
      <ul>
        {posts.map(({ slug, title }) => {
          return (
            <li>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
