const { createProxyMiddleware } = require("http-proxy-middleware");

console.log(process.env.REACT_APP_HOST);
module.exports = function (app) {
  app.use(
    "/api", //proxy가 필요한 path parameter
    createProxyMiddleware({
      target: process.env.BASE_URL, //타겟이 되는 api url
      changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정
      pathRewrite: {
        "^/api": "", // URL ^/api -> 공백 변경
      },
    })
  );
};
