import { getAccessToken } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { OpinionAttrs } from "@interfaces/comments.interface";
import { AuthToken, TokenResponse } from "@interfaces/global.interface";

export const getToken = async (): Promise<AuthToken> => {
  try {
    const token = (await getAccessToken()) as TokenResponse;
    if (!token) return null;
    return token.accessToken;
  } catch (err) {
    return null;
  }
};

export const isCommentOwner = (
  comment: OpinionAttrs,
  user: UserProfile | undefined
): boolean => {
  if (!user) return false;
  if (comment.email !== user.email) return false;
  // if(comment.sub !== user.sub) return false;
  return true;
};
