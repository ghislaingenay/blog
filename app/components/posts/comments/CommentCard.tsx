import { getTodayDateDiffString } from "@functions";
import { CommentsWithReactions } from "@interfaces/comments.interface";
import { Dictionary } from "@interfaces/global.interface";
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
  const formattedDate = `${edited} ${getTodayDateDiffString(
    new Date(selectedDate as string),
    dict.date
  )}`;
  return (
    <div className="border-gray-500 border rounded-xl shadow-slate-700 p-4 flex-nowrap min-h-[120px]">
      <UserInfoPicture
        fullName={name}
        date={formattedDate}
        picture={userPicture as string}
      />
      <p className="my-1 italic">{message}</p>
    </div>
  );
};
