import { PostItemCardLoading } from "./components/loading/components/PostItemLoading";

export default function Loading() {
  return (
    // <div className="grid grid-cols-5 lg:grid-cols-4 gap-10">
    //   <section className="col-span-5 lg:col-span-1 p-0 m-0 lg:h-full">
    //     <TopicListLoading />
    //   </section>
    //   <section className="col-span-5 lg:col-span-3">
    <PostItemCardLoading count={3} />
    //   </section>
    // </div>
  );
}
