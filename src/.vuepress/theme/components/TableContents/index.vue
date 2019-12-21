<template>
  <div class="table-contents">
    <h3 id="table-of-content" class="table-contents__title">{{ $t('table_content') }}</h3>
    <nav>
      <ol class="table-contents__list">
        <li
          :class="`table-contents__item ${header.slug === currSlug ? 'xxx' : ''}`"
          v-for="header in formatHeaders"
          :key="header.slug">
          <!-- {{header.level}} <a class="table-contents__link" :href="`#${header.slug}`" :title="header.title"><span>{{ header.title }}</span></a> -->
          <span
            class="table-contents__item_span"
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
                <span @click="scrollToHeader(h.slug)">
                  {{ h.title }}
                </span>
              </li>
          </ol>
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
        currSlug: '',
        formatHeaders: []
      };
    },
    mounted() {
      this.handleHeaders();
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

        console.log(fhs);
      },
      scrollToHeader (selector) {
        const el = document.querySelector(`#${selector}`);

        if(el) {
          window.scrollTo({
            top: el.offsetTop - 30,
            behavior: 'smooth'
          });
        } else {
          console.error(`selector not exist: ${selector}`);
        }
      },
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

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
    &_span
      cursor pointer
      &:hover
        color $primaryColor
        text-decoration underline
    &-ol
      margin-left 34px
      &__li
        counter-increment x
        font-size 14px
        & > span
          cursor pointer
          &:hover
            color $primaryColor
            text-decoration underline
        &:before
          content counter(x)
          border-radius 5px
          margin-right 4px
          background-color #ae4967
          color #fff
          width 22px
          text-align center
          display inline-block
          font-weight 700
          margin-top 6px
          // line-height 1.6

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
