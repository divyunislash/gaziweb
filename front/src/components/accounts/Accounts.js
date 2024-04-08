import "../../style/AccountsBody.scss";
import AccountsInput from "./AccountsInput";
import TotalAccounts from "./TotalAccounts";
import AccountsList from "./AccountsList";
import NextNavi from "../common/NextNavi";
import TopBar from "../common/TopBar";
import useGetData from "../../hooks/useGetData";

export default function Accounts() {
  const data = useGetData("/api/accounts_data");

  if (data.length === 0) {
    return <span>Loading....</span>;
  } else {
    return (
      <div className="body">
        <TopBar />
        <div className="wrap">
          <div className="accountArea">
            <TotalAccounts
              outInfo={data.inOutInfo[0] ? data.inOutInfo[0].outInfo : "0"}
              inInfo={data.inOutInfo[0] ? data.inOutInfo[0].inInfo : "0"}
            />
            <AccountsList accountsList={data.accountsList} />
            <AccountsInput categoryInfo={data.categoryInfo} />
          </div>
          <div className="nextNavigation">
            <NextNavi url="/accounts_chart" />
          </div>
        </div>
      </div>
    );
  }
}
