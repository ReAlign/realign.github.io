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
  copy: [
    `
      <div
        id="la_20158977"
        style="
          display: inline-block;
          width: 200px;
          height: 12px;
          line-height: 12px;
          margin-right: 16px;
          padding-right: 16px;
          border-right: 2px solid #fff;
          opacity: 0;
        "
      >
      </div>
    `,
    // 页脚
    `
      © 2019
      <a
        href="//realign.pro"
        rel="noopener"
        target="_blank">
      🔗Realign.pro
      </a>
      版权所有
      ICP证：
      <a
        href="https://beian.miit.gov.cn"
        rel="noopener"
        target="_blank">
        浙ICP备19000351号
      </a>
      <div style="display:inline-block;margin:0 auto 0 3px;padding:0;">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010802010599" style="display:inline-block;text-decoration:none;line-height:12px;">
          <img src="/images/others/beian.png" style="width:14px;vertical-align:top;"/>
          <p style="display:inline-block;line-height:16px;margin: 0px 0px 0px 5px; color:#939393;">浙公网安备 33010802010599号</p>
        </a>
      </div>
      | ReAlign - By
      <a
        href="https://github.com/ktquez/vuepress-theme-ktquez"
        rel="noopener"
        target="_blank"
        style="text-decoration: underline;">
        ktquez
      </a>
      &nbsp;&&nbsp;
      <a
        href="https://vuepress.vuejs.org/"
        rel="noopener"
        target="_blank"
        style="text-decoration: underline;">
        Vuepress
      </a>
    `
  ].join(''),
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
      link: 'https://www.youtube.com/channel/UCtnj7c33hiaPeDEka4iHeRg'
    },
    {
      name: 'github',
      link: 'https://www.github.com/ReAlign'
    }
  ]
}
