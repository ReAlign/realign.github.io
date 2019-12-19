<template>
  <div class="table-contents">
    <h3 id="table-of-content" class="table-contents__title">{{ $t('table_content') }}</h3>
    <nav>
      <ol class="table-contents__list">
        <li
          :class="`table-contents__item ${header.slug === currSlug ? 'xxx' : ''}`"
          v-for="header in headers"
          :key="header.slug"
          v-if="header.level < 3">
          <!-- <a
            class="table-contents__link"
            :href="`#${header.slug}`"
            :title="header.title">
              <span>{{ header.title }}</span>
          </a> -->
          <span @click="scrollToHeader(`#${header.slug}`)">{{ header.title }}</span>
        </li>
      </ol>
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
        currSlug: ''
      };
    },
    mounted() {
      // this.listenScroll();
    },
    methods: {
      scrollToHeader (selector) {
        const el = document.querySelector(selector);

        if(el) {
          window.scrollTo({
            top: el.offsetTop - 30,
            behavior: 'smooth'
          });
        } else {
          console.error(`selector not exist: ${selector}`);
        }
      },
//////////////////////////////
      initScroll() {
        let _this = this;
        // 监听页面滚动事件
        window.addEventListener('scroll', function() {
          var removeClass = function(obj, cls) {
            if (obj.className == cls) {
              obj.className = "";
            }
          }
          var addClass = function(obj, cls) {
            if (obj.className != cls) {
              obj.className = cls;
            }
          }

          let pos = document.documentElement.scrollTop;
          if (pos > 300) {
            _this.isVisibleNav = true;
          } else {
            _this.isVisibleNav = false;
          }
          // 获取全部导航dom与元素dom
          var navList = document.querySelector("#js-nav").querySelectorAll("li");
          var items = document.querySelector("#js-content").querySelectorAll(".item");
          // 滚动后遍历元素，如果页面滚动位置大于元素的位置，赋值给变量
          var currentId = "";
          for (var i = 0; i < items.length; i++) {
            var _item = items[i];
            var _itemTop = _item.offsetTop;
            if (pos > _itemTop - 200) {
              currentId = _item.id;
            } else {
              break;
            }
          }
          // 如果已赋值了变量，进行匹配，如果匹配则添加class其他删除
          if (currentId) {
            for (var j = 0; j < navList.length; j++) {
              var _navItem = navList[j];
              var _navId = _navItem.getAttribute('data-id');
              if (_navId != currentId) {
                removeClass(_navItem, "cur");
              } else {
                addClass(_navItem, "cur");
              }
            }
          }
        })
      },
      listenScroll() {
        // debugger
        const vm = this;
        const headers = vm.headers;
        const liIds = [];
        var doc = document;

        headers.forEach((item, index) => {
          if(item.level < 3) {
            liIds.push(item.slug);
          }
        });

        // for (var i = 0; i < lis.length; i++) {
        //   var element = lis[i];
        //   liIds.push(element.querySelector('a').id);
        // }

        const $scrollBox = doc.querySelector('.page-content');
        var scrollCallback = vm.throttle(function () {
          debugger
          var top = $scrollBox.scrollTop; //设置变量top,表示当前滚动条到顶部的值
          var tt = $scrollBox.clientHeight; //设置变量tt,表示当前滚动窗口高度的值
          var num = 0;
          for (var n = 0; n < 7; n++) {
            //在此处通过判断滚动条到顶部的值和当前窗口高度的关系
            //（当前窗口的n倍 <= top <= 当前窗口的n+1倍）来取得和导航索引值的对应关系
            if (top >= n * tt && top <= (n + 1) * tt) {
              num = n;
            }
            vm.currSlug = liIds[num];
          }
        }, 100)
        document.addEventListener('scroll', scrollCallback)
      },
      //节流
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

.table-contents
  width: 100%

  @media (max-width: $mobile)
    max-width: 300px

  &__title
    font-size: $title1
    line-height: 1em
    margin-bottom: 22px

  &__item
    counter-increment: a
    margin-bottom: 10px

    &:before
      content: counter(a)
      border-radius: 5px
      margin-right: 4px
      background-color: $primaryColor
      color: white
      width: 25px
      // padding: 4px 0
      text-align: center
      display: inline-block
      font-weight: 700

  &__link
    color: $textColor
    text-transform: uppercase
    font-size: $mediumText
    font-weight: bold
    padding: 10px

    &:hover
      text-decoration: underline

</style>
