const express = require("express");
const db = require("../database/db");
const authCheck = require("../common/authCheck");
const router = express.Router();

// 해시알고리즘 모듈
const bcrypt = require("bcrypt");

// 메인
router.get("/", (req, res) => {});

// 로그인
router.post("/login", (req, res) => {
  try {
    // 1. ID/Password 받아오기
    const login_id = req.body.login_id;
    const password = req.body.password;
    const sendData = { userCheck: "" };

    // 2. DB에서 회원 조회
    db.query(
      "select * from gazi.user where user_id = ?",
      login_id,
      function (error, results) {
        if (error) throw error;
        // 등록된 회원 유무 판별
        if (results.length > 0) {
          // 비밀번호 일치 여부 판별
          bcrypt.compare(password, results[0].password, (error, result) => {
            if (result === true) {
              req.session.user_cd = results[0].user_cd;
              req.session.is_logined = true;
              res.cookie("connect_id", req.session.id, { maxAge: 7200 });
              // 클라이언트에 세션 정보 (ID) 보내기
              //sendData.id = req.session.id;
              sendData.userCheck = "Y";
            } else {
              sendData.userCheck = "로그인 정보가 일치하지 않습니다.";
            }
            res.send(sendData);
          });
        } else {
          sendData.userCheck = "등록되지 않은 회원입니다.";
          res.send(sendData);
        }
      }
    );
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

// 로그아웃
router.get("/logout", (req, res) => {
  res.clearCookie("connect_id");
  req.session.destroy(function (err) {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

module.exports = router;
