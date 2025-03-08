import React, { use, useContext } from 'react';
import { cn } from '../lib/utils';
import {
  BarChart3,
  ChevronRight,
  HelpCircle,
  MessageSquare,
  Settings,
  Star,
} from 'lucide-react';
import { Avatar } from './ui/avatar';
import { Separator } from './ui/separator';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SidebarItem = ({ icon, label, to, active }) => {
  return (
    <Link to={to}>
      <div
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors',
          active
            ? 'bg-neutral-800 text-white'
            : 'text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800/50'
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
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      <div className="flex flex-col h-full w-60 bg-neutral-900 border-r border-neutral-800">
        {/* Logo */}
        <div className="p-4">
          <div className="bg-white text-black text-xs font-bold py-1 px-2 inline-block">
            GOURMET BURGER KITCHEN
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-2">
          <nav className="space-y-1">
            <SidebarItem
              icon={<Star size={18} />}
              label="Overview"
              to="/dashboard"
              active={path === '/dashboard'}
            />
            <SidebarItem
              icon={<ChevronRight size={18} />}
              label="Review Breakdown"
              to="/breakdown"
              active={path === '/breakdown'}
            />
            <SidebarItem
              icon={<BarChart3 size={18} />}
              label="Performance"
              to="/performance"
              active={path === '/performance'}
            />
            <SidebarItem
              icon={<MessageSquare size={18} />}
              label="Notification"
              to="/notification"
              active={path === '/notification'}
            />
          </nav>

          <Separator className="my-4 bg-neutral-800" />

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
        <div className="p-4 border-t border-neutral-800">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-neutral-700">
              <div className="bg-neutral-700 h-full w-full flex items-center justify-center text-xs text-white">
                U
              </div>
            </Avatar>
            <button onClick={logout} style={{ position: 'absolute', top: '10px', right: '10px' }}>
              Logout
            </button>
            <div className="flex flex-col">
              <span className="text-sm text-white">rk360ironjr@gmail.com</span>
              <span className="text-xs text-neutral-400">Ver. 1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;