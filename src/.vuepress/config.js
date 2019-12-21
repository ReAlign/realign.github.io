// See more in https://github.com/ktquez/vuepress-theme-ktquez#configuration
const path = require('path')
const head = require('./config/head')
const themeConfig = require('./config/themeConfig')
const resolve = pathName => path.join(__dirname, pathName)

module.exports = {
  head,
  themeConfig,
  base: '/',
  port: 8899,
  dest: '.vuepress/../dist',
  title: `杂记`,
  description: '杂记, 专注记录技术点滴',
  evergreen: true,
  serviceWorker: true,
  markdown: {
    // lineNumbers: true,
    // toc: {
    //   includeLevel: [2, 3, 4]
    // },
    config: md => {
      // md.set({ breaks: true })
      md.use(require('markdown-it-copy'))
    }
  },
  locales: {
    '/': {
      lang: 'zh-cn'
    },
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
