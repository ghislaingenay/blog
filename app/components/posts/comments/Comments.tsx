"use server";
import { AlertInfo } from "@components/styles/Alert";
import { Divider } from "@components/styles/Divider";
import { Language } from "@interfaces/global.interface";
import { getCommentsByPostId } from "@lib-api/comment-api";
import { notFound } from "next/navigation";
import { getDictionary } from "../../../[lang]/dictionaries";
import { CommentCard } from "./CommentCard";
import { CommentInput } from "./CommentInput";

type CommentsProps = {
  postId: string;
  lang: Language;
};

export default async function Comments({
  postId,
  lang,
}: CommentsProps): Promise<JSX.Element> {
  const dict = await getDictionary(lang);
  const { title, description } =
    dict.appDirectory.postIdPage.comments.alertNoComments;
  const comments = await getCommentsByPostId(postId, lang);
  if (!comments) notFound;
  if (comments!.length === 0)
    return (
      <>
        <div className="my-3">
          <AlertInfo title={title} message={description} />
        </div>
        <CommentInput dict={dict} />
      </>
    );

  return (
    <>
      <ul className="list-none list-inside p-0">
        {comments?.map((comment) => (
          <li key={comment._id} className="mb-5 p-0">
            <CommentCard comment={comment} dict={dict} />
          </li>
        ))}
      </ul>
      <Divider />
      <CommentInput dict={dict} />
    </>
  );
}
