import {
  ChartColumnDecreasing,
  LogOut,
  PanelLeftOpen,
  PanelLeft,
  User,
  PanelLeftClose,
} from "lucide-react";
import SidebarSection from "./SidebarSection";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`flex flex-col bg-gray-900 h-screen transition-all duration-300 ease-in-out ${collapsed ? "w-16" : "w-60"}`}
    >
      <header className="p-4 border-b-gray-700 border-b flex justify-between items-center h-16">
        <div
          className={`transition-all duration-200 overflow-hidden ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
        >
          {!collapsed && (
            <div className="flex flex-col">
              <div className="flex">
                <span className="text-white font-semibold">Mercado</span>
                <span className="text-emerald-700 font-semibold">App</span>
              </div>
              <span className="text-white text-xs font-extralight">
                Sistema de gestão
              </span>
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-center rounded-md hover:bg-gray-700 size-8 self-center cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4 text-white" />
          ) : (
            <PanelLeftClose className="size-4 text-white" />
          )}
        </div>
      </header>

      <div className="flex flex-col bg-gray-900 h-screen px-2 py-6 gap-8">
        <section className="flex flex-col gap-2">
          <div
            className={`px-2 transition-all duration-200 ${
              collapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
            }`}
          >
            <SidebarSection>Geral</SidebarSection>
          </div>

          <NavLink
            to="/home/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg transition-all duration-200 size-8 ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-white hover:bg-gray-700"
              } ${collapsed ? "justify-center self-center" : ""}`
            }
          >
            <div className="flex">
              <ChartColumnDecreasing className="size-4" />
            </div>
            <span
              className={`text-xs transition-all duration-200 ${
                collapsed
                  ? "opacity-0 w-0 overflow-hidden"
                  : "opacity-100 w-auto"
              }`}
            >
              Dashboard
            </span>
          </NavLink>
        </section>
      </div>

      <footer
        className={`border-t border-gray-700 p-2 flex items-center justify-between ${
          collapsed && "flex-col"
        }`}
      >
        <div
          className={`flex items-center transition-all duration-200 ${
            collapsed ? "w-full justify-center" : "gap-2"
          }`}
        >
          <div>
            <NavLink
              to="/home/account"
              className={({ isActive }) =>
                `text-white flex hover:bg-gray-700 size-8 rounded-md items-center justify-center cursor-pointer transition-colors ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <User className="size-4" />
            </NavLink>
          </div>
          <div
            className={`flex flex-col transition-all duration-200 ${
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            }`}
          >
            <span className="text-xs text-white">{user?.username}</span>
            <span className="text-[10px] text-gray-400">{user?.email}</span>
          </div>
        </div>
        <div
          className="items-center justify-center size-8 hover:bg-gray-700 rounded-lg flex cursor-pointer"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <LogOut className="size-4 text-red-500" />
        </div>
      </footer>
    </div>
  );
}
