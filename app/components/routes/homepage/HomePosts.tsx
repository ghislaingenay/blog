import SpanCards from "@components/SpanCards";
import Link from "next/link";

export default function HomePosts() {
  return (
    <section className="grid gap-4">
      <div className="flex justify-between align-baseline">
        <h3 id="#posts">Posts</h3>
        <Link href="/en/posts">View all</Link>
      </div>
      <SpanCards />
    </section>
  );
}
