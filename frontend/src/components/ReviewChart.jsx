import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const ReviewsChart = ({ data }) => {
    // console.log(data);
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        margin={{ top: 20, right:20, left: -20, bottom: 20 }}
        barCategoryGap={20} // Ensures even spacing
      >
        {/* Grid Lines */}
        <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />

        {/* X-Axis Labels */}
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#A0AEC0" }}
          axisLine={{ stroke: "#4A5568" }}
          tickLine={false}
        />

        {/* Y-Axis Labels */}
        <YAxis
          dataKey="reviews"
          tick={{ fontSize: 12, fill: "#A0AEC0" }}
          axisLine={{ stroke: "#4A5568" }}
          tickLine={false}
          domain={[0, "dataMax + 5"]} // Ensures bars fit well
        />

        {/* Tooltip */}
        <Tooltip
          cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
          contentStyle={{
            backgroundColor: "#1A202C",
            color: "#E2E8F0",
            borderRadius: "8px",
            border: "none",
          }}
        />

        {/* Bar Chart */}
        <Bar
          dataKey="reviews"
          fill="url(#barGradient)"
          radius={[6, 6, 0, 0]} // Rounded top bars
          barSize={14} // Adjusted bar width
        />

        {/* Gradient Color */}
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.3} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReviewsChart;
