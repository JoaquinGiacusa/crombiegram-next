const BASE_URL = "http://localhost:3000/api";

export const fetcher = async (
  path: RequestInfo,
  // params: RequestInit | undefined
  params: any
) => {
  const url = BASE_URL + path;

  let options = undefined;
  if (params != undefined) {
    options = params;
  }

  // @ts-ignore
  if (params?.body?.formData) {
    options.body?.formData.append();
  }

  const token = getSaveToken();
  // console.log(token);
  if (token) {
    options = {
      ...options,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
  }
  // console.log("opciones", options);
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
};

export function getSaveToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  } else {
    false;
  }
}
