
import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import Sidebar from "./components/Sidebarr";
import DashboardHeader from "./components/DashboardHeader";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Product";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#F5F6F5] md:flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        {/* Mobile Menu Button */}
        <div className="mb-4 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1F2926] shadow-sm hover:bg-[#F0F8E9]"
          >
            <Menu size={25} />
          </button>
        </div>

        <DashboardHeader />

        {/* Current Page */}
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/analytics" element={<Analytics />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
