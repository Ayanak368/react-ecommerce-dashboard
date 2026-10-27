
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 18000 },
  { month: "Mar", sales: 15000 },
  { month: "Apr", sales: 24000 },
  { month: "May", sales: 20000 },
  { month: "Jun", sales: 32000 },
  { month: "Jul", sales: 28000 },
  { month: "Aug", sales: 38000 },
  { month: "Sep", sales: 30000 },
  { month: "Oct", sales: 45000 },
  { month: "Nov", sales: 40000 },
  { month: "Dec", sales: 52000 },
];

function SalesChart() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      {/* Chart Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#1F2926]">
          Sales Overview
        </h2>

        <p className="mt-1 text-sm text-[#858C89]">
          Monthly sales performance
        </p>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData}>

            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
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
              stroke="#E8EBE8"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#858C89", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#858C89", fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
              width={55}
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Sales",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E8EBE8",
              }}
            />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#153F35"
              strokeWidth={3}
              fill="url(#salesGradient)"
              activeDot={{ r: 6, fill: "#8FE34D" }}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default SalesChart;
