import { configureServerSideSIWE } from "connectkit-next-siwe";

const SESSION_SECRET = process.env.SESSION_SECRET;

export const siweServer = configureServerSideSIWE({
  session: {
    cookieName: "connectkit-next-siwe",
    password: SESSION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});
