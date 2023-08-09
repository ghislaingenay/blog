import { handleAuth, handleLogout } from "@auth0/nextjs-auth0";

// const domain =
//   process.env.NODE_ENV === "production"
//     ? process.env.WEBSITE_URL
//     : "localhost:3000";

export const GET = handleAuth({
  //   login: handleLogin({
  //     authorizationParams: {
  //       audience: process.env.AUTH0_AUDIENCE,
  //       redirect_uri: `https://${domain}/api/auth/callback`,
  //     },
  //   }),
  //   callback: handleCallback({
  //     redirectUri: `https://${domain}/api/auth/callback`,
  //   }),
  logout: handleLogout({
    returnTo: `http://localhost:3000/`,
  }),
});
