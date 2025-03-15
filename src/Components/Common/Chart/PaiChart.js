import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.name), // Extract labels from data
    datasets: [
      {
        data: data.map((item) => item.y), // Extract values from data
        backgroundColor: ["#FF4500", "#4CAF50", "#2196F3", "#FFC107", "#9C27B0"], // Example colors
        hoverBackgroundColor: ["#FF5722", "#66BB6A", "#42A5F5", "#FFD54F", "#BA68C8"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#FFFFFF" } },
    },
  };

  return (
    <div style={{ backgroundColor: "#000", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
      <h2 style={{ color: "#FFF" }}>Top Store</h2>
      <div style={{ height: "400px" }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
