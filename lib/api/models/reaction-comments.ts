import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

export type Reactions =
  | "like"
  | "dislike"
  | "love"
  | "haha"
  | "wow"
  | "sad"
  | "angry";

export interface ReactionCommentAttrs {
  commentId: typeof ObjectId;
  reactionType: Reactions;
  email: string;
  isActive?: boolean;
}

export interface ReactionCommentDoc extends mongoose.Document {
  commentId: typeof ObjectId;
  reactionType: Reactions;
  email: string;
  isActive?: boolean;
}

interface ReactionCommentModel extends mongoose.Model<ReactionCommentDoc> {
  build(attrs: ReactionCommentAttrs): ReactionCommentDoc;
}
mongoose.set("strictQuery", false);
const reactionCommentSchema = new mongoose.Schema(
  {
    commentId: {
      type: ObjectId,
      required: true,
    },
    reactionType: {
      type: String,
      enum: ["like", "dislike", "love", "haha", "wow", "sad", "angry"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    toJSON: {
      transform(doc: mongoose.Document, ret) {
        delete ret.__v;
      },
    },
  }
);

reactionCommentSchema.statics.build = (attrs: ReactionCommentAttrs) => {
  return new ReactionComment(attrs);
};

const ReactionComment =
  mongoose.models.reactioncomments ??
  mongoose.model<ReactionCommentDoc, ReactionCommentModel>(
    "reactioncomments",
    reactionCommentSchema
  );

export { ReactionComment };
