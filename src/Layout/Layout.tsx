import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { ApiContext } from "../context/apiContext";
import Loading from "../utils/Loading";

const Layout = () => {
  const { state: apiState } = useContext(ApiContext);
  return (
    <div className="w-screen bg-background text-white flex flex-col">
      <header>
        <div className="w-screen flex item-center justify-center">
          <NavBar />
        </div>
      </header>
      <main>
        {apiState.loading && <Loading />}
        <ToastContainer />

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
