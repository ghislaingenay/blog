import SpanCards from "@components/SpanCards";

export default function HomePosts() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <h3 id="#posts">Posts</h3>
      <SpanCards />
    </section>
  );
}
