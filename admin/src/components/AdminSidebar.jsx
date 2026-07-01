import { NavLink } from "react-router-dom";
import { FiHome,FiUser, FiPlusSquare, FiDroplet,FiEye, FiSettings, FiLogOut, FiX, FiShoppingCart } from "react-icons/fi";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: FiHome, end: true },
  { to: "/admin/user-management", label: "User Management", icon: FiUser },
  { to: "/admin/add-food", label: "Add Foods", icon: FiPlusSquare },
  { to: "/admin/add-juice", label: "Add Juice", icon: FiDroplet },
   { to: "/admin/view-foods", label: "View Foods", icon: FiEye },
   { to: "/admin/view-juices", label: "View Juices", icon: FiEye  },
    { to: "/admin/view-orders", label: "View Orders", icon: FiShoppingCart  },
   
];

export default function AdminSidebar({ open, onClose }) {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-[#1B2420] transition-transform duration-200 ease-in-out
        lg:static lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-2">
            
              <span className="font-sora text-lg font-semibold tracking-tight text-white">
                Hiru<span className="text-[#FF6B35]">Eats</span> Admin
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white lg:hidden"
              aria-label="Close menu"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="mx-6 h-px bg-white/10" />

          {/* Nav */}
          <nav className="flex-1 space-y-1 px-4 py-6">
            <p className="px-2 pb-2 font-inter text-xs font-medium uppercase tracking-wider text-white/35">
              Manage
            </p>
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-sm font-medium transition-colors
                  ${isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute left-0 top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-r-full bg-[#FF6B35] transition-opacity
                      ${isActive ? "opacity-100" : "opacity-0"}`}
                    />
                    <Icon size={18} />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mx-6 h-px bg-white/10" />

          {/* Footer */}
          <div className="space-y-1 px-4 py-6">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white">
              <FiSettings size={18} />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <FiLogOut size={18} />
              Log out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
