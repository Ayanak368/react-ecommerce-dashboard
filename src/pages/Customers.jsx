
import { useState, useEffect } from "react";
import { Search, Users, Mail, ShoppingBag } from "lucide-react";

const initialCustomers = [
  {
    id: "CUS001",
    name: "Anu Krishnan",
    email: "anu@example.com",
    orders: 5,
    spent: 7500,
    status: "Active",
  },
  {
    id: "CUS002",
    name: "Rahul Menon",
    email: "rahul@example.com",
    orders: 8,
    spent: 12400,
    status: "Active",
  },
  {
    id: "CUS003",
    name: "Meera Nair",
    email: "meera@example.com",
    orders: 2,
    spent: 1800,
    status: "Inactive",
  },
  {
    id: "CUS004",
    name: "Arjun Das",
    email: "arjun@example.com",
    orders: 4,
    spent: 5600,
    status: "Active",
  },
  {
    id: "CUS005",
    name: "Diya Thomas",
    email: "diya@example.com",
    orders: 6,
    spent: 9200,
    status: "Active",
  },
  {
    id: "CUS006",
    name: "Nikhil Kumar",
    email: "nikhil@example.com",
    orders: 1,
    spent: 799,
    status: "Inactive",
  },
];

function getInitialCustomers() {
  try {
    const savedCustomers = localStorage.getItem("shopadmin-customers");

    return savedCustomers
      ? JSON.parse(savedCustomers)
      : initialCustomers;
  } catch {
    return initialCustomers;
  }
}

function Customers() {
  const [customers, setCustomers] = useState(getInitialCustomers);
  const [searchTerm, setSearchTerm] = useState("");

  // Save customers and notify the Dashboard when data changes.
  useEffect(() => {
    localStorage.setItem(
      "shopadmin-customers",
      JSON.stringify(customers)
    );

    window.dispatchEvent(new Event("shopadmin-data-updated"));
  }, [customers]);

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    return (
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.id.toLowerCase().includes(search)
    );
  });

  const totalSpent = customers.reduce(
    (total, customer) => total + Number(customer.spent || 0),
    0
  );

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  return (
    <div className="mt-6 space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1F2926]">
          Customers
        </h1>

        <p className="mt-1 text-sm text-[#858C89]">
          Manage your customers and track their activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Customers */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F8E9] text-[#1F2926]">
              <Users size={23} />
            </div>

            <div>
              <p className="text-sm text-[#858C89]">
                Total Customers
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#1F2926]">
                {customers.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Active Customers */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F8E9] text-[#1F2926]">
              <ShoppingBag size={23} />
            </div>

            <div>
              <p className="text-sm text-[#858C89]">
                Active Customers
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#1F2926]">
                {activeCustomers}
              </h2>
            </div>
          </div>
        </div>

        {/* Total Customer Spending */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F8E9] text-[#1F2926]">
              <Mail size={23} />
            </div>

            <div>
              <p className="text-sm text-[#858C89]">
                Total Customer Spending
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#1F2926]">
                ₹{totalSpent.toLocaleString("en-IN")}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858C89]"
        />

        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#1F2926] outline-none transition focus:border-[#8FE34D]"
        />
      </div>

      {/* Customers Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="border-b border-gray-200 bg-white">
              <tr className="text-sm text-[#858C89]">
                <th className="px-5 py-4 font-medium">Customer</th>
                <th className="px-5 py-4 font-medium">Customer ID</th>
                <th className="px-5 py-4 font-medium">Orders</th>
                <th className="px-5 py-4 font-medium">Total Spent</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-[#F9FBF8]"
                  >
                    <td className="whitespace-nowrap px-5 py-5">
                      <p className="text-sm font-semibold text-[#1F2926]">
                        {customer.name}
                      </p>

                      <p className="mt-1 text-sm text-[#858C89]">
                        {customer.email}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-[#1F2926]">
                      {customer.id}
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 text-sm text-[#1F2926]">
                      {customer.orders}
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 text-sm font-semibold text-[#1F2926]">
                      ₹{Number(customer.spent || 0).toLocaleString("en-IN")}
                    </td>

                    <td className="whitespace-nowrap px-5 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          customer.status === "Active"
                            ? "bg-[#D9FBE8] text-[#008044]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-sm text-[#858C89]"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t border-gray-100 px-5 py-4 text-sm text-[#858C89]">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>
    </div>
  );
}

export default Customers;
