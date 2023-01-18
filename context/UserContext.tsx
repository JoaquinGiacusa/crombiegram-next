import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const UserContext = React.createContext({
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  profileImage: "",
  handleSetValues: (key: string, value: string) => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
    // token: localStorage.getItem("token") ?? "",
    token: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      // console.log(token);
      setValues({ ...values, token: token ? token : "" });
      // setValues((prev) => {
      //   return { ...prev };
      // });
    }
  }, []);

  const handleSetValues = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  // const handleFetch = useFetch();
  // useEffect(() => {
  //   if (values.token != "") {
  //     const jsonResponse = handleFetch({
  //       path: "user/me",
  //       method: "GET",
  //     }).then((res) => {
  //       console.log(res);
  //     });
  //   }
  // }, [values.token]);

  return (
    <UserContext.Provider value={{ ...values, handleSetValues }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
