import { useRef, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import "../../style/AccountsInput.scss";
import { Button } from "@mui/material";

export default function AccountsInput({ categoryInfo }) {
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);
  const [num, setNum] = useState("");

  const changeNumType = (e) => {
    const value = e.target.value;
    const removeComma = Number(value.replaceAll(",", ""));
    if (isNaN(removeComma)) return;
    setNum(removeComma.toLocaleString());
  };

  const dateRef = useRef("");
  const categoryRef = useRef("");
  const titleRef = useRef("");
  const amountRef = useRef("");

  const submitForm = (e) => {
    // 새로 고침 방지
    e.preventDefault();
    if (emptyCheck(dateRef, titleRef, amountRef)) {
      const inputInfo = JSON.stringify({
        account_date: dateRef.current.value,
        category_cd: categoryRef.current.value,
        account_title: titleRef.current.value,
        account_mount: amountRef.current.value.replaceAll(",", ""),
      });
      if (window.confirm("제출하시겠습니까?")) {
        axiosInstance
          .post("/add_account", inputInfo, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            alert(response.data);
            window.location.reload();
          })
          .catch((error) => console.log(error.response));
      }
    }
  };

  function emptyCheck(dateRef, titleRef, amountRef) {
    if (
      dateRef.current.value === "" ||
      titleRef.current.value === "" ||
      amountRef.current.value === "" ||
      amountRef.current.value === "0"
    ) {
      alert("입력 값을 확인해주세요.");
      return false;
    } else {
      return true;
    }
  }

  return (
    <form className="accountsInput">
      <label className="inputDate">
        날짜
        <input
          type="date"
          name="date"
          defaultValue={today}
          ref={dateRef}
          min={"2024-01-01"}
          max={today}
        />
      </label>

      <label className="inputSelect">
        카테고리
        <select className="category" ref={categoryRef}>
          {categoryInfo.map((categoryInfo) => (
            <option
              key={categoryInfo.category_cd}
              value={categoryInfo.category_cd}
            >
              {categoryInfo.category_nm}
            </option>
          ))}
        </select>
      </label>
      <label className="inputTitle">
        타이틀
        <input type="text" name="title" ref={titleRef} maxLength={30} />
      </label>

      <label className="inputNumber">
        금액
        <input
          type="text"
          name="num"
          value={num}
          onChange={changeNumType}
          maxLength={15}
          autoComplete="off"
          ref={amountRef}
        />
      </label>

      <Button
        variant="contained"
        className="submitBtn"
        type="submit"
        color="secondary"
        onClick={submitForm}
      >
        추가
      </Button>
    </form>
  );
}
