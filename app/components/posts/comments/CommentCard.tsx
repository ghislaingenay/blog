"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CommentsLoading } from "@components/loading/components/CommentsLoading";
import { BACK_END_URL } from "@constants/global.const";
import { getTodayDateDiffString } from "@functions";
import {
  CommentsWithReactions,
  OpinionAttrs,
} from "@interfaces/comments.interface";
import {
  APIResponse,
  AuthToken,
  Dictionary,
} from "@interfaces/global.interface";
import { isCommentOwner } from "@lib/functions/auth.fn";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { UserInfoPicture } from "../UserInfoPicture";

type CommentCardProps = {
  comment: CommentsWithReactions;
  dict: Dictionary;
  accessToken: AuthToken;
};

export const CommentCard = ({
  comment,
  dict,
  accessToken,
}: CommentCardProps) => {
  const router = useRouter();
  const {
    createdAt,
    updatedAt,
    isEdited,
    userPicture,
    name,
    message,
    opinionId,
  } = comment;
  const selectedDate = isEdited ? updatedAt : createdAt;
  const edited = isEdited
    ? dict.appDirectory.postIdPage.comments.commentCard.edited
    : "";
  const formattedDate = `${edited} ${getTodayDateDiffString(
    new Date(selectedDate as string),
    dict.date
  )}`;

  const [newMessage, setNewMessage] = useState(message);
  const deferredComment = useDeferredValue(newMessage);
  const haveMessage =
    typeof deferredComment === "string" && deferredComment !== "";

  const buttonDict = dict.buttons;
  const commentDict = dict.appDirectory.postIdPage.comments.commentCard;

  const { user, isLoading } = useUser();
  const [canEdit, setCanEdit] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);

  const [loading, setLoading] = useState(false);
  const ellipsisHidden = loading ? "hidden" : "";

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const isOwner = isCommentOwner(comment, user);
    setCanEdit(isOwner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const deleteComment = async () => {
    setLoading(true);
    const deleteResponse = (await axios
      .delete(`${BACK_END_URL}/comments/${opinionId}/${dict.language}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((err) => {
        console.log(err);
      })) as AxiosResponse<APIResponse<OpinionAttrs>>;
    const { isSuccess } = deleteResponse.data as APIResponse;
    if (isSuccess) router.refresh();
    cancelDelete();
    setLoading(false);
  };

  const editComment = async () => {};

  const cancelDelete = () => {
    setIsDropDown(false);
    setIsDeleting(false);
  };

  const cancelEdit = () => {
    setIsDropDown(false);
    setIsEditing(false);
  };

  if (isDeleting) {
    return (
      <div className="border-gray-500 border rounded-xl shadow-slate-700 p-4 flex-nowrap min-h-[120px] relative grid grid-cols-2 gap-3">
        <p className="col-span-2 text-center text-red-500 font-bold m-0">
          {commentDict.deleteComment}
        </p>
        <button
          className="col-span-1 p-1 bg-red-500 hover:bg-red-800 hover:text-white"
          onClick={cancelDelete}
        >
          <span className="font-bold uppercase">{buttonDict.cancel}</span>
        </button>
        <button
          className="col-span-1 p-1 bg-purple-500 hover:bg-purple-800 hover:text-white"
          onClick={deleteComment}
        >
          <span className="font-bold uppercase">{buttonDict.delete}</span>
        </button>
      </div>
    );
  }

  const globalLoading = loading || isLoading;
  if (globalLoading) return <CommentsLoading count={1} />;

  return (
    <div className="border-gray-500 border rounded-xl shadow-slate-700 p-4 flex-nowrap min-h-[120px] relative">
      {canEdit && (
        <>
          {isDropDown && (
            <div className="animate-fade animate-duration-200 absolute z-10 h-10 px-2 pt-1 max-w-max rounded-md border border-gray-200 bg-white top-[3.5rem] right-5 space-x-2">
              <span
                className="text-xs uppercase mb-0 hover:bg-slate-200 p-1 rounded-lg text-center "
                onClick={() => setIsEditing(true)}
              >
                {buttonDict.edit}
              </span>
              <span
                className="text-xs uppercase mb-0 hover:bg-slate-200 p-1 rounded-lg text-center"
                onClick={() => setIsDeleting(true)}
              >
                {buttonDict.delete}
              </span>
            </div>
          )}
          <div
            className={`${ellipsisHidden} absolute top-[1.5rem] right-[1rem]`}
          >
            <button className="text-gray-500 hover:text-gray-700">
              <FaEllipsisV
                className="text-lg"
                onClick={() => setIsDropDown((prevValue) => !prevValue)}
              />
            </button>
          </div>
        </>
      )}
      <UserInfoPicture
        fullName={name}
        date={formattedDate}
        picture={userPicture as string}
      />
      {isEditing ? (
        <div className="flex flex-wrap">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value || "")}
          />
          <button
            className="bg-blue-800 text-white p-2 disabled:bg-gray-500 disabled:text-black uppercase"
            disabled={!haveMessage}
          >
            {buttonDict.save}
          </button>
          <button
            className="bg-red-800 text-white p-2 disabled:bg-gray-500 disabled:text-black uppercase"
            disabled={!haveMessage}
            onClick={cancelEdit}
          >
            {buttonDict.cancel}
          </button>
        </div>
      ) : (
        <p className="my-1 italic">{newMessage}</p>
      )}
    </div>
  );
};
