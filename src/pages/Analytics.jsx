
import { useState, useEffect, useCallback } from "react";
import {
  IndianRupee,
  ShoppingCart,
  Package,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

function Analytics() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const loadAnalyticsData = useCallback(() => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("shopadmin-orders") || "[]"
      );

      const savedProducts = JSON.parse(
        localStorage.getItem("shopadmin-products") || "[]"
      );

      setOrders(Array.isArray(savedOrders) ? savedOrders : []);
      setProducts(Array.isArray(savedProducts) ? savedProducts : []);
    } catch (error) {
      console.error("Unable to load analytics data:", error);
      setOrders([]);
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    loadAnalyticsData();

    window.addEventListener("storage", loadAnalyticsData);
    window.addEventListener("focus", loadAnalyticsData);
    window.addEventListener(
      "shopadmin-data-updated",
      loadAnalyticsData
    );

    return () => {
      window.removeEventListener("storage", loadAnalyticsData);
      window.removeEventListener("focus", loadAnalyticsData);
      window.removeEventListener(
        "shopadmin-data-updated",
        loadAnalyticsData
      );
    };
  }, [loadAnalyticsData]);

  // Calculate order statistics
  const deliveredOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "delivered"
  );

  const pendingOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "pending"
  );

  const processingOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "processing"
  );

  // Revenue from delivered orders only
  const totalRevenue = deliveredOrders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  const averageOrderValue =
    deliveredOrders.length > 0
      ? totalRevenue / deliveredOrders.length
      : 0;

  const formatCurrency = (amount) =>
    `₹${Math.round(amount).toLocaleString("en-IN")}`;

  // Group delivered revenue by order date
  const revenueByDate = {};

  deliveredOrders.forEach((order) => {
    const date = order.date || "Unknown date";

    revenueByDate[date] =
      (revenueByDate[date] || 0) + Number(order.total || 0);
  });

  const revenueChartData = Object.entries(revenueByDate).map(
    ([date, revenue]) => ({
      date,
      revenue,
    })
  );

  // Order status chart
  const orderStatusData = [
    { status: "Delivered", count: deliveredOrders.length },
    { status: "Processing", count: processingOrders.length },
    { status: "Pending", count: pendingOrders.length },
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      description: "Delivered orders only",
      icon: IndianRupee,
    },
    {
      title: "Total Orders",
      value: orders.length,
      description: "All order statuses",
      icon: ShoppingCart,
    },
    {
      title: "Delivered Orders",
      value: deliveredOrders.length,
      description: "Successfully delivered",
      icon: CheckCircle,
    },
    {
      title: "Average Order Value",
      value: formatCurrency(averageOrderValue),
      description: "Per delivered order",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1F2926]">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-[#858C89]">
          Track your store's performance and order statistics.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F8E9] text-[#1F2926]">
                  <Icon size={23} />
                </div>
              </div>

              <p className="mt-5 text-sm text-[#858C89]">
                {stat.title}
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#1F2926]">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-[#858C89]">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Order Status Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={22} />

            <div>
              <p className="text-sm text-[#858C89]">
                Delivered
              </p>

              <h3 className="mt-1 text-xl font-bold text-[#1F2926]">
                {deliveredOrders.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Clock className="text-orange-500" size={22} />

            <div>
              <p className="text-sm text-[#858C89]">
                Pending
              </p>

              <h3 className="mt-1 text-xl font-bold text-[#1F2926]">
                {pendingOrders.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Package className="text-[#6B9D43]" size={22} />

            <div>
              <p className="text-sm text-[#858C89]">
                Processing
              </p>

              <h3 className="mt-1 text-xl font-bold text-[#1F2926]">
                {processingOrders.length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#1F2926]">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-[#858C89]">
            Revenue generated from delivered orders.
          </p>
        </div>

        {revenueChartData.length > 0 ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#8FE34D"
                      stopOpacity={0.4}
                    />

                    <stop
                      offset="95%"
                      stopColor="#8FE34D"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E9EDE7"
                />

                <XAxis
                  dataKey="date"
                  tick={{ fill: "#858C89", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fill: "#858C89", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    `₹${value.toLocaleString("en-IN")}`
                  }
                />

                <Tooltip
                  formatter={(value) => [
                    formatCurrency(Number(value)),
                    "Revenue",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E9EDE7",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#75BE36"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center text-center text-sm text-[#858C89]">
            No delivered-order revenue data available yet.
          </div>
        )}
      </div>

      {/* Order Status Chart */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#1F2926]">
            Order Status Overview
          </h2>

          <p className="mt-1 text-sm text-[#858C89]">
            Compare orders by their current status.
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={orderStatusData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E9EDE7"
              />

              <XAxis
                dataKey="status"
                tick={{ fill: "#858C89", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fill: "#858C89", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E9EDE7",
                }}
              />

              <Bar
                dataKey="count"
                name="Orders"
                fill="#8FE34D"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Summary */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F8E9] text-[#1F2926]">
            <Package size={23} />
          </div>

          <div>
            <p className="text-sm text-[#858C89]">
              Products in Store
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#1F2926]">
              {products.length}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
