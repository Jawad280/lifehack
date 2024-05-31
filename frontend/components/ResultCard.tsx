"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React from "react";
import { monthPrediction, weekPrediction } from "@/lib/sampleData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Demand Prediction",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const dayLabels = ["03-06-2024"];

export const dayData = {
  labels: dayLabels,
  datasets: weekPrediction.map((data: any) => ({
    label: data.dishName,
    data: data.days,
    backgroundColor: data.backgroundColor,
  })),
};

const weekLabels = [
  "03-06-2024",
  "04-06-2024",
  "05-06-2024",
  "06-06-2024",
  "07-06-2024",
  "08-06-2024",
  "09-06-2024",
];

export const weekData = {
  labels: weekLabels,
  datasets: weekPrediction.map((data: any) => ({
    label: data.dishName,
    data: data.days,
    backgroundColor: data.backgroundColor,
  })),
};

const monthLabels = ["June 2024"];

export const monthData = {
  labels: monthLabels,
  datasets: monthPrediction.map((data: any) => ({
    label: data.dishName,
    data: [data.amount],
    backgroundColor: data.backgroundColor,
  })),
};

const ResultCard = ({ type }: { type: string }) => {
  function handleData() {
    if (type === "day") {
      return dayData;
    }

    if (type === "range") {
      return weekData;
    }

    return monthData;
  }

  return (
    <div className="w-4/5">
      <Bar options={options} data={handleData()} />
    </div>
  );
};

export default ResultCard;
