import { CommentsWithReactions } from "@interfaces/comments.interface";
import { APIResponse, Language } from "@interfaces/global.interface";

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
