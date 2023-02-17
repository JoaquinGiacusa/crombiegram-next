const BASE_URL = "http://ec2-34-201-161-29.compute-1.amazonaws.com/api";
//const BASE_URL = "http://34.201.161.29/api";
//const BASE_URL = "http://localhost:3000/api";

export function getSaveToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  } else {
    false;
  }
}

export const fetcher = async (
  path: RequestInfo,
  params?: RequestInit | undefined,
  isFormData?: true | false
) => {
  const url = BASE_URL + path;

  let options = undefined;
  if (params != undefined) {
    options = params;
  }

  const token = getSaveToken();
  options = {
    ...options,
    headers: {
      ...options?.headers,
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    credentials: "include" as RequestCredentials,
  };
  // }

  if (isFormData) {
    options = {
      ...options,
      headers: { authorization: `Bearer ${token}` },
    };
  }

  const res = await fetch(url, options);
  const data = await res.json();
  return data;
};
