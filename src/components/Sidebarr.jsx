import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  ChartNoAxesCombined,
  Settings,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          bg-white px-5 py-6 shadow-lg
          transition-transform duration-300
          md:sticky md:top-0 md:z-10 md:h-screen
          md:translate-x-0 md:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo and Close Button */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FE34D]">
              <ShoppingBag size={22} className="text-[#1F2926]" />
            </div>

            <h1 className="text-xl font-bold text-[#1F2926]">ShopAdmin</h1>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-[#858C89] hover:bg-[#F0F8E9] md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Label */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#858C89]">
          Main Menu
        </p>

        {/* Navigation Links */}

        <nav className="flex flex-col gap-2">
          {[
            { name: "Dashboard", path: "/", icon: LayoutDashboard },
            { name: "Products", path: "/products", icon: Package },
            { name: "Orders", path: "/orders", icon: ShoppingBag },
            { name: "Customers", path: "/customers", icon: Users },
            {
              name: "Analytics",
              path: "/analytics",
              icon: ChartNoAxesCombined,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-[#8FE34D] font-semibold text-[#1F2926]"
                      : "text-[#858C89] hover:bg-[#F0F8E9] hover:text-[#1F2926]"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="mt-auto pt-8">
          <a
            href="#settings"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#858C89] transition hover:bg-[#F0F8E9] hover:text-[#1F2926]"
          >
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
