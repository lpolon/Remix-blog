import type { LoaderFunction } from 'remix';
import type { Post } from '~/post';
import { useLoaderData } from 'remix';
import { getPost } from '~/post';
import invariant from 'tiny-invariant';

// dynamic route params
export const loader: LoaderFunction = async ({ params }) => {
  /*
  Quick note on that invariant. Because params comes from the URL, we can't be totally sure that params.slug will be defined--maybe you change the name of the file to $postId.ts! It's good practice to validate that stuff with invariant, and it makes TypeScript happy too.
  */
  invariant(params.slug, 'expected params.slug');
  // .slug key was attached to params because of filename $slug
  return getPost(params.slug);
};

const PostSlug: React.FC = () => {
  const post = useLoaderData<Post>();
  // TODO: keep following the tutorial. markdown parser. Consider trying MDX already.
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};

export default PostSlug;
