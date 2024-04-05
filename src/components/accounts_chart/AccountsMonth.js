import "../../style/AccountsMonth.scss";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export default function AccountsMonth({ inMonthInfo, outMonthInfo }) {
  const inData = [];
  const outData = [];
  var index1 = inMonthInfo.length; //eslint-disable-line no-unused-vars
  var index2 = outMonthInfo.length; //eslint-disable-line no-unused-vars

  inMonthInfo.forEach((inMonthInfo, index1) => {
    inData[index1] = inMonthInfo.account_mount;
  });

  outMonthInfo.forEach((outMonthInfo, index2) => {
    outData[index2] = outMonthInfo.account_mount;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "수입",
        data: inData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "지출",
        data: outData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="monthChart">
      <h3 className="vChartDiv_title"> 달별 수입/지출 그래프</h3>
      <Bar options={options} data={data} className="vChart" />
    </div>
  );
}
