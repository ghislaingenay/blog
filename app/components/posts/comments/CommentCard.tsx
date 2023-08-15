"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CommentsLoading } from "@components/loading/components/CommentsLoading";
import { getTodayDateDiffString } from "@functions";
import { CommentsWithReactions } from "@interfaces/comments.interface";
import { Dictionary } from "@interfaces/global.interface";
import { isCommentOwner } from "@lib/functions/auth.fn";
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { UserInfoPicture } from "../UserInfoPicture";

type CommentCardProps = {
  comment: CommentsWithReactions;
  dict: Dictionary;
};

export const CommentCard = ({ comment, dict }: CommentCardProps) => {
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

  const buttonDict = dict.buttons;

  const { user, isLoading } = useUser();
  const [canEdit, setCanEdit] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const isOwner = isCommentOwner(comment, user);
    setCanEdit(isOwner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const deleteComment = async () => {
    console.log("clicked here");
  };

  const cancelDelete = () => {
    setIsDropDown(false);
    setIsDeleting(false);
  };

  if (isDeleting) {
    return (
      <div className="border-gray-500 border rounded-xl shadow-slate-700 p-4 flex-nowrap min-h-[120px] relative">
        <p className="my-1 italic" onClick={() => cancelDelete()}>
          {buttonDict.cancel}
        </p>
        <p className="my-1 italic" onClick={() => deleteComment()}>
          {buttonDict.delete}
        </p>
      </div>
    );
  }

  if (isLoading) return <CommentsLoading count={1} />;

  return (
    <div className="border-gray-500 border rounded-xl shadow-slate-700 p-4 flex-nowrap min-h-[120px] relative">
      {canEdit && (
        <>
          {isDropDown && (
            <div className="animate-fade-down animate-fade absolute z-10 h-10 px-2 pt-1 max-w-max rounded-md border border-gray-200 bg-white top-[3.5rem] right-5 space-x-2">
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
          <div className="absolute top-[1.5rem] right-[1rem]">
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
      <p className="my-1 italic">{message}</p>
    </div>
  );
};
