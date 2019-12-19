<template>
  <div class="elevator">
    <a
      @click="fired"
      class="elevator__link"
      ref="arrowTop"
      :class="{ 'elevator__link--show': show, 'elevator__link--fire': fire }">
        <span class="icon elevator__icon">greaterthan</span>
    </a>
  </div>
</template>

<script>
  import Elevator from 'elevator.js'

  const ID = '#la_20158977'
  const J_ID = {
    'cnzz': 'j-div-cnzz',
    '51la': 'j-div-51la',
    'bdtj': 'j-div-bdtj',
  }
  const NEED_NUM = [
    '总访问量',
    // '本月访问量',
    // '昨日访问量',
    '今日访问量',
    // '当前在线',
  ]

  export default {
    name: 'VueElevator',

    data () {
      return {
        show: false,
        fire: false
      }
    },

    computed: {
      elevatorConfig () {
        return this.$themeConfig.elevator
      }
    },

    mounted () {
      // debugger
      this.elevator()
      this.handleScrollEffectBackToTop()
      this.injectScriptAbout()

      this.getAllCodes()
    },

    beforeDestroy () {
      document.removeEventListener('scroll', this.setPanel)
    },

    methods: {
      getAllCodes() {
        debugger
        const a = document.querySelectorAll('.extra-class');
        console.log(a);
      },
      fired () {
        this.fire = true
      },

      elevator () {
        const config = {
          element: this.$refs.arrowTop,
          duration: this.elevatorConfig.duration,
          mainAudio: this.elevatorConfig.mainAudio,
          endAudio: this.elevatorConfig.endAudio
        }
        /* eslint-disable no-new */
        setTimeout(() => {
          new Elevator(config)
        }, 5000)
      },

      handleScrollEffectBackToTop () {
        this.setPanel()
        document.addEventListener('scroll', this.setPanel)
      },

      setPanel () {
        window.requestAnimationFrame(() => {
          // const diff = (document.documentElement.scrollHeight - document.documentElement.clientHeight) - 1500
          const diff = document.documentElement.clientHeight
          this.show = window.scrollY > diff
          if (window.scrollY === 0) {
            this.fire = false
          }
        })
      },
      injectScriptAbout() {
        this.clearAllScript()
        this.addCNZZScript()
        this.add51LaStatistical()
        this.addBaiduTongji()
      },
      clearAllScript() {
        Object.keys(J_ID).forEach((id) => {
          const _node = document.querySelector(`#${J_ID[id]}`);
          console.log('_node', id);
          console.log(_node);
          if(_node) {
            const _body = document.querySelector('body');
            if(_body) {
              _body.removeChild(_node);
            }
          }
        });
      },
      injectDom2Body(domNode) {
        if(!domNode) {
          return;
        }

        const _body = document.querySelector('body');
        if(_body) {
          _body.appendChild(domNode);
        } else {
          console.error('insert error', domNode);
        }
      },
      addBaiduTongji() {
        const _id = document.getElementById(J_ID['bdtj']);
        if(_id) {
          return;
        }
        const _protocol = document.location.protocol;

        const _div = document.createElement('div');
        _div.id = J_ID['bdtj'];
        _div.style = `
          position: absolute;
          top: -30px;
          opacity: .01;
        `;

        const _s = document.createElement('script');
        _s.type = 'text/javascript';
        _s.src = `${_protocol}//hm.baidu.com/hm.js?e1aa0ba1a5b324aba91c20ecda976616`;
        _div.appendChild(_s);

        this.injectDom2Body(_div);
      },
      addCNZZScript() {
        const _protocol = document.location.protocol;

        const _div = document.createElement('div');
        _div.id = J_ID['cnzz'];
        _div.style = `
          position: absolute;
          top: -30px;
          opacity: .01;
        `;

        const _span = document.createElement('span');
        _span.id = 'cnzz_stat_icon_1277768848';
        _div.appendChild(_span);

        const _s = document.createElement('script');
        _s.type = 'text/javascript';
        _s.src = `${_protocol}//s23.cnzz.com/z_stat.php?id=1277768848&show=pic`;
        _div.appendChild(_s);

        this.injectDom2Body(_div);
      },
      add51LaStatistical() {
        const _protocol = document.location.protocol;

        const _div = document.createElement('div');
        _div.id = J_ID['51la'];
        _div.style = `
          position: absolute;
          top: 10px;
          opacity: 1;
        `;

        const _sMain = document.createElement('script');
        _sMain.type = 'text/javascript';
        _sMain.src = `${_protocol}//quote.51.la/q?id=20158977&mb=1`;
        _div.appendChild(_sMain);

        const _sStatic = document.createElement('script');
        _sStatic.type = 'text/javascript';
        _sStatic.src = 'https://js.users.51.la/20158977.js';
        _div.appendChild(_sStatic);

        this.injectDom2Body(_div);
        this.intervalStatic();
      },
      intervalStatic() {
        const vm = this;
        let _count = 0;

        let _timer = setInterval(() => {
          _count++;
          const _id = document.querySelector(ID);
          const flag = (_id.innerText || '').length || _count === 30;
          if(flag) {
            // debugger
            clearInterval(_timer);
            if(_count !== 30) {
              const _newHtml = vm.getCustomStatic(_id);
              _id.innerHTML = _newHtml;
              setTimeout(() => {
                _id.style.opacity = 1;
              }, 1000);
            }
          }
        }, 500);
      },
      getCustomStatic(_id) {
        const vm = this;
        const _strArr = [];
        const _strSep = '<span style="margin-left: 8px;"></span>';
        const newSep = '___';
        const _obj = {};

        const _text = _id.innerText;
        const arr = _text.split('，');

        arr.forEach(item => {
          const _a = item.replace(/\s/ig, newSep).split(newSep) || [];
          if(_a.length === 2) {
            _obj[_a[0]] = _a[1];
          }
        });
        (NEED_NUM || []).forEach(key => {
          _strArr.push(`${key.replace('量', '')}：${_obj[key]}`);
        });
        return _strArr.join(_strSep);
      },
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

$posi-size = 200px

.elevator
  position: relative
  z-index: 99

  &__link
    position: fixed
    border-radius: 50%
    padding: 12px 18px
    display: inline-block
    transition: bottom .5s
    right: 12vw
    bottom: 0 - $posi-size
    opacity: 0
    visibility: hidden
    cursor: pointer
    background-color: $primaryColor
    transition: all .5s

    &--fire
      animation: fire 1s linear infinite

    &--show
      bottom: $posi-size
      opacity: 1
      visibility: visible

  &__icon
    display: inline-block
    transform: rotate(270deg)
    font-size: 20px
    color: white
    top: 2px

@keyframes fire
  from
    box-shadow: 0 30px 5px -10px $accentColor
  40%
    box-shadow: 0 15px 5px -10px darken($accentColor, 30%)
  60%
    box-shadow: 0 30px 5px -10px $accentColor
  80%
    box-shadow: 0 15px 5px -10px darken($accentColor, 30%)
  to
    box-shadow: 0 30px 5px -10px $accentColor

</style>
