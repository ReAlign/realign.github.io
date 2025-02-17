const ads = require('./ads')

module.exports = {
  languages: {
    label: 'English',
    shortname: 'EN'
  },
  translation: {
    news_title: 'Receive our articles, videos and more directly in your inbox and stay up to date.',
  },
  ads,
  logo: {
    name: 'realign-play-logo',
    title: 'Notes of Re',
    ext: 'png',
    alt: 'Logo in 3 colors in play format'
  },
  share: {
    facebookCaption: '',
    twitterVia: '',
  },
  newsletter: {
    provider: 'mailchimp',
    action: ''
  },
  copy: `2018 © MY_BLOG_NAME -
        <a href="https://v0.vuepress.vuejs.org" rel="noopener" target="_blank">
          MADE WITH VUEPRESS
        </a>`,
  footer: {
    nav1: {
      title: 'Ktquez Play',
      items: [
        {
          label: 'ABOUT',
          path: '/about/'
        },
        {
          label: 'CATEGORIES',
          path: '/categories/'
        },
        {
          label: 'CONTACT',
          path: '/contact/'
        }
      ]
    },
    nav2: {
      title: '社区',
      items: [
        {
          label: 'FB GROUP',
          link: 'https://www.facebook.com/groups/MY_GROUP'
        }
      ]
    }
  },
  social: [
    {
      name: 'twitter',
      link: `https://www.twitter.com/ReAlignje`
    },
    {
      name: 'github',
      link: `https://www.github.com/ReAlign`
    }
  ]
}
