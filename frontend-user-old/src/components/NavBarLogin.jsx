import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailState } from "./Login";

const NavBarLogin = () => {
  const email = useRecoilState(emailState);
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="ml-8 lg:ml-0 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold text-white"
      >
        <Link to="/courses/purchased" className="flex items-center">
          My Courses
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold text-white"
      >
        <Link to="/courses" className="flex items-center">
          Courses
        </Link>
      </Typography>
    </ul>
  );

  const handleLogOut = () => {
    navigate("/login");
    localStorage.clear();
  };

  return (
    <div className="mt-2  -ml-4 max-h-[768px]  w-[calc(100%+48px)] lg:w-[calc(100%+52px) overflow-scroll">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-white bg-black h-16 ">
          <Typography
            as="a"
            href="#"
            className="ml-2 mr-4 cursor-pointer py-1.5"
          >
            <img className="w-28 h-12 -mt-2 lg:mt-0" src={logo} />
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block text-white">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block text-white"
                onClick={handleLogOut}
              >
                <span>Log Out</span>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="mr-8 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav className="bg-black" open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="text"
              size="sm"
              className="text-white"
              onClick={handleLogOut}
            >
              <span>Log Out</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default NavBarLogin;
