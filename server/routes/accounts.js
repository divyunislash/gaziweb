const express = require("express");
const db = require("../database/db");
const authCheck = require("../common/authCheck");
const router = express.Router();

// 가계부 화면
router.get("/accounts", (req, res) => {});

// 가계부 기본 데이터
router.get("/accounts_data", (req, res) => {
  const equalId = authCheck.equalId(req.cookies.connect_id, req.session.id);
  const isLogined = authCheck.isLogined(req.session.is_logined);
  const sendData = {
    access: false,
  };
  if (equalId && isLogined) {
    sendData.access = true;
    const sql1 =
      "SELECT O.outInfo, I.inInfo FROM (SELECT A.user_cd, SUM(A.account_mount) AS outInfo " +
      "FROM gazi.accounts AS A " +
      "LEFT OUTER JOIN gazi.category AS C ON A.category_cd = C.category_cd " +
      "WHERE A.user_cd = ? AND C.category_type = 'OUT' " +
      "GROUP BY C.category_type ORDER BY  C.category_type) AS O " +
      "LEFT OUTER JOIN  (SELECT A.user_cd, SUM(A.account_mount) AS inInfo " +
      "FROM gazi.accounts AS A " +
      "LEFT OUTER JOIN gazi.category AS C ON A.category_cd = C.category_cd " +
      "WHERE A.user_cd = ? AND C.category_type = 'IN' " +
      "GROUP BY C.category_type ORDER BY  C.category_type) AS I ON O.user_cd = I.user_cd;";

    const sql1s = db.format(sql1, [req.session.user_cd, req.session.user_cd]);
    const sql2 =
      "SELECT category_cd, category_type, CASE WHEN CATEGORY_TYPE = 'OUT' THEN CONCAT('[지출] ',CATEGORY_NM) ELSE CONCAT('[수입] ',CATEGORY_NM) END AS category_nm  FROM GAZI.CATEGORY ORDER BY CATEGORY_CD;";

    const sql3 =
      "select * from (select @rownum := @rownum + 1 as rownum, t.* from (select a.account_cd, date_format(a.account_date,'%Y-%m-%d') as account_date, c.category_nm, a.account_title, a.account_mount " +
      "from gazi.accounts as a " +
      "left outer join gazi.category as c " +
      "on a.category_cd = c.category_cd " +
      "where a.user_cd = ?) as t, (select @rownum := 0) tmp order by t.account_date)as n order by n.rownum desc;";
    const sql3s = db.format(sql3, req.session.user_cd);

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
  const sqls = db.format(sql, [
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
  const sqls = db.format(sql, req.body.account_cd);
  db.query(sqls, function (err) {
    if (err) console.log(err);
    res.send("삭제되었습니다.");
  });
});

module.exports = router;
