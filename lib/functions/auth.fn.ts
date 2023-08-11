import { getAccessToken } from "@auth0/nextjs-auth0";
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
