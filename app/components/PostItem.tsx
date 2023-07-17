interface PostItemProps {
  post: PostMeta;
}

export default function PostItem({ post }: PostItemProps) {
  return <p>{JSON.stringify(post)}</p>;
}
