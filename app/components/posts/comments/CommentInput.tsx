"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CommentsLoading } from "@components/loading/components/CommentsLoading";
import { AlertSuccess } from "@components/styles/Alert";
import { CommentBody, OpinionAttrs } from "@interfaces/comments.interface";
import {
  APIResponse,
  AuthToken,
  Dictionary,
  Language,
} from "@interfaces/global.interface";
import { isGoogleOAuth2 } from "@lib-api/comment-api";
import axios from "axios";
import dotenv from "dotenv";
import { useParams, useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import { FaCommentAlt } from "react-icons/fa";

dotenv.config();

type CommentInputProps = {
  dict: Dictionary;
  accessToken: AuthToken;
};
export const CommentInput = ({ dict, accessToken }: CommentInputProps) => {
  const router = useRouter();
  const queryParams = useParams();
  const { needGoogleAuthentication, needAuthentication } =
    dict.appDirectory.postIdPage.comments;
  const { user, isLoading } = useUser();

  const { title, description } =
    dict.appDirectory.postIdPage.comments.newCommentAlert;

  const headerClass =
    "text-red-600 text-center border border-red-500 py-3 rounded-xl bg-white";

  const [firstLoad, setFirstLoad] = useState(true);
  const [comment, setComment] = useState("");
  const deferredComment = useDeferredValue(comment);

  const [isCreated, setIsCreated] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const haveComment =
    typeof deferredComment === "string" && deferredComment !== "";
  const buttonClass =
    !haveComment || createLoading ? "bg-zinc-400 hover:bg-zinc-500" : "";

  const isButtonDisabled = !haveComment || createLoading;

  const commentBody: Omit<CommentBody, "email" | "message"> = {
    postId: queryParams.postId as string,
    language: queryParams.lang as Language,
  };

  const handleCreateComment = async () => {
    setCreateLoading(true);
    const createCommentBody: Omit<CommentBody, "email"> = {
      ...commentBody,
      message: deferredComment,
    };
    const createComment = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_END}/comments`,
      createCommentBody,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const response = createComment.data as APIResponse<OpinionAttrs>;
    if (!response.isSuccess) return undefined;
    else {
      setIsCreated(true);
      setTimeout(() => {
        setIsCreated(false);
        router.refresh();
      }, 2000);
      setCreateLoading(false);
    }
  };

  useEffect(() => setFirstLoad(false), []);
  if (firstLoad) return <CommentsLoading count={1} />;
  if (isLoading) return <CommentsLoading count={1} />;
  if (!isGoogleOAuth2(user))
    return <h3 className={headerClass}>{needGoogleAuthentication}</h3>;
  if (!user) return <h3 className={headerClass}>{needAuthentication}</h3>;
  return (
    <>
      <div className="px-5 py-2 bg-slate-200 rounded-lg gap-4 flex justify-between">
        <input
          id="message"
          name="message"
          type="text"
          className="rounded-lg ps-4 py-2 w-3/4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          disabled={isButtonDisabled}
          className={`${buttonClass} bg-blue-800 text-white p-2 py-auto h-8 my-auto rounded-2xl flex-none hover:bg-blue-300 hover:text-black`}
          onClick={() => handleCreateComment()}
        >
          <FaCommentAlt />
        </button>
      </div>
      {isCreated && <AlertSuccess message={description} title={title} />}
    </>
  );
};
