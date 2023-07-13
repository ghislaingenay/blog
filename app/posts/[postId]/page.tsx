interface PostProps {
  params: {
    postId: string;
  };
}

export default function Post({ params: { postId } }: PostProps) {
  return (
    <div>
      <h1>Post</h1>
    </div>
  );
}
