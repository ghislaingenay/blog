import Link from "next/link";

interface PostItemProps {
  post: PostMeta;
  displayNumber: number;
}

export default function PostItem({ post, displayNumber }: PostItemProps) {
  const { title, topic } = post;
  //   const haveRemaining = displayNumber % 3;

  //   const stylingGrid: Record<number, React.CSSProperties> = {
  //     0: { gridColumnStart: 1, gridColumnEnd: 3, gridRowStart: 1, gridRowEnd: 2 },
  //     1: { gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 1, gridRowEnd: 3 },
  //     2: { gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 3 },
  //   };

  //   const classRowGrid = haveRemaining ? "col-span-2" : "";
  //   const classColgrid = haveRemaining ? "" : "row-span-2";
  // ;

  return (
    <li className="grid grid-cols-1 m-0 p-0 gap-y-8">
      <Link
        href={`/posts/${post.id}`}
        style={{
          textDecoration: "none",
          minHeight: "15rem",
        }}
      >
        <div className="border border-slate-400 rounded-lg shadow-md p-10 m-5 min-h-[15rem]">
          <h3 className="p-0 mt-0 mb-10">{title}</h3>
          <p className="p-0 mb-1">{topic}</p>
        </div>
      </Link>
    </li>
  );
}
