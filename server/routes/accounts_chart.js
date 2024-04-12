const express = require("express");
const mysql = require("mysql");
const db = require("../database/db");
const router = express.Router();
const authCheck = require("../common/authCheck");

// 메인
router.get("/accounts_chart", (req, res) => {});

// 차트 데이터
router.get("/chart_data", (req, res) => {
  const isLogined = authCheck.isLogined(req.session.is_logined);
  const sendData = {
    access: false,
  };
  if (isLogined) {
    sendData.access = true;
    const sql1 =
      "select case when category_type = 'OUT' then concat('[지출] ',category_nm) else concat('[수입] ',category_nm) end as category_nm from category order by category_cd;";
    const sql2 =
      "select t.category_cd, sum(t.account_mount) as account_mount " +
      "from ((select category_cd, account_mount from gazi.accounts where user_cd = ?) " +
      "union all (select category_cd, 0 as account_mount from gazi.category )) as t " +
      "group by t.category_cd order by t.category_cd;";
    const sql2s = mysql.format(sql2, req.session.user_cd);

    const sql3 =
      "select t.yearMonth, sum(account_mount) as account_mount " +
      "from(select date_format(a.account_date,'%Y-%m') as yearMonth, a.account_mount " +
      "from gazi.accounts as a " +
      "left outer join gazi.category as c " +
      "on a.category_cd = c.category_cd " +
      "where a.user_cd = ? and c.category_type = 'IN' union all " +
      "select '2024-01' as yearMonth, 0 as account_mount union " +
      "select '2024-02' as yearMonth, 0 as account_mount union " +
      "select '2024-03' as yearMonth, 0 as account_mount union " +
      "select '2024-04' as yearMonth, 0 as account_mount union " +
      "select '2024-05' as yearMonth, 0 as account_mount union " +
      "select '2024-06' as yearMonth, 0 as account_mount union " +
      "select '2024-07' as yearMonth, 0 as account_mount union " +
      "select '2024-08' as yearMonth, 0 as account_mount union " +
      "select '2024-09' as yearMonth, 0 as account_mount union " +
      "select '2024-10' as yearMonth, 0 as account_mount union " +
      "select '2024-11' as yearMonth, 0 as account_mount union " +
      "select '2024-12' as yearMonth, 0 as account_mount) as t  " +
      "group by t.yearMonth order by t.yearMonth;";
    const sql3s = mysql.format(sql3, req.session.user_cd);

    const sql4 =
      "select t.yearMonth, sum(account_mount) as account_mount " +
      "from(select date_format(a.account_date,'%Y-%m') as yearMonth, a.account_mount " +
      "from gazi.accounts as a " +
      "left outer join gazi.category as c " +
      "on a.category_cd = c.category_cd " +
      "where a.user_cd = ? and c.category_type = 'OUT' union all " +
      "select '2024-01' as yearMonth, 0 as account_mount union " +
      "select '2024-02' as yearMonth, 0 as account_mount union " +
      "select '2024-03' as yearMonth, 0 as account_mount union " +
      "select '2024-04' as yearMonth, 0 as account_mount union " +
      "select '2024-05' as yearMonth, 0 as account_mount union " +
      "select '2024-06' as yearMonth, 0 as account_mount union " +
      "select '2024-07' as yearMonth, 0 as account_mount union " +
      "select '2024-08' as yearMonth, 0 as account_mount union " +
      "select '2024-09' as yearMonth, 0 as account_mount union " +
      "select '2024-10' as yearMonth, 0 as account_mount union " +
      "select '2024-11' as yearMonth, 0 as account_mount union " +
      "select '2024-12' as yearMonth, 0 as account_mount) as t  " +
      "group by t.yearMonth order by t.yearMonth;";
    const sql4s = mysql.format(sql4, req.session.user_cd);

    db.query(sql1 + sql2s + sql3s + sql4s, function (err, results) {
      if (err) console.log(err);
      sendData.categoryNm = results[0];
      sendData.accountSum = results[1];
      sendData.inMonthInfo = results[2];
      sendData.outMonthInfo = results[3];
      res.send(sendData);
    });
  } else {
    res.send(sendData);
  }
});

module.exports = router;
