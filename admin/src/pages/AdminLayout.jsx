import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu, FiBell } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FAF7F2]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-black/5 bg-white px-4 py-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#1C2321] lg:hidden"
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>
          <span className="hidden font-sora text-sm font-medium text-[#1C2321] lg:block">
            Hiru<span className="text-[#FF6B35]">Eats</span> Admin
          </span>
          <div className="flex items-center gap-4">
            <button className="relative text-[#1C2321]/60 hover:text-[#1C2321]" aria-label="Notifications">
              <FiBell size={20} />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#FF6B35]" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B2420] font-sora text-sm font-semibold text-white">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          {/* Nested admin routes (Dashboard, Add Foods, Add Juice) render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
