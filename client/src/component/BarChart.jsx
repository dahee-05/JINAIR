import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BarChart = () => {
  const [labels, setLabels] = useState([]);
  const [prices, setPrices] = useState([]);
  const [names, setNames] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:9000/payment/lowest")
      .then((response) => {
        // console.log("✅ 서버 응답 데이터:", response.data);

        const newLabels = [];
        const newPrices = [];
        const newNames = [];

        response.data.forEach((item) => {
          const date = new Date(item.flight_date);
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          newLabels.push(`${month}/${day}`);
          newPrices.push(item.min_basic_price);
          newNames.push(item.name);
        });

        setLabels(newLabels);
        setPrices(newPrices);
        setNames(newNames);
      })
      .catch((error) => {
        console.log("❌ 오류 발생:", error);
      });
  }, []);

  const targetMax = 250000;
  const backgroundData = prices.map((val) => targetMax - val);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "실제 값",
        data: prices,
        backgroundColor: "rgb(211, 233, 46)",
        borderRadius: 10,
        borderSkipped: false,
        stack: "stack1",
      },
      {
        label: "남은 영역",
        data: backgroundData,
        backgroundColor: "rgb(239,239,239)",
        borderRadius: 0,
        borderSkipped: false,
        stack: "stack1",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context) {
            const rawValue = context.raw;
            return `💸 가격: ${rawValue.toLocaleString()}원`;
          },
          title: function (context) {
            const index = context[0].dataIndex;
            return `🌴 지역: ${names[index]}`; // name 출력
          },
        },
      },
    },
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
