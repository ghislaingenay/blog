import { Language } from "./global.interface";

export enum ReactionType {
  LIKE = "like",
  DISLIKE = "dislike",
  LOVE = "love",
  HAHA = "haha",
  WOW = "wow",
  SAD = "sad",
  ANGRY = "angry",
}

export type ReactionList = Record<ReactionType, number>;

export interface CommentsWithReactions extends OpinionAttrs {
  reactions: ReactionList;
}

export interface OpinionAttrs {
  opinionId?: string;
  email: string;
  postId: string;
  message: string;
  language: Language;
  isEdited?: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  userPicture?: string;
  name: string;
}

export interface CommentBody {
  language: Language;
  postId: string;
  message: string;
  email: string;
}
