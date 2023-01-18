import React, {
  useEffect,
  createContext,
  useState,
  useMemo,
  useContext,
} from "react";

export const ThemeColorContext = createContext({
  toggleColorMode: () => {},
  mode: "dark",
});

const ThemeColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  // useEffect(() => {
  //   const modeStoraged = localStorage.getItem("mode");
  //   console.log(modeStoraged);
  //   setMode(modeStoraged as "dark");
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const modeStoraged = localStorage.getItem("mode");

      setMode(modeStoraged as "dark");
    }
  });
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const prevMode = mode == "dark" ? "light" : "dark";
        setMode(prevMode);
        localStorage.setItem("mode", prevMode);
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
