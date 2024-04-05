import "../../style/TopBar.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteCookie } from "../../util/CookieUtil";

export default function TopBar() {
  const navigate = useNavigate();
  function logout() {
    axios.get("/logout").then((res) => {
      deleteCookie("connect_id");
      if (res.data.success) {
        navigate("/");
      }
    });
  }
  return (
    <div>
      <div className="topBar">
        <Button
          variant="contained"
          color="secondary"
          className="topBarMenu"
          onClick={logout}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}
