# [1인 개발] 가계부 웹 사이트 '가계를 지켜라'

![](image/main.jpg)
[Click here to try](https://web-gaziwebf-85phb42blumb4htd.sel5.cloudtype.app/)

💸설명: 개인의 재정 상태를 분석하기 위해서 1년간의 입·출금 내역을 기록할 수 있는 웹사이트입니다. 직접 입력한 데이터를 기반으로 총 지출/수입을 보여주고 이를 차트와 그래프로 시각화하여 보여줍니다.

## 개발 과정

💸개발 기간: 2024.03.18 ~ 2022.04.12 (26일)  
💸상세 일정:

- 03.18~03.23: 프로젝트 설계 및 개발 환경 세팅(백엔드-프론트 연결, DB 연동)
- 03.23~03.30: UI 화면 구성 (mui 라이브러리, Chart.js 활용)
- 03.30~04.05: express-mysql-session을 활용한 로그인/로그아웃 기능 구현, cors 설정
- 04.05~04.08: 입·출금 내역 리스트 보기/추가/삭제 기능 구현, 차트/그래프로 가계 현황 분석 추가, 로그인 상태에 따른 access 제어
- 04.08~04.12: 테스트 후 클라우드 타입을 통해 서버 배포

## 개발 환경

#### LANGUAGE

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white">

#### Back-end

<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white">

#### Front-end

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/CreateReactApp-09D3AC?style=flat-square&logo=CreateReactApp&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white">
<img src="https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=MUI&logoColor=white">

#### DB

<img src="https://img.shields.io/badge/mariadb-003545?style=flat-square&logo=mariadb&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white">

#### Development Tool

<img src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white">

#### Deploy

<img src="https://img.shields.io/badge/cloudtype-1997B5?style=flat-square&logoColor=white">

## 프로젝트 구조

```
save-money-app
├─ front
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  └─ src
│     ├─ App.css
│     ├─ App.js
│     ├─ App.test.js
│     ├─ components
│     │  ├─ accounts
│     │  │  ├─ Accounts.js
│     │  │  ├─ AccountsInput.js
│     │  │  ├─ AccountsList.js
│     │  │  └─ TotalAccounts.js
│     │  ├─ accounts_chart
│     │  │  ├─ AccountsChart.js
│     │  │  ├─ AccountsMonth.js
│     │  │  └─ AccountsTrend.js
│     │  ├─ common
│     │  │  ├─ LastNavi.js
│     │  │  ├─ NextNavi.js
│     │  │  └─ TopBar.js
│     │  └─ main
│     │     ├─ Login.js
│     │     └─ Main.js
│     ├─ config
│     │  └─ axiosInstance.js
│     ├─ fonts
│     │  ├─ DNFBitBitv2.ttf
│     │  └─ DungGeunMo.ttf
│     ├─ hooks
│     │  └─ useGetData.js
│     ├─ image
│     │  └─ main_logo.png
│     ├─ index.js
│     ├─ reportWebVitals.js
│     ├─ setupProxy.js
│     ├─ setupTests.js
│     ├─ style
│     │  ├─ AccountsBody.scss
│     │  ├─ AccountsChart.scss
│     │  ├─ AccountsInput.scss
│     │  ├─ AccountsList.scss
│     │  ├─ AccountsMonth.scss
│     │  ├─ AccountsTrend.scss
│     │  ├─ Main.scss
│     │  ├─ TopBar.scss
│     │  └─ TotalAccounts.scss
│     └─ util
│        └─ CookieUtil.js
├─ README.md
└─ server
   ├─ common
   │  └─ authCheck.js
   ├─ database
   │  └─ db.js
   ├─ lib
   │  └─ sessionOption.js
   ├─ package-lock.json
   ├─ package.json
   ├─ routes
   │  ├─ accounts.js
   │  ├─ accounts_chart.js
   │  └─ main.js
   └─ server.js
```

## ERD

![](image/erd.jpg)

## 기능 설명

#### 메인 페이지

##### 로그인 (/login)

![](image/login.gif)

- 프론트에서 axios 통신을 통해 json 형태로 id,password 정보를 전송하고 백엔드단에서 전송받은 데이터와 db에 저장된 회원 정보를 대조하여 유효한 데이터인지 체크  
  ※ bcrypt로 해싱된 패스워드를 bcrypt.compare()메서드를 사용해 DB에 저장되어 있는 패스워드와 대조
- 입력되지 않은 값이 있을 경우/등록된 회원이 아닐 경우 alert 창으로 확인 문구 띄움
- 로그인 성공 시 DB 세션스토어에 로그인 정보 저장, 쿠키에 session id 등록

#### 입출금 내역 페이지 (/accounts) - 세션 정보 대조를 통해 로그인 회원만 접근 가능

##### 입/출금 리스트 보기 & 내역 삭제 (/delete_account)

![](image/delete.gif)

- mui 라이브러리를 활용하여 페이징이 가능한 테이블 추가
- delete 버튼 클릭 시 등록한 입/출금 내역 삭제 가능

##### 입/출금 내역 추가 (/add_account)

![](image/save.gif)

- 최소(2024.01.01)/최대(현재) 날짜 범위를 설정하여 날짜 선택 범위 세팅
- 날짜/카테고리/타이틀/금액 중 입력되지 않은 값이 있을 경우 저장 불가

#### 입출금 분석 페이지 (/accounts_chart) - 세션 정보 대조를 통해 로그인 회원만 접근 가능

##### 2024년도 수입/지출 차트 & 달 별 수입/지출 그래프

![](image/chart.gif)

- 커스텀 훅(useGetData)으로 받아온 데이터를 기준으로 ChartJS를 적용한 차트/react-chartjs-2 라이브러리를 적용한 그래프 추가
