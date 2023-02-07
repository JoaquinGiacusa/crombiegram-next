import { setCookie } from "cookies-next";
import moment from "moment";
import { GetServerSidePropsContext } from "next";
import { fetcher } from "./fetcher";

const revalitaToken = async (
  authToken: string,
  authExpires: string,
  context?: GetServerSidePropsContext
) => {
  const isBefore = moment(Number(authExpires)).isBefore(Date.now());

  if (isBefore) {
    const refreshTokenRes = await fetcher("/auth/revalidate", {
      method: "POST",
      headers: {
        Cookie: `authToken=${authToken};`,
      },
      credentials: "include",
    });

    const { payload } = refreshTokenRes;

    setCookie("authToken", payload.authCookie, {
      ...context,
      maxAge: 60 * 60 * 24 * 7,
    });
    setCookie("authExpires", payload.expires, {
      ...context,
      maxAge: 60 * 60 * 24 * 7,
    });

    return true;
  }

  return false;
};

export default revalitaToken;
