const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 프록시1 설정
  app.use(
    "/api1",
    createProxyMiddleware({
<<<<<<< HEAD
      // target: "http://192.168.30.161:8080",
      target: "http://passportlkm.iptime.org:20101",
=======

      //target: "http://192.168.30.161:8080",
      target: "http://i9E105.p.ssafy.io:8080",


>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      changeOrigin: true,
      pathRewrite: {
        "^/api1": "",
      },
    })
  );

  // 프록시2 설정
  app.use(
    "/api2",
    createProxyMiddleware({
<<<<<<< HEAD
      target: "http://marineweather.nmpnt.go.kr:8001",
=======
      // target: "http://marineweather.nmpnt.go.kr:8001",
      target: process.env.REACT_APP_WEATHER_URL,
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
    })
  );
  // 프록시3 설정
  app.use(
    "/api3",
    createProxyMiddleware({
<<<<<<< HEAD
      target: "https://apihub.kma.go.kr/api/typ01/url",
=======
      // target: "https://apihub.kma.go.kr/api/typ01/url",
      target: process.env.REACT_APP_KMAHUB_URL,
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      changeOrigin: true,
      pathRewrite: {
        "^/api3": "",
      },
    })
  );
  // 프록시4 설정 => 바다누리
  app.use(
    "/api4",
    createProxyMiddleware({
<<<<<<< HEAD
      target: "http://www.khoa.go.kr/api/oceangrid",
=======
      // target: "http://www.khoa.go.kr/api/oceangrid",
      target: process.env.REACT_APP_BADA_URL,
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      changeOrigin: true,
      pathRewrite: {
        "^/api4": "",
      },
    })
  );
<<<<<<< HEAD
=======

  // 프록시5 설정 => 기상청
  app.use(
    "/api5",
    createProxyMiddleware({
      target: process.env.REACT_APP_KMA_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/api5": "",
      },
    })
  );
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
};
