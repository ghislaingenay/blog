import { Language } from "@interfaces/global.interface";
import { CommentAttrs, CommentsWithReactions } from "./models/comments";

export const isGoogleOAuth2 = (payload: any): boolean =>
  payload.sub && /google-oauth2/i.test(payload.sub) ? true : false;

// GET COMMENTS BY POST ID
const getCommentByPostIdMessageError = (lang: Language) => {
  const langDict = {
    [Language.ENGLISH]: "Impossible to get comments. Please try again later",
    [Language.FRENCH]:
      "Impossible de récupérer les commentaires. Veuillez réessayer plus tard",
  };
  return langDict[lang];
};

export const getCommentsByPostId = async (
  postId: PostMeta["id"],
  lang: Language
) => {
  const urlParams = new URLSearchParams({
    postId,
    language: lang,
  });
  const getComments = await fetch(
    `${process.env.WEBSITE_URL}/api/comments?${urlParams}`
  );
  const response = await getComments.json();
  const errorMessage = getCommentByPostIdMessageError(lang);
  if (!response.isSuccess) return undefined;
  else return response.data as CommentsWithReactions[];
};

const createCommentErrorMessage = (lang: Language) => {
  const langDict = {
    [Language.ENGLISH]:
      "Impossible to create the comment. Please try again later",
    [Language.FRENCH]:
      "Impossible de créer le commentaire. Veuillez réessayer plus tard",
  };
  return langDict[lang];
};

export const createComment = async (
  body: CommentAttrs
): Promise<{ result: boolean }> => {
  const createComment = await fetch(`${process.env.WEBSITE_URL}/api/comments`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await createComment.json();
  return { result: response.isSuccess };
};

// const editCommentMessageError = (lang: Language) => {
//   const langDict = {
//     [Language.ENGLISH]:
//       "Impossible to edit the comment. Please try again later",
//     [Language.FRENCH]:
//       "Impossible de changer le commentaire. Veuillez réessayer plus tard",
//   };
//   return langDict[lang];
// };
// export const editComment = async (
//   commentId: CommentDoc["id"],
//   message: CommentAttrs["message"],
//   lang: Language
// ) => {
//   try {
//     const comment = await Comment.findByIdAndUpdate(
//       { _id: commentId },
//       { message, isEdited: true, updatedAt: new Date() },
//       { new: true }
//     );
//     if (!comment) return { isSuccess: false };
//     return { isSuccess: true, data: comment };
//   } catch (err: any) {
//     const errorMessage = editCommentMessageError(lang);
//     return { isSuccess: false, errorMessage };
//   }
// };

// const createCommentErrorMessage = (lang: Language) => {
//   const langDict = {
//     [Language.ENGLISH]:
//       "Impossible to create the comment. Please try again later",
//     [Language.FRENCH]:
//       "Impossible de créer le commentaire. Veuillez réessayer plus tard",
//   };
//   return langDict[lang];
// };

// export const createComment = async (body: CommentAttrs) => {
//   try {
//     const comment = Comment.build(body);
//     await comment.save();
//     return { isSuccess: true, data: comment };
//   } catch (err: any) {
//     const errorMessage = createCommentErrorMessage(body.language);
//     return { isSuccess: false, errorMessage };
//   }
// };

// reactions

// export const createReaction = async (reactionBody: ReactionCommentAttrs) => {
//   try {
//     const reaction = ReactionComment.build(reactionBody);
//     await reaction.save();
//     return { isSuccess: true };
//   } catch (err: any) {
//     return { isSuccess: false };
//   }
// };

// export const editReaction = async (
//   reactionid: string,
//   reactionBody: Pick<ReactionCommentAttrs, "isActive" | "reactionType">
// ) => {
//   try {
//     const reaction = await ReactionComment.findByIdAndUpdate(
//       { _id: reactionid },
//       reactionBody,
//       { new: true }
//     );
//     if (!reaction) return { isSuccess: false };
//     return { isSuccess: true, data: reaction };
//   } catch (err: any) {
//     return { isSuccess: false };
//   }
// };
