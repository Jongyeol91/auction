import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const labels = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [100, 100, 100, 100],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function MainChart({ priceIndexData }) {
  const indexData = priceIndexData?.indexValues?.map((data) => data.value);

  const label = priceIndexData?.priceIndexCategory.name;

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false, // 라벨제거
      },
      title: {
        display: true,
        text: label,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: indexData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}
