import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";
import ProductForm from "../components/ProductForm";

const initialProducts = [
  {
    id: 1,
    name: "Classic T-Shirt",
    category: "Clothing",
    price: 799,
    stock: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "Leather Handbag",
    category: "Accessories",
    price: 2499,
    stock: 12,
    status: "Active",
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Footwear",
    price: 1999,
    stock: 5,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 3499,
    stock: 0,
    status: "Out of Stock",
  },
];

function Products() {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem("shopadmin-products");
      return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Save products in the browser
  useEffect(() => {
    localStorage.setItem(
      "shopadmin-products",
      JSON.stringify(products),
    );
  }, [products]);

  // Add or update a product
  function handleSaveProduct(data) {
    const updatedProduct = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      status:
        Number(data.stock) === 0
          ? "Out of Stock"
          : Number(data.stock) <= 5
            ? "Low Stock"
            : "Active",
    };

    if (editingProduct) {
      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...updatedProduct }
            : product,
        ),
      );
    } else {
      setProducts((previousProducts) => [
        { id: Date.now(), ...updatedProduct },
        ...previousProducts,
      ]);
    }

    setFormOpen(false);
    setEditingProduct(null);
  }

  // Open the form for editing
  function handleEdit(product) {
    setEditingProduct(product);
    setFormOpen(true);
  }

  // Delete a product
  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (confirmed) {
      setProducts((previousProducts) =>
        previousProducts.filter((product) => product.id !== id),
      );
    }
  }

  // Search products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-w-0">
      {/* Page Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2926] sm:text-3xl">
            Products
          </h1>

          <p className="mt-2 text-sm text-[#858C89]">
            Manage your store inventory.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);
            setFormOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-[#8FE34D] px-4 py-3 font-semibold text-[#1F2926] transition hover:bg-[#7CD63A]"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Add and Edit Form */}
      {formOpen && (
        <div className="mb-6">
          <ProductForm
            key={editingProduct?.id ?? "new-product"}
            initialData={editingProduct}
            onAdd={handleSaveProduct}
            onCancel={() => {
              setFormOpen(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* Product Summary */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F8E9]">
            <Package size={24} className="text-[#1F2926]" />
          </div>

          <div>
            <p className="text-sm text-[#858C89]">Total Products</p>
            <p className="text-2xl font-bold text-[#1F2926]">
              {products.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#E8EBE8] bg-white px-4 py-3">
        <Search size={20} className="shrink-0 text-[#858C89]" />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[800px] text-left">
          <thead>
            <tr className="border-b border-[#E8EBE8] text-sm text-[#858C89]">
              <th className="px-5 py-4 font-medium">Product</th>
              <th className="px-5 py-4 font-medium">Category</th>
              <th className="px-5 py-4 font-medium">Price</th>
              <th className="px-5 py-4 font-medium">Stock</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#F0F2F0] last:border-0 hover:bg-[#FAFCF9]"
              >
                <td className="px-5 py-4 font-semibold text-[#1F2926]">
                  {product.name}
                </td>

                <td className="px-5 py-4 text-sm text-[#858C89]">
                  {product.category}
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-[#1F2926]">
                  ₹{product.price.toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-4 text-sm text-[#1F2926]">
                  {product.stock}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      aria-label={`Edit ${product.name}`}
                      title="Edit product"
                      className="rounded-lg p-2 text-green-700 hover:bg-green-100"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      aria-label={`Delete ${product.name}`}
                      title="Delete product"
                      className="rounded-lg p-2 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-[#858C89]"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;