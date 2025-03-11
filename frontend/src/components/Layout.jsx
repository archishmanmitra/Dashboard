import React, { useContext } from "react";
import { cn } from "../lib/utils";
import {
  BarChart3,
  ChevronRight,
  HelpCircle,
  MessageSquare,
  Settings,
  Star,
} from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Link, Outlet, useLocation } from "react-router-dom";
import gradientOverlay from '/gradientOverlay.svg';
import Logout from "./Logout";

const SidebarItem = ({ icon, label, to, active }) => {
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
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;


  return (
    <div className="flex h-screen font-[Open_Sauce_Sans]  bg-black text-white">
      {/* Sidebar */}
      <div className="flex flex-col h-full w-60 bg-black border-r border-neutral-800">
        {/* Logo */}
        <div className="px-2">
          
            <img src="/logoname.png" alt=""  className="w-48 "/>
          
        </div>

        <Separator className="my-4 mx-8 bg-neutral-800 w-40" />

        {/* Navigation */}
        <div className="flex-1 px-3 py-2">
          <nav className="space-y-1">
            <SidebarItem
              icon={<Star size={18} />}
              label="Overview"
              to="/dashboard"
              active={path === "/dashboard"}
            />
            <SidebarItem
              icon={<ChevronRight size={18} />}
              label="Review Breakdown"
              to="/breakdown"
              active={path === "/breakdown"}
            />
            <SidebarItem
              icon={<BarChart3 size={18} />}
              label="Performance"
              to="/performance"
              active={path === "/performance"}
            />
            <SidebarItem
              icon={<MessageSquare size={18} />}
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
           <Logout/>
          <Separator className=" bg-neutral-800" />
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-neutral-700">
              <div className="bg-neutral-700 h-full w-full flex items-center justify-center text-xs text-white">
                U
              </div>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm text-white">rk360ironjr@gmail.com</span>
              <span className="text-xs text-neutral-400">Ver. 1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-auto ">
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

        <Outlet/>
        
      </div>
    </div>
  );
};

export default Layout;
