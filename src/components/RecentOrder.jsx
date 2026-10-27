
const orders = [
  {
    id: "#ORD-1001",
    customer: "Ananya Nair",
    date: "Oct 24, 2026",
    amount: 2499,
    status: "Completed",
  },
  {
    id: "#ORD-1002",
    customer: "Rahul Menon",
    date: "Oct 24, 2026",
    amount: 1599,
    status: "Pending",
  },
  {
    id: "#ORD-1003",
    customer: "Meera Thomas",
    date: "Oct 23, 2026",
    amount: 3299,
    status: "Completed",
  },
  {
    id: "#ORD-1004",
    customer: "Arjun Kumar",
    date: "Oct 23, 2026",
    amount: 899,
    status: "Cancelled",
  },
  {
    id: "#ORD-1005",
    customer: "Diya Joseph",
    date: "Oct 22, 2026",
    amount: 1899,
    status: "Pending",
  },
];

function RecentOrders() {
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

      {/* Table Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#1F2926]">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-[#858C89]">
            Latest orders from your store
          </p>
        </div>

        <button className="rounded-xl bg-[#F0F8E9] px-4 py-2 text-sm font-semibold text-[#1F2926] transition hover:bg-[#8FE34D]">
          View All
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">

          <thead>
            <tr className="border-b border-[#E8EBE8] text-sm text-[#858C89]">
              <th className="px-4 py-4 font-medium">Order ID</th>
              <th className="px-4 py-4 font-medium">Customer</th>
              <th className="px-4 py-4 font-medium">Date</th>
              <th className="px-4 py-4 font-medium">Amount</th>
              <th className="px-4 py-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[#F0F2F0] transition hover:bg-[#FAFCF9]"
              >
                <td className="px-4 py-4 text-sm font-semibold text-[#1F2926]">
                  {order.id}
                </td>

                <td className="px-4 py-4 text-sm text-[#1F2926]">
                  {order.customer}
                </td>

                <td className="px-4 py-4 text-sm text-[#858C89]">
                  {order.date}
                </td>

                <td className="px-4 py-4 text-sm font-semibold text-[#1F2926]">
                  ₹{order.amount.toLocaleString("en-IN")}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default RecentOrders;
