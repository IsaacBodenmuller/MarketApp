import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function LandingPage() {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
