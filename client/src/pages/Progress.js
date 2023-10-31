import React from "react";
import { Link } from "react-router-dom";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const Progress = () => {
  const chartData = {
    labels: ["Week1", "Week2", "Week3", "Week4", "Week5"],
    datasets: [
      {
        label: "Workout Progress",
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 29, 152, 0.6)",
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: [10, 15, 20, 25, 30],
      },
    ],
  };
  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        title: {
          display: true,
          text: "Workout Progress",
        },
      },
    },
  };
  return (
    <div className="col-12 flex-row">
      <div className="w3-sidebar w3-light-grey w3-bar-block">
        <h3 className="w3-bar-item">Menu</h3>
        <Link className="w3-bar-item alink" to="/progress">
          Progress
        </Link>
        <Link
          className="w3-bar-item w3-button"
          activeStyle={{ color: "#ff3333" }}
          to="/workouts"
        >
          Workouts
        </Link>
        <Link
          className="w3-bar-item w3-button"
          activeStyle={{ color: "#ff3333" }}
          to="/settings"
        >
          Settings
        </Link>
      </div>

      <div style={{ width: "30%", margin: "0 auto", padding: "2%" }}>
        <Bar data={chartData} options={options} />
      </div>
      <div style={{ width: "30%", margin: "0 auto", padding: "2%" }}>
        <Line data={chartData} options={options} />
      </div>
      <div style={{ width: "20%", margin: "0 auto", padding: "2%" }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Progress;
