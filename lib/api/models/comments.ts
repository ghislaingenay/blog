import { Language } from "@interfaces/global.interface";
import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

// what it takes to cerate a user
export interface CommentAttrs {
  commentId?: typeof ObjectId;
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

export interface CommentDoc extends mongoose.Document {
  email: string;
  postId: string;
  message: string;
  language: Language;
  createdAt: Date | string;
  updatedAt: Date | string;
  userPicture?: string;
  isEdited?: boolean;
  name: string;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

mongoose.set("strictQuery", false);
const commentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    language: {
      type: String,
      enum: Object.values(Language),
      required: true,
      default: "en",
    },
    userPicture: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
    isEdited: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc: mongoose.Document, ret: any) {
        delete ret.__v;
        ret.commentId = ret._id;
        delete ret._id;
      },
    },
  }
);

// Add a static method to the model to check type
commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment =
  mongoose.models.comments ??
  mongoose.model<CommentDoc, CommentModel>("comments", commentSchema);

export { Comment };

export type ReactionsList = Array<
  "like" | "dislike" | "love" | "haha" | "wow" | "sad" | "angry"
>;

export interface CommentsWithReactions extends CommentDoc {
  reactions: ReactionsList;
}
