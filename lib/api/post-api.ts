export const getPostById = async (id: string): Promise<Post> => {
  const searchParams = new URLSearchParams({ postId: id });
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?${searchParams}`
  );
  const post: Post = await res.json();
  return post;
};
