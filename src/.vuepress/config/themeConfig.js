// See more in https://github.com/ktquez/vuepress-theme-ktquez#themeconfig
const zh = require('./locales/zh/config')
const en = require('./locales/en/config')

module.exports = {
  locales: {
    '/': zh,
  },
  serviceWorker: {
    updatePopup: {
      message: "New content 🎉🎉",
      buttonText: "Update"
    }
  },
  disqus: 'realign',
  url: `https://blog.realign.pro`,
  cdn: '',
  blackWhite: true,
  topNavigation: false,
  searchMaxSuggestions: 7,
  responsive: {
    active: true, // Turn on responsive images on the cover of the post
    ext: 'png',
    breakpoints: [320, 427, 524, 680] // Breakpoints used for picture media tag
  },
  lazyLoad: {},
  share: {
    // facebook: {
    //   appId: `MY FACEBOOK APP ID`,
    //   version: 'v3.1'
    // }
  },
  elevator: {
    duration: 4000,
    mainAudio: '/music/elevator.mp3',
    endAudio: '/music/ding.mp3'
  }
}
