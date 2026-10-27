
import { useState, useEffect, useMemo, useCallback } from "react";
import { Search, Package, IndianRupee, Clock } from "lucide-react";

const initialOrders = [
  {
    id: "ORD001",
    customer: "Anu Krishnan",
    date: "Oct 25, 2026",
    total: 1500,
    status: "Pending",
  },
  {
    id: "ORD002",
    customer: "Rahul Menon",
    date: "Oct 24, 2026",
    total: 2400,
    status: "Delivered",
  },
  {
    id: "ORD003",
    customer: "Meera Nair",
    date: "Oct 23, 2026",
    total: 800,
    status: "Processing",
  },
  {
    id: "ORD004",
    customer: "Arjun Das",
    date: "Oct 22, 2026",
    total: 3200,
    status: "Pending",
  },
  {
    id: "ORD005",
    customer: "Diya Thomas",
    date: "Oct 21, 2026",
    total: 1200,
    status: "Delivered",
  },
];

function getInitialOrders() {
  try {
    const savedOrders = localStorage.getItem("shopadmin-orders");

    return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  } catch {
    return initialOrders;
  }
}

function Orders() {
  // Store orders in React state
  const [orders, setOrders] = useState(getInitialOrders);

  // Store search input
  const [searchTerm, setSearchTerm] = useState("");

  // Save orders whenever they change
  useEffect(() => {
    localStorage.setItem("shopadmin-orders", JSON.stringify(orders));

    // Notify other components in this same browser tab
    window.dispatchEvent(new Event("shopadmin-data-updated"));
  }, [orders]);

  // Filter orders using search
  const filteredOrders = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(search) ||
        order.customer.toLowerCase().includes(search) ||
        order.status.toLowerCase().includes(search)
    );
  }, [orders, searchTerm]);

  // Calculate order statistics
  const orderStats = useMemo(() => {
    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (order) => order.status === "Pending"
    ).length;

    const totalRevenue = orders.reduce(
      (total, order) => total + Number(order.total || 0),
      0
    );

    return {
      totalOrders,
      pendingOrders,
      totalRevenue,
    };
  }, [orders]);

  // Update an order's status
  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  }, []);

  // Status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-[#F0F8E9] text-[#397A25]";

      case "Processing":
        return "bg-orange-50 text-orange-600";

      case "Pending":
        return "bg-yellow-50 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#1F2926] sm:text-3xl">
          Orders
        </h1>

        <p className="mt-1 text-sm text-[#858C89]">
          Manage and track all your customer orders.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Orders */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#858C89]">Total Orders</p>

              <h2 className="mt-2 text-2xl font-bold text-[#1F2926]">
                {orderStats.totalOrders}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F8E9] text-[#397A25]">
              <Package size={24} />
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#858C89]">Pending Orders</p>

              <h2 className="mt-2 text-2xl font-bold text-[#1F2926]">
                {orderStats.pendingOrders}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
              <Clock size={24} />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#858C89]">
                Total Order Value
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#1F2926]">
                ₹{orderStats.totalRevenue.toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F8E9] text-[#397A25]">
              <IndianRupee size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {/* Heading and Search */}
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#1F2926]">
              All Orders
            </h2>

            <p className="mt-1 text-sm text-[#858C89]">
              View and update your orders.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858C89]"
            />

            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#8FE34D] focus:ring-2 focus:ring-[#8FE34D]/20"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="border-b border-gray-100 bg-[#FAFBFA]">
              <tr className="text-sm text-[#858C89]">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">
                  Update Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-[#FAFBFA]"
                  >
                    <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-[#1F2926]">
                      {order.id}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-[#1F2926]">
                      {order.customer}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-[#858C89]">
                      {order.date}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-[#1F2926]">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <select
                        value={order.status}
                        onChange={(event) =>
                          updateOrderStatus(
                            order.id,
                            event.target.value
                          )
                        }
                        aria-label={`Update status for ${order.id}`}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#1F2926] outline-none focus:border-[#8FE34D]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-[#858C89]"
                  >
                    No orders found. Try another search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t border-gray-100 px-6 py-4">
          <p className="text-sm text-[#858C89]">
            Showing{" "}
            <span className="font-semibold text-[#1F2926]">
              {filteredOrders.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#1F2926]">
              {orders.length}
            </span>{" "}
            orders
          </p>
        </div>
      </div>
    </div>
  );
}

export default Orders;
