import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ showSideBar }) => {
  const navigate = useNavigate();
  const menuItems = [
    {
      title: "Home",
      path: "/home",
    },
    {
      title: "Posted",
      path: "/posted",
    },
    {
      title: "AddNews",
      path: "/add",
    },
    {
      title: "Profile",
      path: "/profile",
    },
    {
      title: "Logout",
      path: "/logout",
    },
  ];

  const logOut=()=>{
    localStorage.removeItem('dailynews-user');
    navigate('/');
  };

  const renderMenuItems = () => {
    return menuItems.map((item, index) => {
      let key =
        Date.now().toLocaleString() +
        "-" +
        Math.round(Math.random() * 1000) +
        "-" +
        index;
      return item.title !== "Logout" ? (
        <Link
          key={key}
          to={item.path}
          className={`py-6 text-center hover:bg-[#145c2aaf] hover:text-white ${
            window.location.pathname.includes(item.path)
              ? "bg-[#145c2aaf] text-white font-bold"
              : "text-gray-400"
          }`}
        >
          {item.title}
        </Link>
      ) : (
        <span
          key={key}
          onClick={logOut}
          className="py-6 text-center hover:bg-[#145c2aaf] hover:text-white text-gray-400 cursor-pointer"
        >{item.title}</span>
      );
    });
  };

  return (
    <div
      className={`bg-primary transition-all text-white h-screen flex flex-col overflow-hidden ${
        showSideBar ? "w-40 sm:w-60" : "w-0"
      }`}
    >
      <div className="h-20 relative">
        <h1 className="text-2xl sm:text-3xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          DAILYNEWS
        </h1>
      </div>
      <div className="flex flex-col">{renderMenuItems()}</div>
    </div>
  );
};
export default SideBar;
