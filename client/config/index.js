
'use strict'
// Template version: 1.1.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    /*proxyTable: {

    },*/
    proxyTable:{
        '/api':{
            target:"http://127.0.0.1:3001",//设置你调用的接口域名和端口号 别忘了加http
            changeOrigin:true,
            pathRewrite:{
                '^/api':''//这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
                //比如我要调用'http://40.00.100.133:3002/user/login'，直接写‘/api/user/login'即可
            }
        }
    },
    cssSourceMap: false
  }
}
