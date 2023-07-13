export const getPostById = async (id: string) => {
  const searchParams = new URLSearchParams({ postId: id });
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?${searchParams}`
  );
  const post = await res.json();
  return post;
};
