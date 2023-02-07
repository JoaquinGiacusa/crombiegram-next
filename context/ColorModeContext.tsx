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
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const modeStoraged = getCookie("mode");

    if (!modeStoraged) {
      return setCookie("mode", "dark", { maxAge: 60 * 60 * 24 * 30 });
    }

    setMode(modeStoraged as "dark");
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const prevMode = mode == "dark" ? "light" : "dark";
        setMode(prevMode);
        setCookie("mode", prevMode, { maxAge: 60 * 60 * 24 * 30 });
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
