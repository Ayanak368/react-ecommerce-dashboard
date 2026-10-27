import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, Package } from "lucide-react";

function DashboardHeader() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  function handleSearch(value) {
    setSearch(value);

    const savedProducts = localStorage.getItem("shopadmin-products");

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch {
        setProducts([]);
      }
    } else {
      setProducts([]);
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-5">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-[#1F2926]">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-[#858C89]">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Right Side Actions */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Box */}
        <div className="relative">
          <div className="flex items-center gap-3 rounded-xl border border-[#E8EBE8] bg-white px-4 py-3">
            <Search size={19} className="text-[#858C89]" />

            <input
              type="search"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-36 bg-transparent text-sm text-[#1F2926] outline-none placeholder:text-[#858C89] sm:w-48"
            />
          </div>

          {/* Search Results */}
          {search.trim() !== "" && (
            <div className="absolute right-0 top-full z-50 mt-2 max-h-64 w-72 overflow-y-auto rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      navigate("/products");
                      setSearch("");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-[#F0F8E9]"
                  >
                    <Package size={20} className="text-[#1F2926]" />

                    <div>
                      <p className="text-sm font-semibold text-[#1F2926]">
                        {product.name}
                      </p>

                      <p className="text-xs text-[#858C89]">
                        {product.category} · ₹
                        {Number(product.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="p-3 text-sm text-[#858C89]">
                  No products found.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Notification Button */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8EBE8] bg-white text-[#1F2926] transition hover:bg-[#F0F8E9]"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#8FE34D]" />
        </button>

        {/* Admin Profile */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl bg-white p-2 transition hover:bg-[#F0F8E9]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8FE34D] font-bold text-[#1F2926]">
            A
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-[#1F2926]">
              Admin
            </p>

            <p className="text-xs text-[#858C89]">
              Store Manager
            </p>
          </div>

          <ChevronDown size={16} className="text-[#858C89]" />
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;