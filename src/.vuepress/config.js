// See more in https://github.com/ktquez/vuepress-theme-ktquez#configuration
const path = require('path')
const head = require('./config/head')
const themeConfig = require('./config/themeConfig')
const resolve = pathName => path.join(__dirname, pathName)

module.exports = {
  // theme: 'ktquez',
  head,
  themeConfig,
  base: '/',
  port: 8899,
  dest: '.vuepress/../dist',
  title: `杂记`,
  // ga: `MY TRACKING CODE GOOGLE ANALYTICS`,
  evergreen: true,  // For modern browsers
  serviceWorker: true,
  locales: {
    '/': {
      lang: 'zh-cn'
    },
    // '/en/': {
    //   lang: 'en'
    // }
  },
  configureWebpack () {
    return {
      resolve: {
        alias: {
          '@public': resolve('./public')
        }
      }
    }
  }
}
