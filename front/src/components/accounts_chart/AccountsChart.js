import React from "react";
import "../../style/AccountsChart.scss";
import LastNavi from "../common/LastNavi";
import AccountsTrend from "./AccountsTrend";
import AccountsMonth from "./AccountsMonth";
import useGetData from "../../hooks/useGetData";
import TopBar from "../common/TopBar";

export default function AccountsChart() {
  const data = useGetData("/api/chart_data");

  if (data.length === 0) {
    return <span>Loading....</span>;
  } else {
    return (
      <div className="body">
        <TopBar />
        <div className="wrap">
          <div className="lastNavigation">
            <LastNavi url="/accounts"></LastNavi>
          </div>
          <div className="chartArea">
            <AccountsTrend
              categoryNm={data.categoryNm}
              accountSum={data.accountSum}
            ></AccountsTrend>
            <AccountsMonth
              inMonthInfo={data.inMonthInfo}
              outMonthInfo={data.outMonthInfo}
            ></AccountsMonth>
          </div>
        </div>
      </div>
    );
  }
}
