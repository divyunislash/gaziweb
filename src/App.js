import "./App.css";
import Main from "./components/main/Main";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Accounts from "./components/accounts/Accounts";
import AccountsChart from "./components/accounts_chart/AccountsChart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts_chart" element={<AccountsChart />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
