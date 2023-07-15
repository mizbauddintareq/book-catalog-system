import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/Vector_Book_blue.svg.png";
import { setUser } from "../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Navbar: React.FC = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const { user } = useAppSelector((state) => state.user);
  const localUser = localStorage.getItem("user");
  const dispatch = useAppDispatch();

  console.log(user);

  const location = useLocation();

  // Define a function to determine if a NavLink is active
  const isActiveNavLink = (path: string) => {
    return location.pathname === path;
  };

  // Apply custom styles to the active NavLink
  const activeNavLinkStyle = {
    color: "#06B6D4",
  };

  const handleLogOut = () => {
    dispatch(setUser(null));
    localStorage.removeItem("user");
  };

  return (
    <header className="border-b-1 relative z-20 w-full border-b border-slate-200 bg-indigo-800 text-white shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
      <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
        <nav
          aria-label="main navigation"
          className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
          role="navigation"
        >
          {/* Brand logo */}
          <Link
            to="/"
            aria-current="page"
            className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
          >
            <img src={logo} alt="" className="w-12" />
            <span className="text-cyan-700 font-mono font-medium text-lg">
              The Book Oasis
            </span>
          </Link>

          {/* Mobile trigger */}
          <button
            className={`relative order-10 block h-10 w-10 self-center lg:hidden ${
              isToggleOpen
                ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                : ""
            }`}
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            aria-expanded={isToggleOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
            </div>
          </button>

          {/* Navigation links */}
          <ul
            role="menubar"
            aria-label="Select page"
            className={`absolute top-0 left-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-indigo-800/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-indigo-800/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
              isToggleOpen
                ? "visible opacity-100 backdrop-blur-sm"
                : "invisible opacity-0"
            }`}
          >
            <li role="none" className="flex items-stretch">
              <NavLink
                to="/"
                style={isActiveNavLink("/") ? activeNavLinkStyle : undefined}
                role="menuitem"
                aria-haspopup="false"
                className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-cyan-500 focus:bg-cyan-50 focus:outline-none focus-visible:outline-none lg:px-8"
              >
                <span>Home</span>
              </NavLink>
            </li>

            <li role="none" className="flex items-stretch">
              <NavLink
                to="/allbooks"
                style={
                  isActiveNavLink("/allbooks") ? activeNavLinkStyle : undefined
                }
                role="menuitem"
                aria-haspopup="false"
                className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-cyan-500 focus:bg-cyan-50 focus:outline-none focus-visible:outline-none lg:px-8"
              >
                <span>All Books</span>
              </NavLink>
            </li>

            {!(user.email || localUser) ? (
              <>
                <li role="none" className="flex items-stretch">
                  <NavLink
                    to="/login"
                    style={
                      isActiveNavLink("/login") ? activeNavLinkStyle : undefined
                    }
                    role="menuitem"
                    aria-haspopup="false"
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-cyan-500 focus:bg-cyan-50 focus:outline-none focus-visible:outline-none lg:px-8"
                  >
                    <span>Sign in</span>
                  </NavLink>
                </li>
                <li role="none" className="flex items-stretch">
                  <NavLink
                    to="/register"
                    style={
                      isActiveNavLink("/register")
                        ? activeNavLinkStyle
                        : undefined
                    }
                    role="menuitem"
                    aria-haspopup="false"
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-cyan-500 focus:bg-cyan-50 focus:outline-none focus-visible:outline-none lg:px-8"
                  >
                    <span>Sign up</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li role="none" className="flex items-stretch">
                  <NavLink
                    to="/addnew"
                    style={
                      isActiveNavLink("/addnew")
                        ? activeNavLinkStyle
                        : undefined
                    }
                    role="menuitem"
                    aria-haspopup="false"
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-cyan-500 focus:bg-cyan-50 focus:outline-none focus-visible:outline-none lg:px-8"
                  >
                    <span>Add New Book</span>
                  </NavLink>
                </li>
                <li role="none" className="flex items-stretch">
                  <button
                    onClick={handleLogOut}
                    role="menuitem"
                    aria-haspopup="false"
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-cyan-500 focus:bg-cyan-50 focus:outline-none focus-visible:outline-none lg:px-8"
                  >
                    <span>Log Out</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
