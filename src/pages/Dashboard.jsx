
import { useState, useEffect, useCallback } from "react";
import StatCard from "../components/StateCard";
import SalesChart from "../components/SalesChart";
import RecentOrders from "../components/RecentOrder";

import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    customers: 0,
  });

  const updateStats = useCallback(() => {
    try {
      const getStoredData = (key) => {
        const data = JSON.parse(localStorage.getItem(key) || "[]");

        return Array.isArray(data) ? data : [];
      };

      const products = getStoredData("shopadmin-products");
      const orders = getStoredData("shopadmin-orders");
      const customers = getStoredData("shopadmin-customers");

      // Calculate revenue from delivered orders only
      const revenue = orders
        .filter(
          (order) =>
            order.status?.toLowerCase() === "delivered"
        )
        .reduce((total, order) => {
          return total + Number(order.total || 0);
        }, 0);

      setStats({
        revenue,
        orders: orders.length,
        products: products.length,
        customers: customers.length,
      });
    } catch (error) {
      console.error("Error loading dashboard statistics:", error);
    }
  }, []);

  useEffect(() => {
    // Load statistics when Dashboard mounts
    updateStats();

    // Listen for changes from other browser tabs
    window.addEventListener("storage", updateStats);

    // Refresh statistics when the browser window gets focus
    window.addEventListener("focus", updateStats);

    // Listen for updates from other ShopAdmin pages
    window.addEventListener(
      "shopadmin-data-updated",
      updateStats
    );

    return () => {
      window.removeEventListener("storage", updateStats);
      window.removeEventListener("focus", updateStats);

      window.removeEventListener(
        "shopadmin-data-updated",
        updateStats
      );
    };
  }, [updateStats]);

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${stats.revenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingCart,
    },
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
    },
    {
      title: "Total Customers",
      value: stats.customers,
      icon: Users,
    },
  ];

  return (
    <div>
      {/* Dashboard Statistics */}
      <section className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 2xl:grid-cols-4">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            change=""
          />
        ))}
      </section>

      {/* Sales Chart */}
      <section className="mt-6 min-w-0 sm:mt-8">
        <SalesChart />
      </section>

      {/* Recent Orders */}
      <section className="mt-6 min-w-0 sm:mt-8">
        <RecentOrders />
      </section>
    </div>
  );
}

export default Dashboard;
