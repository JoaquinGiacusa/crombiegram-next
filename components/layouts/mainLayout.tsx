import { ReactComponentElement, ReactNode } from "react";
import { SWRConfig, SWRConfiguration } from "swr";
import ResponsiveAppBar from "../Navbar";

export const MainLayout = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: SWRConfiguration;
}) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <ResponsiveAppBar></ResponsiveAppBar>
        {children}
      </SWRConfig>
    </>
  );
};

export default MainLayout;
