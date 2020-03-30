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
      md.use(require('markdown-it-copy'), {
        showCodeLanguage: true,
        attachText: [
          '作者：安亮军 @ReAlign',
          '来源：杂记 | https://blog.realign.pro',
          '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。',
        ].join('\n')
      })
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
          '@public': resolve('./public'),
          '@n_ms': resolve('./../../node_modules')
        }
      }
    }
  }
}
