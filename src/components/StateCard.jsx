
function StatCard({ title, value, icon: Icon, change }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      {/* Card Header */}
      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-[#858C89]">
          {title}
        </p>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F8E9] text-[#1F2926]">
          <Icon size={22} />
        </div>

      </div>

      {/* Card Value */}
      <h2 className="mt-5 text-2xl font-bold text-[#1F2926]">
        {value}
      </h2>

      {/* Card Growth */}
      <p className="mt-3 text-sm">
        <span className="font-semibold text-green-600">
          {change}
        </span>

        <span className="ml-1 text-[#858C89]">
          vs. last month
        </span>
      </p>

    </div>
  );
}

export default StatCard;
