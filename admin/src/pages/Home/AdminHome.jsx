import { FiShoppingBag, FiDroplet, FiTrendingUp, FiPlusCircle, FiEye  } from "react-icons/fi";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Foods", value: "—", icon: FiShoppingBag },
  { label: "Total Juices", value: "—", icon: FiDroplet },
  { label: "This Week's Orders", value: "—", icon: FiTrendingUp },
];

export default function AdminHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-sora text-2xl font-semibold text-[#1C2321]">Welcome back, Admin</h1>
        <p className="mt-1 font-inter text-sm text-[#6B7280]">Here's what's on the menu today.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFEDE3] text-[#FF6B35]">
              <Icon size={20} />
            </div>
            <p className="mt-4 font-mono text-2xl font-semibold text-[#1C2321]">{value}</p>
            <p className="font-inter text-sm text-[#6B7280]">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          to="/admin/add-food"
          className="group flex items-center justify-between rounded-xl border border-black/5 bg-white p-5 shadow-sm transition-colors hover:border-[#FF6B35]/30"
        >
          <div>
            <p className="font-sora font-medium text-[#1C2321]">Add a new food</p>
            <p className="mt-1 font-inter text-sm text-[#6B7280]">List a new dish on the menu</p>
          </div>
          <FiPlusCircle className="text-[#FF6B35]" size={22} />
        </Link>
        <Link
          to="/admin/add-juice"
          className="group flex items-center justify-between rounded-xl border border-black/5 bg-white p-5 shadow-sm transition-colors hover:border-[#FF6B35]/30"
        >
          <div>
            <p className="font-sora font-medium text-[#1C2321]">Add a new juice</p>
            <p className="mt-1 font-inter text-sm text-[#6B7280]">List a new juice or smoothie</p>
          </div>
          <FiPlusCircle className="text-[#FF6B35]" size={22} />
        </Link>
         <Link
          to="/admin/view-foods"
          className="group flex items-center justify-between rounded-xl border border-black/5 bg-white p-5 shadow-sm transition-colors hover:border-[#FF6B35]/30"
        >
          <div>
            <p className="font-sora font-medium text-[#1C2321]">View All Foods</p>
            <p className="mt-1 font-inter text-sm text-[#6B7280]">Browse all available dishes</p>
          </div>
          <FiEye  className="text-[#FF6B35]" size={22} />
        </Link>
         <Link
          to="/admin/view-juices"
          className="group flex items-center justify-between rounded-xl border border-black/5 bg-white p-5 shadow-sm transition-colors hover:border-[#FF6B35]/30"
        >
          <div>
            <p className="font-sora font-medium text-[#1C2321]">View All Juices</p>
            <p className="mt-1 font-inter text-sm text-[#6B7280]">Browse all available juices and smoothies</p>
          </div>
          <FiEye  className="text-[#FF6B35]" size={22} />
        </Link>
      </div>
    </div>
  );
}
