import fs from 'fs/promises';
import path from 'path';
import fm from 'front-matter';
import invariant from 'tiny-invariant';

/*
These is my "controllers"
*/

export type Post = {
  slug: string;
  title: string;
};

type PostMarkdownAttr = Pick<Post, 'title'>;

const isValidPostAttr = (attr: unknown): attr is PostMarkdownAttr => {
  return typeof attr === 'object' && attr !== null && 'title' in attr;
};

export const getPost = async (slug: string): Promise<Post> => {
  const postsPath = path.join(__dirname, '..', 'posts');
  const filepath = path.join(postsPath, `${slug}.md`);
  const file = await fs.readFile(filepath);

  const { attributes } = fm(file.toString());

  invariant(
    isValidPostAttr(attributes),
    `Post ${filepath} is missing attributes`,
  );

  return {
    slug: slug,
    title: attributes.title,
  };
};

export const getPosts = async (): Promise<Post[]> => {
  // docs: relative to the server output not the source!
  const postsPath = path.join(__dirname, '..', 'posts');
  const dir = await fs.readdir(postsPath);

  /*

   we need a runtime check, for that we'll want an invariant method

   An invariant function takes a value, and if the value is falsy then the invariant function will throw. If the value is truthy, then the function will not throw.
  */

  const PostsProm = dir.map(async filename => {
    const file = await fs.readFile(path.join(postsPath, filename));
    const { attributes } = fm(file.toString());

    // pretty neat
    invariant(isValidPostAttr(attributes), `${filename} has bad meta data!`);

    return {
      slug: filename.replace(/\.md$/, ''),
      title: attributes.title,
    };
  });
  return Promise.all(PostsProm);
};
