require("dotenv").config();
// MySQL에 저장할 세션의 옵션
var options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NM,
  clearExpired: true, // 만료된 세션 자동 확인 및 지우기 여부
  checkExpirationInterval: 10000, // 만료된 세션이 지워지는 빈도 (milliseconds)
  expiration: 1000 * 60 * 60 * 2, // 유효한 세션의 최대 기간 2시간으로 설정 (milliseconds)
};

module.exports = options;
