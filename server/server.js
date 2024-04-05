// express 모듈 호출
const express = require("express");

// express 세션, 세션 저장소 모듈
const session = require("express-session");
var mySQLStore = require("express-mysql-session")(session);
const sessionOption = require("./lib/sessionOption");
var sessionStore = new mySQLStore(sessionOption);

// CORS 설정
var cors = require("cors");

// cookie parser
var cookieParser = require("cookie-parser");

const mainRouter = require("./routes/main");
const accountsRouter = require("./routes/accounts");
const accountsChartRouter = require("./routes/accounts_chart");
const app = express();
const port = 3001;

// CORS 설정
app.use(cors());
// cookie-parser 설정
app.use(cookieParser());

// 세션 설치
// resave: false => 세션 데이터가 바뀌기 전까지는 세션 저장소의 값을 저장하지 않음
// saveUninitialized: true => 세션이 필요하기 전까지는 구동시키지 않음
// store : 세션 저장소 (db에 저장)

app.use(
  session({
    secret: "SecretTest505011^^",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

// body-parser 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 각각의 라우터를 별도로 관리
// 1. 메인
app.use(mainRouter);
// 2. 가계부 화면
app.use(accountsRouter);
// 3. 가계부 차트 화면
app.use(accountsChartRouter);

// server port 3001 할당
// 클라이언트와 다른 번호로 충돌나지 않도록
app.listen(port, () => {
  console.log(`Server run : http://localhost:${port}/`);
});