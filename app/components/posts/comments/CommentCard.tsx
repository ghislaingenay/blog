import { Dictionary } from "@interfaces/global.interface";
import { CommentsWithReactions } from "@lib-api/models/comments";

type CommentCardProps = {
  comment: CommentsWithReactions;
  dict: Dictionary;
};

export const CommentCard = ({ comment, dict }: CommentCardProps) => {
  return <></>;
};
