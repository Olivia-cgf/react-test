// 配置代理

const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
      createProxyMiddleware('/api', {  //`api`是需要转发的请求 
        target: 'https://api.uomg.com/api',  // 这里是接口服务器地址
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      })
    )
}