
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UtensilsCrossed, X } from "lucide-react";

function ProductForm({ onAdd, onCancel, initialData }) {
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

  // Load existing food details when editing
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
          },
    );
  }, [initialData, reset]);

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
      {/* Form Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F8E9]">
            <UtensilsCrossed
              size={22}
              className="text-[#1F2926]"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#1F2926] sm:text-xl">
              {initialData ? "Edit Food Item" : "Add New Food"}
            </h2>

            <p className="mt-1 text-sm text-[#858C89]">
              Enter the food details below.
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

      {/* Food Name */}
      <div>
        <label
          htmlFor="food-name"
          className="mb-2 block text-sm font-medium text-[#1F2926]"
        >
          Food Name
        </label>

        <input
          id="food-name"
          {...register("name", {
            required: "Food name is required",
            validate: (value) =>
              value.trim().length > 0 || "Enter a valid food name",
          })}
          placeholder="e.g. Classic Burger"
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
          htmlFor="food-category"
          className="mb-2 block text-sm font-medium text-[#1F2926]"
        >
          Category
        </label>

        <select
          id="food-category"
          {...register("category", {
            required: "Please select a category",
          })}
          className="w-full rounded-lg border border-gray-200 bg-white p-3 outline-none transition focus:border-[#8FE34D]"
        >
          <option value="">Select a category</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Italian">Italian</option>
          <option value="Indian">Indian</option>
          <option value="Sides">Sides</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverages">Beverages</option>
        </select>

        {errors.category && (
          <p className="mt-1 text-sm text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Price and Quantity */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Price */}
        <div>
          <label
            htmlFor="food-price"
            className="mb-2 block text-sm font-medium text-[#1F2926]"
          >
            Price (₹)
          </label>

          <input
            id="food-price"
            type="number"
            step="0.01"
            placeholder="149"
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

        {/* Quantity */}
        <div>
          <label
            htmlFor="food-stock"
            className="mb-2 block text-sm font-medium text-[#1F2926]"
          >
            Available Quantity
          </label>

          <input
            id="food-stock"
            type="number"
            step="1"
            placeholder="45"
            {...register("stock", {
              required: "Quantity is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Quantity cannot be negative",
              },
              validate: (value) =>
                Number.isInteger(value) ||
                "Quantity must be a whole number",
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
          {initialData ? "Save Changes" : "Add Food"}
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