import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const SimpleGraph = ({ data, title, type = "line" }) => {
  const chartData = {
    labels: data.map((point) => point.label), // X-axis values
    datasets: [
      {
        label: `${title} Data`,
        data: data.map((point) => point.y), // Y-axis values
        borderColor: "#FF4500",
        backgroundColor: "rgba(255, 69, 0, 0.5)", // Adjusted color
        pointBackgroundColor: "#FF4500",
        pointBorderColor: "#FFF",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "#FFFFFF" },
        grid: { color: "#444444" },
      },
      y: {
        ticks: { color: "#FFFFFF" },
        grid: { color: "#444444" },
      },
    },
    plugins: {
      legend: { labels: { color: "#FFFFFF" } },
    },
  };

  return (
    <div style={{ backgroundColor: "#000", padding: "20px", borderRadius: "8px" }}>
      <h2 style={{ color: "#FFF", textAlign: "center" }}>{title} Data</h2>
      <div style={{ height: "400px" }}>
        {type === "bar" ? <Bar data={chartData} options={options} /> : <Line data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default SimpleGraph;
