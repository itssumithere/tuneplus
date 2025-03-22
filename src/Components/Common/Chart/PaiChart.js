import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const CustomPieChart = ({ data }) => {
  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.y, 0);

  // Format data for MUI PieChart
  const chartData = data.map((item, index) => ({
    id: item.name,
    value: item.y,
    label: `${item.name}: ${(item.y / total * 100).toFixed(1)}%`, // Show name + percentage
    color: ["#FF4500", "#4CAF50", "#2196F3", "#FFC107", "#9C27B0"][index % 5], // Assign colors dynamically
  }));

  return (
    <div style={{ backgroundColor: "#2A2A2A", padding: "20px", borderRadius: "12px", textAlign: "center", width: "500px", margin: "auto" }}>
      <h2 style={{ color: "#FFF", fontSize: "18px", marginBottom: "10px" }}>📊 Top Store Sales</h2>
      <PieChart
        series={[
          {
            data: chartData,
            outerRadius: 100, // Standard Pie Chart
            innerRadius: 40, // Donut style
            paddingAngle: 5,
            arcLabel: (item) => item.label, // Display "Name: %"
            arcLabelMinAngle: 20, // Ensure small slices still have labels
            arcLabelRadius: "70%", // Adjust label placement
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fill: "#FFF", // Ensures white text color
            fontSize: "14px", // Slightly larger for better readability
          },
        }}
        width={500}
        height={320}
      />
    </div>
  );
};

export default CustomPieChart;
