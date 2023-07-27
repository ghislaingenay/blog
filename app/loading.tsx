import { PostItemCardLoading } from "./components/loading/components/PostItemLoading";
import TopicListLoading from "./components/loading/components/TopicListLoading";

export default function Loading() {
  return (
    <div className="grid grid-cols-5 lg:grid-cols-4 gap-3">
      <section className="col-span-5 lg:col-span-1 p-0 m-0 max-h-max lg:h-full">
        <TopicListLoading />
      </section>
      <section className="col-span-5 lg:col-span-3 ">
        <PostItemCardLoading />
      </section>
    </div>
  );
}
