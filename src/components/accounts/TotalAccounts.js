import "../../style/TotalAccounts.scss";

export default function TotalAccounts({ outInfo, inInfo }) {
  return (
    <div className="totalAccountsArea">
      <div className="totalBox">
        <div className="total totalExpense">
          총 지출<br></br> <span> {outInfo} 원</span>
        </div>
        <div className="total totalIncome">
          총 수입<br></br> <span> {inInfo} 원</span>
        </div>
      </div>
    </div>
  );
}
