import { getTodayDateDiffString } from "@functions";
import { Dictionary } from "@interfaces/global.interface";
import { CommentsWithReactions } from "@lib-api/models/comments";
import { UserInfoPicture } from "../UserInfoPicture";

type CommentCardProps = {
  comment: CommentsWithReactions;
  dict: Dictionary;
};

export const CommentCard = ({ comment, dict }: CommentCardProps) => {
  const { createdAt, updatedAt, isEdited, userPicture, name, message } =
    comment;
  const selectedDate = isEdited ? updatedAt : createdAt;
  const edited = isEdited
    ? dict.appDirectory.postIdPage.comments.commentCard.edited
    : "";
  const formattedDate = `${edited}${getTodayDateDiffString(
    selectedDate,
    dict.date
  )}`;
  return (
    <div className="flex flex-wrap border-gray-500 border rounded-xl shadow-slate-700 p-4">
      <UserInfoPicture
        fullName={name}
        date={formattedDate}
        picture={userPicture as string}
      />
      <p className="my-1 italic">{message}</p>
    </div>
  );
};
