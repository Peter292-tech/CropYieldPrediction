import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "./YieldChart.css";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const YieldChart = ({ crop }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!crop) return;

    const fetchYieldData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/yield_chart?crop=${encodeURIComponent(crop)}`
        );

        console.log("📊 Yield Chart Data:", response.data);

        if (response.data.error) {
          setError(response.data.error);
          setChartData(null);
          return;
        }

        setChartData({
          labels: response.data.years,
          datasets: [
            {
              label: `Yield Rate for ${crop}`,
              data: response.data.yields,
              borderColor: "#17a2b8",
              backgroundColor: "rgba(23, 162, 184, 0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        });

        setError("");
      } catch (err) {
        console.error("⚠️ Error fetching yield data:", err);
        setError("Failed to fetch yield data. Please try again.");
      }
    };

    fetchYieldData();
  }, [crop]);

  if (error) {
    return (
      <div className="chart-container">
        <p className="error-message">⚠️ {error}</p>
      </div>
    );
  }

  if (!chartData) {
    return <p className="loading-message">Loading chart...</p>;
  }

  return (
    <div className="chart-container">
      <h3>📊 Yield Rate for {crop}</h3>
      <Line data={chartData} />
    </div>
  );
};

export default YieldChart;
