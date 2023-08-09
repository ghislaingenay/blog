import { handleAuth, handleLogout } from "@auth0/nextjs-auth0";

const domain =
  process.env.NODE_ENV === "production"
    ? process.env.WEBSITE_URL
    : "http://localhost:3000/";

export const GET = handleAuth({
  // login: handleLogin({
  //   authorizationParams: {
  //     audience: process.env.AUTH0_AUDIENCE,
  //     redirect_uri: `${domain}/api/auth/callback`,
  //   },
  // }),
  // callback: handleCallback({
  //   redirectUri: `${domain}/api/auth/callback`,
  // }),
  logout: handleLogout({
    returnTo: domain,
  }),
});
