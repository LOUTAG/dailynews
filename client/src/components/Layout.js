import React, { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import SideBar from "./SideBar";

const Layout = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="layout flex">
      {" "}
      {/* here is the frame */}
      <div className="sidebar">
        {" "}
        {/* left-content */}
        <SideBar showSideBar={showSideBar} />
      </div>
      <div className="w-full">
        {" "}
        {/* right-content */}
        <div className="header bg-primary h-20 w-full relative flex items-center justify-end">
          <HiOutlineMenuAlt1
            size={50}
            className="cursor-pointer text-gray-400 absolute top-1/2 left-1 -translate-y-1/2 hover:text-white"
            onClick={() => setShowSideBar(!showSideBar)}
          />
          <div
            className="mr-5 text-gray-400 flex flex-col items-center cursor-pointer hover:text-white"
            onClick={() => navigate("/profile")}
          >
            <AiOutlineUser size={30} />
            <span className="font-semibold text-sm">
              {JSON.parse(
                localStorage.getItem("dailynews-user")
              ).name.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="content overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
