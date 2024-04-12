const express = require("express");
const mysql = require("mysql");
const db = require("../database/db");
const authCheck = require("../common/authCheck");
const router = express.Router();

// 가계부 화면
router.get("/accounts", (req, res) => {
  res.send(req.session.user_cd);
});

// 가계부 기본 데이터
router.get("/accounts_data", (req, res) => {
  const equalId = authCheck.equalId(req.cookies.connect_id, req.session.id);
  const isLogined = authCheck.isLogined(req.session.is_logined);

  console.log(req.cookies.connect_id);
  console.log(req.session.id);

  const sendData = {
    access: false,
  };

  if (equalId && isLogined) {
    sendData.access = true;
    const sql1 =
      "select O.outInfo, I.inInfo from (select A.user_cd, sum(A.account_mount) as outInfo " +
      "from gazi.accounts as A " +
      "left outer join gazi.category as C on A.category_cd = C.category_cd " +
      "where A.user_cd = ? AND C.category_type = 'OUT' " +
      "group by C.category_type order by  C.category_type) as O " +
      "left outer join  (select A.user_cd, sum(A.account_mount) as inInfo " +
      "from gazi.accounts as A " +
      "left outer join gazi.category as C on A.category_cd = C.category_cd " +
      "where A.user_cd = ? and C.category_type = 'IN' " +
      "group by C.category_type order by  C.category_type) as I on O.user_cd = I.user_cd;";

    const sql1s = mysql.format(sql1, [
      req.session.user_cd,
      req.session.user_cd,
    ]);
    const sql2 =
      "select category_cd, category_type, case when category_type = 'OUT' then concat('[지출] ',category_nm) else concat('[수입] ',category_nm) end as category_nm  from gazi.category order by category_cd;";

    const sql3 =
      "select * from (select @rownum := @rownum + 1 as rownum, t.* from (select a.account_cd, date_format(a.account_date,'%Y-%m-%d') as account_date, c.category_nm, a.account_title, a.account_mount " +
      "from gazi.accounts as a " +
      "left outer join gazi.category as c " +
      "on a.category_cd = c.category_cd " +
      "where a.user_cd = ?) as t, (select @rownum := 0) tmp order by t.account_date)as n order by n.rownum desc;";
    const sql3s = mysql.format(sql3, req.session.user_cd);

    db.query(sql1s + sql2 + sql3s, function (err, results) {
      if (err) console.log(err);
      sendData.inOutInfo = results[0];
      sendData.categoryInfo = results[1];
      sendData.accountsList = results[2];
      res.send(sendData);
    });
  } else {
    res.send(sendData);
  }
});

// 지출 내역 추가
router.post("/add_account", (req, res) => {
  const sql =
    "insert into gazi.accounts(category_cd,user_cd,account_title,account_mount,account_date) values(?,?,?,?,?);";
  const sqls = mysql.format(sql, [
    req.body.category_cd,
    req.session.user_cd,
    req.body.account_title,
    req.body.account_mount,
    req.body.account_date,
  ]);
  db.query(sqls, function (err) {
    if (err) console.log(err);
    res.send("가계부 내역이 추가되었습니다.");
  });
});

// 지출 내역 삭제
router.post("/delete_account", (req, res) => {
  const sql = "delete from gazi.accounts where account_cd = ?;";
  const sqls = mysql.format(sql, req.body.account_cd);
  db.query(sqls, function (err) {
    if (err) console.log(err);
    res.send("삭제되었습니다.");
  });
});

module.exports = router;
