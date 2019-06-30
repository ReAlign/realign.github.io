const ads = require('./ads')

module.exports = {
  languages: {
    label: '简体中文',
    shortname: '简'
  },
  ads,
  logo: {
    name: 'realign-play-logo',
    title: '雜記',
    ext: 'png',
    alt: 'Luego en 3 colores en el formato de reproducción'
  },
  share: {
    facebookCaption: 'ReAlign Play',
    twitterVia: 'ReAlignje',
  },
  newsletter: {
    provider: 'mailchimp',
    action: ''
  },
  copy: `2019 © 安亮军 | ReAlign - By
        <a href="https://vuepress.vuejs.org/" rel="noopener" target="_blank">
          VUEPRESS
        </a>`,
  footer: {
    nav1: {
      title: '雜記 | ReAlign',
      items: [
        {
          label: '关于',
          path: '/about/'
        },
        {
          label: '联系',
          path: '/contact/'
        },
        {
          label: '所有分类',
          path: '/categories/'
        },
      ]
    },
    nav2: {
      title: '组织',
      items: []
    }
  },
  social: [
    {
      name: 'twitter',
      link: 'https://www.twitter.com/ReAlignje'
    },
    {
      name: 'youtube',
      link: 'https://www.youtube.com/ReAlign'
    },
    {
      name: 'github',
      link: 'https://www.github.com/ReAlign'
    }
  ]
}
