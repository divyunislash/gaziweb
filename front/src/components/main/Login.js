//import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../util/CookieUtil";

export default function Login() {
  const [login_id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    // 새로 고침 방지
    e.preventDefault();

    const userInfo = JSON.stringify({
      login_id: login_id,
      password: password,
    });

    if (checkEmpty(login_id, password)) {
      axiosInstance
        .post("/login", userInfo, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const message = response.data.userCheck;

          if (message !== "Y") {
            alert(message);
            return false;
          } else {
            setCookie("connect_id", response.data.id, { maxAge: 7200 });
            navigate("/accounts");
          }
        })
        .catch((error) => console.log(error.message));
    }
  }

  function checkEmpty(login_id, password) {
    if (login_id.length === 0 || password.length === 0) {
      alert("입력되지 않은 값이 있습니다. 확인해주세요.");
      return false;
    }
    return true;
  }

  return (
    <div className="inputContent">
      <div className="title">
        <div className="login">로그인</div>
      </div>
      <form onSubmit={onSubmit} method="POST">
        <div className="input">
          <div className="email">
            <div className="id">아이디</div>
            <input
              type="text"
              id="login_id"
              maxLength={15}
              autoComplete="off"
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
          </div>
          <div className="password">
            <div className="password_txt">비밀번호</div>
            <input
              type="password"
              id="login_pw"
              maxLength={20}
              autoComplete="off"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="login_submit">
          <button id="login_button">로그인</button>
        </div>
      </form>
    </div>
  );
}
