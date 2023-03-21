import "@/styles/globals.css";
import ThemeContext from "@/themes";
import type { AppProps } from "next/app";

import ThemeColorProvider from "@/context/ColorModeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeColorProvider>
      <ThemeContext>
        <Component {...pageProps} />
      </ThemeContext>
    </ThemeColorProvider>
  );
}
