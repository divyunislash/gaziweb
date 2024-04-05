import "../../style/AccountsTrend.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const AccountsTrend = ({ categoryNm, accountSum }) => {
  const label = [];
  const amount = [];
  var index1 = categoryNm.length; //eslint-disable-line no-unused-vars
  var index2 = accountSum.length; //eslint-disable-line no-unused-vars

  categoryNm.forEach((categoryNm, index1) => {
    label[index1] = categoryNm.category_nm;
  });

  accountSum.forEach((accountSum, index2) => {
    amount[index2] = accountSum.account_mount;
  });

  const data = {
    labels: label,
    datasets: [
      {
        label: "합계",
        data: amount,
        backgroundColor: [
          "#D363D3",
          "#CCCCFF",
          "#C8F2C8",
          "#800000",
          "#FFCC66",
          "#996633",
          "#90214E",
          "#0000CC",
          "#F9F2F9",
          "#66FF33",
          "#666699",
          "#009999",
          "#FF6600",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="chartDiv">
      <h3 className="chartDiv_title"> 2024년 수입/지출 분석 </h3>
      <Doughnut data={data} options={options} className="chart" />
    </div>
  );
};

export default AccountsTrend;
