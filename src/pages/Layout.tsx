import { Outlet } from "react-router-dom";

const Layout: React.FunctionComponent = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
