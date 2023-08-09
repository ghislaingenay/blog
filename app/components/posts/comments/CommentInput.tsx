"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CommentsLoading } from "@components/loading/components/CommentsLoading";
import { Dictionary } from "@interfaces/global.interface";
import { createComment } from "@lib-api/comment-api";
import { useRouter } from "next/navigation";
import { useDeferredValue, useState } from "react";
import { FaCommentAlt } from "react-icons/fa";

type CommentInputProps = {
  dict: Dictionary;
};
export const CommentInput = ({ dict }: CommentInputProps) => {
  const router = useRouter();
  const { needGoogleAuthentication, needAuthentication } =
    dict.appDirectory.postIdPage.comments;
  const { user, isLoading } = useUser();
  // if (!isGoogleOAuth2(user))
  //   return <h3 className="text-red-600">{needGoogleAuthentication}</h3>;

  const [comment, setComment] = useState("");
  const deferredComment = useDeferredValue(comment);

  const [createLoading, setCreateLoading] = useState(false);

  const haveComment =
    typeof deferredComment === "string" && deferredComment !== "";
  const buttonClass =
    !haveComment || createLoading ? "bg-zinc-400 hover:bg-zinc-500" : "";

  const handleCommentCreate = async () => {
    if (!haveComment) return;
    setCreateLoading(true);
    const res = await createComment({
      postId: router.query.postId as string,
    })
  };

  const isButtonDisabled = !haveComment || createLoading;

  if (isLoading) return <CommentsLoading count={1} />;
  if (!user) return <h3 className="text-red-600">{needAuthentication}</h3>;
  return (
    <div className="px-5 py-2 bg-slate-200 rounded-lg gap-4 flex justify-between">
      <input
        type="text"
        className="rounded-lg ps-4 w-3/4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={() => handleCommentCreate()}
        type="submit"
        disabled={isButtonDisabled}
        className={`${buttonClass} bg-blue-800 text-white p-2 rounded-2xl flex-none hover:bg-blue-300 hover:text-black`}
      >
        <FaCommentAlt />
      </button>
    </div>
  );
};
