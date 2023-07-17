import PostList from "./components/PostList";

export const revalidate = 20;

export default function Home() {
  return (
    <div>
      <PostList />
    </div>
  );
}
