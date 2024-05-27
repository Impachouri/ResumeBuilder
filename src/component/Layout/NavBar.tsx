import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import useMouse from "@react-hook/mouse-position";
// import { motion } from "framer-motion";
import { UserContext } from "../../context/userContext/UserContext";
import { ApiContext } from "../../context/apiContext/ApiContext";
import { signOut } from "../../service/userApi";
import { LOGGED_OUT } from "../../context/constant";
import useRedirectToLogin from "../../utils/redirectToLogin";

const NavBar = () => {
  // const [cursorVariant, setCursorVariant] = useState("default");
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: apiState, dispatch: apiDispatch } = useContext(ApiContext);
  const naviagte = useRedirectToLogin();

  const location = useLocation();
  const ref = useRef(null);

  // const mouse = useMouse(ref, {
  //   enterDelay: 100,
  //   leaveDelay: 100,
  // });

  // const mouseXPosition = mouse.clientX || 592;
  // const mouseYPosition = mouse.clientY || 48;

  // const variants = {
  //   default: {
  //     opacity: 1,
  //     height: 10,
  //     width: 10,
  //     borderRadius: "50%",
  //     fontSize: "16px",
  //     backgroundColor: "#7C3AED",
  //     x: mouseXPosition - 20,
  //     y: mouseYPosition - 33,
  //     zIndex: 1,
  //     transition: {
  //       type: "spring",
  //       mass: 0.6,
  //     },
  //   },
  //   heading: {
  //     opacity: 0.5,
  //     backgroundColor: "#7C3AED",
  //     height: 100,
  //     width: 100,
  //     borderRadius: "50%",
  //     zIndex: 1,
  //     fontSize: "18px",
  //     x: mouseXPosition - 90,
  //     y: mouseYPosition - 50,
  //     transition: {
  //       type: "spring",
  //       mass: 0.6,
  //     },
  //   },
  // };

  // const spring = {
  //   type: "spring",
  //   stiffness: 500,
  //   damping: 28,
  // };

  const hanldeSignOut = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut(apiDispatch);
  };

  useEffect(() => {
    if (apiState.data && apiState.actionType === "SIGNOUT") {
      userDispatch({ type: LOGGED_OUT, payload: null });
      naviagte("/");
    }
  }, [userState, apiState, userDispatch, naviagte]);

  return (
    <nav
      ref={ref}
      className={` ${
        location.pathname === "/resume" && "bg-[#E2E8F0]"
      } fixed rounded-lg flex items-center justify-between  mt-5 p-5 w-[90%] z-[999]`}
    >
      {/* <motion.div
        variants={variants}
        className="absolute w-full h-full"
        animate={cursorVariant}
        transition={spring}
      ></motion.div> */}
      <div className="">
        <ul className="flex gap-5">
          <Link to="/">
            <li className="py-2 px-3 rounded-xl hover:bg-[#7C3AED] hover:text-white text-black text-lg font-bold cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="create">
            <li className="py-2 px-3 rounded-xl hover:bg-[#7C3AED] hover:text-white text-black text-lg font-bold cursor-pointer">
              Create
            </li>
          </Link>
        </ul>
      </div>
      <Link
        to="resume"
        className="cursor-none pointer-events-auto p-3 z-50"
        // onMouseEnter={() => setCursorVariant("heading")}
        // onMouseLeave={() => setCursorVariant("default")}
      >
        <h2 className="text-4xl font-extrabold text-black">Resume</h2>
      </Link>
      <div>
        <ul className="flex gap-5">
          {userState.user ? (
            <button onClick={hanldeSignOut}>
              <li className="py-2 px-3 rounded-xl  hover:bg-[#7C3AED] hover:text-white text-black text-lg font-bold">
                Sign Out
              </li>
            </button>
          ) : (
            <>
              <Link to="/signup">
                <li className="py-2 px-3 rounded-xl  hover:bg-[#7C3AED] hover:text-white text-black text-lg font-bold">
                  Sign Up
                </li>
              </Link>
              <Link to="/signin">
                <li className="py-2 px-3 rounded-xl text-white text-lg font-bold cursor-pointer transition ease-in-out delay-150 bg-[#7C3AED] hover:-translate-y-1 hover:scale-110 hover:bg-[#7C3AED] duration-300 ">
                  Sign In
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
