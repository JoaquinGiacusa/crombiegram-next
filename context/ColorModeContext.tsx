import React, {
  useEffect,
  createContext,
  useState,
  useMemo,
  useContext,
} from "react";
import { setCookie, getCookie } from "cookies-next";

export const ThemeColorContext = createContext({
  toggleColorMode: () => {},
  mode: "dark",
});

const ThemeColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const modeStoraged = getCookie("mode");
    setMode(modeStoraged as "dark");
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const prevMode = mode == "dark" ? "light" : "dark";
        setMode(prevMode);
        setCookie("mode", prevMode);
      },
    }),
    [mode]
  );
  return (
    <ThemeColorContext.Provider value={{ ...colorMode, mode }}>
      {children}
    </ThemeColorContext.Provider>
  );
};

export const useThemeColorContext = () => useContext(ThemeColorContext);

export default ThemeColorProvider;
