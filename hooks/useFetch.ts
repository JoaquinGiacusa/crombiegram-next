import React from "react";
import { useUserContext } from "../context/UserContext";

type FetchParams = {
  path: string;
  data?: Record<string, unknown>;
  method?: "POST" | "GET" | "PUT" | "DELETE";
};

const useFetch = () => {
  const { token } = useUserContext();
  return async ({ path, data, method }: FetchParams) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${path}`, {
        body: JSON.stringify(data),
        method,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const JSONresult = await response.json();
      return JSONresult;
    } catch (error) {
      console.error(error);
    }
  };
};

export default useFetch;
