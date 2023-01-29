import { getCookie, setCookie } from "cookies-next";
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
        Cookie: `authToken=${authToken}; authExpires=${authExpires}`,
      },
      credentials: "include",
    });

    const { payload } = refreshTokenRes;

    setCookie("authToken", payload.authCookie, context);
    setCookie("authExpires", payload.expires, context);

    return true;
  }

  return false;
};

export default revalitaToken;
