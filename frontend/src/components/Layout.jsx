import React, { useContext, useEffect, useState } from "react";
import { cn } from "../lib/utils";
import {
  BarChart3,
  ChevronRight,
  HelpCircle,
  MessageSquare,
  Settings,
  Star,
  X,
} from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Link, Outlet, useLocation } from "react-router-dom";
import gradientOverlay from "/gradientOverlay.svg";
import Logout from "./Logout";
import { Icon } from "@iconify/react";
import { Button } from "./ui/button";
import { useFilterContext } from "../context/FilterContext";

export const SidebarItem = ({ icon, label, to, active }) => {
  return (
    <Link to={to}>
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors",
          active
            ? "bg-neutral-800 text-white"
            : "text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800/50"
        )}
      >
        <div className="flex items-center justify-center w-5 h-5">{icon}</div>
        <span className="text-md font-medium">{label}</span>
      </div>
    </Link>
  );
};

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const { admin, loading, error } = useFilterContext()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // if (loading)
  //   return (
  //   <>loading</>
  //   );
  // if (error)
  //   return <p className="text-center text-red-500 text-lg">Error: {error}</p>;
  return (
    <div className="flex h-screen font-[Open_Sauce_Sans] overflow-x-hidden  bg-black text-white">
      {/* Mobile Toggle Button */}
      {/* <Button
        variant="ghost"
        size="icon"
        className=""
        
      > */}
      <Icon
        icon="tabler:menu-deep"
        width="30"
        height="30"
        className="text-white md:hidden fixed top-9 right-5 z-40"
        onClick={toggleSidebar}
      />
      {/* </Button> */}

      {/* Sidebar for mobile (full screen when open) */}
      <div
        className={`md:hidden fixed inset-0 bg-black z-40 transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full w-full">
          {/* Close button */}
          {/* <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-10 w-10 text-white z-50" />
            </Button>
          </div> */}

          {/* Logo */}
          <div className="px-6 pt-2  flex justify-between items-center">
            <img src="/star.png" alt="logo" />

            <X className="h-8 w-8 text-white z-50" onClick={toggleSidebar} />
            {/* </Button> */}

          </div>
<div className="m-4 mx-6">

          <Separator className="  bg-neutral-800" />
</div>

          {/* Navigation */}
          <div className="flex-1 px-3 py-2">
            <nav className="space-y-2" onClick={toggleSidebar}>
              <SidebarItem
                icon={
                  <Icon
                    icon="material-symbols:star-outline-rounded"
                    width="22"
                    height="22"
                  />
                }
                label="Overview"
                to="/dashboard"
                active={path === "/dashboard"}
              />
              <SidebarItem
                icon={
                  <Icon icon="ic:baseline-insights" width="20" height="20" />
                }
                label="Review Breakdown"
                to="/breakdown"
                active={path === "/breakdown"}
              />
              <SidebarItem
                icon={<Icon icon="mdi:performance" width="20" height="20" />}
                label="Performance"
                to="/performance"
                active={path === "/performance"}
              />
              <SidebarItem
                icon={
                  <Icon icon="ri:notification-line" width="20" height="20" />
                }
                label="Notification"
                to="/notification"
                active={path === "/notification"}
              />
            </nav>
          </div>

          {/* User */}
          <div className="p-4  flex flex-col items-start gap-5 border-neutral-800">
            <Logout />
            <Separator className="bg-neutral-800" />
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border border-neutral-700">
                <div className="bg-neutral-700 h-full w-full flex items-center justify-center text-xs text-white">
                  {/* {admin.charAt(0)} */} S
                </div>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm text-white">
                  {/* {admin} */} Starboomer
                </span>
                <span className="text-xs text-neutral-400">Ver. 1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className=" hidden md:flex flex-col h-full w-64 bg-black border-r border-neutral-800">
        {/* Logo */}
        <div className="px-2 pt-5 flex justify-center items-center">
          <img src="/starname.png" alt="" className=" h-11 " />
        </div>

        <Separator className="my-4 mx-5 bg-neutral-800 w-50" />

        {/* Navigation */}
        <div className="flex-1 px-3 py-2">
          <nav className="space-y-2">
            <SidebarItem
              icon={
                <Icon
                  icon="material-symbols:star-outline-rounded"
                  width="22"
                  height="22"
                  className=""
                />
              }
              label="Overview"
              to="/dashboard"
              active={path === "/dashboard"}
            />
            <SidebarItem
              icon={
                <Icon
                  icon="ic:baseline-insights"
                  width="20"
                  height="20"
                  className=""
                />
              }
              label="Review Breakdown"
              to="/breakdown"
              active={path === "/breakdown"}
            />
            <SidebarItem
              icon={
                <Icon
                  icon="mdi:performance"
                  width="20"
                  height="20"
                  className=""
                />
              }
              label="Performance"
              to="/performance"
              active={path === "/performance"}
            />
            <SidebarItem
              icon={
                <Icon
                  icon="ri:notification-line"
                  width="20"
                  height="20"
                  className=""
                />
              }
              label="Notification"
              to="/notification"
              active={path === "/notification"}
            />
          </nav>

          {/* <nav className="space-y-1">
            <SidebarItem
              icon={<Settings size={18} />}
              label="Settings"
              to="/settings"
              active={path === '/settings'}
            />
            <SidebarItem
              icon={<HelpCircle size={18} />}
              label="Help & Support"
              to="/help"
              active={path === '/help'}
            />
          </nav> */}
        </div>

        {/* User */}
        <div className="p-4 border-t flex flex-col items-start gap-5 border-neutral-800">
          <Logout />
          <Separator className=" bg-neutral-800" />
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-neutral-700">
              <div className="bg-neutral-700 h-full w-full flex items-center justify-center text-xs text-white">
                {/* {admin.charAt(0)} */}S
              </div>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm text-white">{admin ? admin : 'No admin'}</span>
              <span className="text-xs text-neutral-400">Ver. 1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-auto overflow-x-hidden">
        {/* <img 
          src={gradientOverlay} 
          alt="grad" 
          className="absolute pointer-events-none z-10"
          style={{
            width: "542px",
            height: "530px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "10",
          }}
        /> */}
        {/* <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: "radial-gradient(circle at center, rgba(67, 133, 255, 0.26) 0%, rgba(0, 0, 0, 0) 70%)",
            // mixBlendMode: "hard-light", // Try different blend modes like: overlay, screen, soft-light
          }}
        /> */}
        {/* <div 
          className="absolute pointer-events-none"
          style={{
            width: "542px",
            height: "530px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(67, 133, 255, 0.26) 0%, rgba(0, 0, 0, 0) 70%)",
            zIndex: "10"
          }}
        /> */}

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
