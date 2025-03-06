import { useContext, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useFilterContext } from "../context/FilterContext";

// Helper function to get month name
const getMonthName = (date) => {
  return date.toLocaleString("default", { month: "long" });
};

// Helper function to get day name
const getDayName = (date) => {
  return date.toLocaleString("default", { weekday: "long" });
};

const ReviewsChart = () => {

  const {selectedOption, chartData} = useFilterContext()
  const chart = useMemo(() => {
    if (!chartData || !chartData.length) return [];

    // const currentDate = new Date();
    const reviewDates = chartData
      .map((review) => new Date(review.day))
      .filter((date) => !isNaN(date));

    if (!reviewDates.length) return [];

    // Find the earliest review date
    const minDate = new Date(Math.min(...reviewDates));

    const groupedData = {};

    chartData.forEach((review) => {
      if (!review.day) return;

      const publishedDate = new Date(review.day);
      if (isNaN(publishedDate)) return;

      let key;
      switch (selectedOption) {
        case "last-7-days":
          key = getDayName(publishedDate); // Label with day name (e.g., "Monday")
          break;
        case "last-30-days": {
          // Calculate relative week number from the earliest review date
          const daysSinceMinDate = Math.floor(
            (publishedDate - minDate) / (1000 * 60 * 60 * 24)
          );
          key = `Week ${Math.ceil(daysSinceMinDate / 7) + 1}`; // Weeks start from 1
          break;
        }
        case "last-90-days":
          key = getMonthName(publishedDate); // Label with month name (e.g., "March")
          break;
        default:
          key = getDayName(publishedDate);
      }

      groupedData[key] = (groupedData[key] || 0) + 1;
    });

    return Object.entries(groupedData)
      .map(([key, reviews]) => ({ interval: key, reviews }))
      .sort((a, b) =>
        a.interval.localeCompare(b.interval, undefined, { numeric: true })
      );
  }, [chartData]);

  return (
    <>
      <div>
        <div className="text-3xl  font-bold mb-1">
          {chartData.length} 
        </div>

        <div className="text-sm  text-neutral-400 mb-6">
          in
          {selectedOption === "last-90-days"
            ? " 3 months"
            : selectedOption === "last-30-days"
            ? " a month"
            : " a week"}
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chart}
              margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis
                dataKey="interval"
                tick={{ fontSize: 12, fill: "#A0AEC0" }}
                axisLine={{ stroke: "#4A5568" }}
                tickLine={false}
                // label={{
                //   value:
                //     selectedOption === "last-90-days"
                //       ? "Months"
                //       : selectedOption === "last-30-days"
                //       ? "Weeks"
                //       : "Days",
                //   position: "insideBottom",
                //   offset: -10,
                //   fill: "#A0AEC0",
                // }}
              />
              <YAxis
                dataKey="reviews"
                tick={{ fontSize: 12, fill: "#A0AEC0" }}
                axisLine={{ stroke: "#4A5568" }}
                tickLine={false}
                domain={[0, "dataMax + 2"]}
              />
              <Tooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
                contentStyle={{
                  backgroundColor: "#1A202C",
                  color: "#E2E8F0",
                  borderRadius: "8px",
                  border: "none",
                }}
              />
              <Bar
                dataKey="reviews"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                barSize={15}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default ReviewsChart;
