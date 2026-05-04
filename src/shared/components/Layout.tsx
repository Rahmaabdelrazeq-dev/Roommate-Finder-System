import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <header className="p-4 shadow">Navbar</header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;