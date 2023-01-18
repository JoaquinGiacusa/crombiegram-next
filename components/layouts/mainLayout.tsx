import ResponsiveAppBar from "../Navbar";

export const MainLayout = ({ children }: any) => {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      {children}
    </>
  );
};

export default MainLayout;
