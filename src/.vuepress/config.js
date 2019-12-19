// See more in https://github.com/ktquez/vuepress-theme-ktquez#configuration
const path = require('path')
const head = require('./config/head')
const themeConfig = require('./config/themeConfig')
const resolve = pathName => path.join(__dirname, pathName)
const a = require('./a');

module.exports = {
  head,
  themeConfig,
  base: '/',
  port: 8899,
  dest: '.vuepress/../dist',
  title: `杂记`,
  description: '杂记，雑記，专注记录技术点滴，以及生活随笔，安亮军的博客。',
  evergreen: true,
  serviceWorker: true,
  markdown: {
    // lineNumbers: true,
    config: md => {
      // md.set({ breaks: true })
      md.use(a)
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
