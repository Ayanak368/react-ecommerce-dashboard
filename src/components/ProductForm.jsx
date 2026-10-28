
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Package, X } from "lucide-react";

function ProductForm({ onAdd, onCancel, initialData }) {
  // useRef: Reference to the Product Name input
  const productNameRef = useRef(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      price: "",
      stock: "",
    },
  });

  // Populate the form when editing; clear it when adding a product
  useEffect(() => {
    reset(
      initialData
        ? {
            name: initialData.name ?? "",
            category: initialData.category ?? "",
            price: initialData.price ?? "",
            stock: initialData.stock ?? "",
          }
        : {
            name: "",
            category: "",
            price: "",
            stock: "",
          }
    );

    // Focus the Product Name input when the form opens
    productNameRef.current?.focus();
  }, [initialData, reset]);

  // Register the name input with React Hook Form
  const {
    ref: nameRef,
    ...nameField
  } = register("name", {
    required: "Product name is required",
    validate: (value) =>
      value.trim().length > 0 || "Enter a valid product name",
  });

  // Submit the form
  function submit(data) {
    onAdd({
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    });
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5 rounded-2xl bg-white p-5 shadow-sm sm:p-6"
    >
      {/* Form heading */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F8E9]">
            <Package size={22} className="text-[#1F2926]" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#1F2926] sm:text-xl">
              {initialData ? "Edit Product" : "Add New Product"}
            </h2>

            <p className="mt-1 text-sm text-[#858C89]">
              Enter the product details below.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCancel}
          aria-label="Close form"
          className="rounded-lg p-2 text-[#858C89] transition hover:bg-[#F0F8E9] hover:text-[#1F2926]"
        >
          <X size={20} />
        </button>
      </div>

      {/* Product Name */}
      <div>
        <label
          htmlFor="product-name"
          className="mb-2 block text-sm font-medium text-[#1F2926]"
        >
          Product Name
        </label>

        <input
          id="product-name"
          {...nameField}
          ref={(element) => {
            nameRef(element);
            productNameRef.current = element;
          }}
          placeholder="e.g. Classic T-Shirt"
          className="w-full rounded-lg border border-gray-200 p-3 outline-none transition focus:border-[#8FE34D]"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="product-category"
          className="mb-2 block text-sm font-medium text-[#1F2926]"
        >
          Category
        </label>

        <select
          id="product-category"
          {...register("category", {
            required: "Please select a category",
          })}
          className="w-full rounded-lg border border-gray-200 bg-white p-3 outline-none transition focus:border-[#8FE34D]"
        >
          <option value="">Select a category</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
          <option value="Footwear">Footwear</option>
          <option value="Electronics">Electronics</option>
          <option value="Home & Living">Home & Living</option>
          <option value="Beauty">Beauty</option>
        </select>

        {errors.category && (
          <p className="mt-1 text-sm text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Price and Stock */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Price */}
        <div>
          <label
            htmlFor="product-price"
            className="mb-2 block text-sm font-medium text-[#1F2926]"
          >
            Price (₹)
          </label>

          <input
            id="product-price"
            type="number"
            step="0.01"
            placeholder="799"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: {
                value: 0.01,
                message: "Price must be greater than zero",
              },
              validate: (value) =>
                Number.isFinite(value) || "Enter a valid price",
            })}
            className="w-full rounded-lg border border-gray-200 p-3 outline-none transition focus:border-[#8FE34D]"
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label
            htmlFor="product-stock"
            className="mb-2 block text-sm font-medium text-[#1F2926]"
          >
            Available Stock
          </label>

          <input
            id="product-stock"
            type="number"
            step="1"
            placeholder="45"
            {...register("stock", {
              required: "Stock quantity is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Stock cannot be negative",
              },
              validate: (value) =>
                Number.isInteger(value) ||
                "Stock must be a whole number",
            })}
            className="w-full rounded-lg border border-gray-200 p-3 outline-none transition focus:border-[#8FE34D]"
          />

          {errors.stock && (
            <p className="mt-1 text-sm text-red-500">
              {errors.stock.message}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
        <button
          type="submit"
          className="rounded-lg bg-[#8FE34D] px-5 py-3 font-semibold text-[#1F2926] transition hover:bg-[#7CD63A]"
        >
          {initialData ? "Save Changes" : "Add Product"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-gray-100 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
