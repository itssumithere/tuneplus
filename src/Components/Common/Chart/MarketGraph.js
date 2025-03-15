import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MarketGraph = ({ charDdata }) => {
  // Extract labels and values from charDdata
  const labels = charDdata.map((data) => data.label);
  const values = charDdata.map((data) => data.y);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Market Data",
        data: values,
        backgroundColor: "#FF4500", // Set bar color to orange
        borderColor: "#FF4500",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#FFFFFF" }, // X-axis labels in white
        grid: { color: "#444444" }, // Grid color
      },
      y: {
        ticks: { color: "#FFFFFF" }, // Y-axis labels in white
        grid: { color: "#444444" },
      },
    },
  };

  return (
    <div style={{ backgroundColor: "#000", padding: "20px", borderRadius: "8px" }}>
      <h2 style={{ color: "#FFF", textAlign: "center" }}>Market</h2>
      <div style={{ height: "400px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MarketGraph;
