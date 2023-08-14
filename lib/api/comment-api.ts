"use server";

import {
  CommentBody,
  CommentsWithReactions,
  OpinionAttrs,
} from "@interfaces/comments.interface";
import { APIResponse, Language } from "@interfaces/global.interface";
import { getToken } from "@lib/functions/auth.fn";

export const isGoogleOAuth2 = (payload: any): boolean =>
  payload.sub && /google-oauth2/i.test(payload.sub) ? true : false;

export const getCommentsByPostId = async (
  postId: PostMeta["id"],
  lang: Language
) => {
  const getComments = await fetch(
    `${process.env.BACK_END}/comments/${postId}?language=${lang}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response = (await getComments.json()) as APIResponse<
    CommentsWithReactions[]
  >;
  if (!response.isSuccess) return undefined;
  else return response.data as CommentsWithReactions[];
};

export const createComment = async (body: Omit<CommentBody, "email">) => {
  const accessToken = await getToken();
  console.log("here");
  const createComment = await fetch(`${process.env.BACK_END}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  const response = (await createComment.json()) as APIResponse<OpinionAttrs>;
  if (!response.isSuccess) return undefined;
  else return response.data;
};
