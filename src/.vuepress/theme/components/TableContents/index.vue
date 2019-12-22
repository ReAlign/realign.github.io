<template>
  <div class="table-contents">
    <h3
      id="table-of-content"
      class="table-contents__title">
      {{ $t('table_content') }}
    </h3>
    <nav class="toc j-x-nav">
      <ol class="table-contents__list">
        <li
          :class="`table-contents__item ${header.slug === currSlug ? 'xxx' : ''}`"
          v-for="header in formatHeaders"
          :key="header.slug">
          <!-- {{header.level}} <a class="table-contents__link" :href="`#${header.slug}`" :title="header.title"><span>{{ header.title }}</span></a> -->
          <span
            :data-slug="`#${header.slug}`"
            class="table-contents__item_tcspan"
            @click="scrollToHeader(header.slug)">
            {{ header.title }}
          </span>
          <ol
            class="table-contents__item-ol"
            v-if="header.children && header.children.length">
              <li
                class="table-contents__item-ol__li"
                v-for="h in header.children"
                :key="h.slug">
                <span
                  class="table-contents__item-ol__li_tcspan"
                  :data-slug="`#${h.slug}`"
                  @click="scrollToHeader(h.slug)">
                  {{ h.title }}
                </span>
              </li>
          </ol>
        </li>
      </ol>
      <svg class="svg-marker j-svg-marker" width="200" height="200">
        <path
          class="svg-path"
          stroke="#ae4967"
          stroke-width="3"
          fill="transparent"
          stroke-dasharray="0, 0, 0, 1000"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform="translate(-0.5, -0.5)"
        />
      </svg>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'TableContents',

    props: {
      headers: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currSlug: '',
        formatHeaders: [],

        TOP_MARGIN: 0,
        BOTTOM_MARGIN: 0,

        // 容器
        toc: null,
        // svg path - dom
        tocPath: null,
        //
        tocItems: null,
        pathLength: null,

        PATH_TURN_Y: -4,
      };
    },
    mounted() {
      const vm = this;

      vm.handleHeaders();
      setTimeout(() => {
        vm.load();
      }, 200);
    },
    methods: {
      handleHeaders() {
        const _mapFn = x => {
          const o = {};
          Object.keys(x).forEach(k => o[k] = x[k]);
          return o;
        };

        const vm = this;
        const fhs = vm.formatHeaders;
        const hs = vm.headers.map(_mapFn);

        let index = -1;

        hs.forEach((h, i) => {
          if(h.level === 2) {
            fhs.push(h);
            index++;

            fhs[index].children = [];
          } else if(h.level === 3) {
            fhs[index].children.push(h);
          }
        });
      },
      scrollToHeader (selector) {
        const el = document.querySelector(`#${selector}`);

        if(el) {
          window.scrollTo({
            top: el.offsetTop - 30,
            behavior: 'smooth'
          });

          // setTimeout(() => {
          //   window.location.hash = selector;
          // }, 1200);
        } else {
          console.error(`selector not exist: ${selector}`);
        }
      },
      ///////////
      load() {
        // 绑事件
        const vm = this;

        // dom 获取
        vm.toc = document.querySelector('.j-x-nav');
        vm.tocPath = document.querySelector('.j-svg-marker path');

        window.addEventListener('resize', vm.drawPath.bind(vm), false);
        window.addEventListener('scroll', vm.sync.bind(vm), false);

        vm.drawPath();
      },
      drawPath() {
        const vmm = this;

        vmm.tocItems = [].slice.call(vmm.toc.querySelectorAll('li'));

        // 缓存元素参考和测量
        vmm.tocItems = vmm.tocItems.map((item) => {
          const anchor = item.querySelector('span');
          const _id = anchor.dataset.slug.slice(1);
          const target = document.getElementById(_id);
          return {
            listItem: item,
            anchor,
            target,
          };
        });

        // 删除丢失的目标
        vmm.tocItems = vmm.tocItems.filter(item => !!item.target);

        const path = [];
        let pathIndent;

        vmm.tocItems.forEach((item, i) => {
          const x = item.anchor.offsetLeft - 5;
          const y = item.anchor.offsetTop;
          const height = item.anchor.offsetHeight;

          if (i === 0) {
            path.push('M', x, y, 'L', x, y + height);
            item.pathStart = 0;
          } else {
            // 当有一个变化时，再画一条线
            // 缩进级别
            if (pathIndent !== x) {
              path.push('L', pathIndent, y + vmm.PATH_TURN_Y);
            }

            path.push('L', x, y + vmm.PATH_TURN_Y);

            // 设置当前路径，以便我们可以测量它
            vmm.tocPath.setAttribute('d', path.join(' '));
            item.pathStart = vmm.tocPath.getTotalLength() || 0;

            path.push('L', x, y + height);
          }

          pathIndent = x;

          vmm.tocPath.setAttribute('d', path.join(' '));
          item.pathEnd = vmm.tocPath.getTotalLength();

        });

        vmm.pathLength = vmm.tocPath.getTotalLength();
        vmm.sync();
      },
      sync() {
        const vmm = this;
        const windowHeight = window.innerHeight;
        const realWH_TM = windowHeight * vmm.TOP_MARGIN;
        const realWH_BM = windowHeight * (1 - vmm.BOTTOM_MARGIN);

        let pathStart = vmm.pathLength;
        let pathEnd = 0;

        var visibleItems = 0;

        vmm.tocItems.forEach(function (item) {
          const targetBounds = item.target.getBoundingClientRect();
          const _bottom = targetBounds.bottom;
          const _top = targetBounds.top;

          if (_bottom > realWH_TM && _top < realWH_BM) {
            pathStart = Math.min(item.pathStart, pathStart);
            pathEnd = Math.max(item.pathEnd, pathEnd);

            visibleItems += 1;

            // item.listItem.classList.add('visible');
          } else {
            // item.listItem.classList.remove('visible');
          }
        });

        // S指定可见路径或完全隐藏路径
        // 如果没有可见的项目
        if (visibleItems > 0 && pathStart < pathEnd) {
          vmm.tocPath.setAttribute('stroke-dashoffset', '1');
          const dashArray = `1, ${pathStart}, ${(pathEnd - pathStart)}, ${vmm.pathLength}`;
          vmm.tocPath.setAttribute('stroke-dasharray', dashArray);
          vmm.tocPath.setAttribute('opacity', 1);
        } else {
          // vmm.tocPath.setAttribute('opacity', 0);
        }
      },

      throttle(func, wait, options) {
        // 上下文，函数参数，函数返回值
        var context, args, result;
        // 延时器
        var timeout = null;
        // 上一次执行的func的时间点
        var previous = 0;
        if (!options) options = {};
        // 延时执行函数
        var later = function () {
          // 如果及时调用被关闭，则设置previous为0
          previous = options.leading === false ? 0 : new Date();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        };
        /** 以上变量以及函数都是通过闭包的方式访问的 **/
        return function () {
          var now = new Date();
          if (!previous && options.leading === false) previous = now;
          // remaining容易理解，表示还剩多少时间可以再次执行func
          var remaining = wait - (now - previous);
          // 保存上下文
          context = this;
          // 获取函数参数
          args = arguments;
          // 及时模式
          // remaining小于等于0是跳出wait的限制，可以执行了
          // remaining大于wait的情况，只有在客户机修改了系统时间的时候才会出现
          // 这两种情况都可以立刻对func做调用
          if (remaining <= 0 || remaining > wait) {
            // 清除定时器
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          } else if (!timeout && options.trailing !== false) { // 延时模式
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
      },
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

span-before()
  content ""
  position absolute
  display block
  width 3px
  height calc(100% + 7px)
  top -6px
  // left -4px
  // background #fff
  left -1px
  background $primaryColor
  border-radius 1.5px
  z-index -2
  transform-origin 1.5px 50%
  transform scale(1, 0)
  transition all $ani-duration, background $ani-duration

span-before-hover()
  // left -1px
  // background $primaryColor
  transform scale(1, 1)

// w: width | mt: margin-top | lh: line-height
li-sign-before(w = 18px, mt = 6px, lh = 1.4)
  display inline-block
  width w
  margin-top mt
  margin-right 4px
  background-color $primaryColor
  border-radius 5px
  color #fff
  text-align center
  font-weight 700
  line-height lh

tc-span()
  position relative
  cursor pointer
  z-index 1

.table-contents
  width: 100%

  @media (max-width: $mobile)
    max-width 300px

  &__title
    font-size $title1
    line-height 1em
    margin-bottom 22px
  &__item
    counter-increment a
    margin-bottom 10px
    &_tcspan
      tc-span()
      &:before
        span-before()

      &:hover
        &:before
          span-before-hover()

    &-ol
      margin-left 34px
      &__li
        counter-increment x
        font-size 14px
        &_tcspan
          tc-span()
          padding-left 1px
          &:before
            span-before()
          &:hover
            &:before
              span-before-hover()
        &:before
          content counter(x)
          li-sign-before(18px, 6px, 1.4)
    &:before
      content counter(a)
      li-sign-before(25px, 0, 1.4)

.svg-marker
  position absolute
  top 0
  left 6px
  width 100%
  height 100%
  z-index 0
  pointer-events none
  & path
    transition all $ani-duration ease

li.visible
  & > span
    color $primaryColor
    transform translate(5px)
</style>
