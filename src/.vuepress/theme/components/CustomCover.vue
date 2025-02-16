<template>
  <div :class="`ccc-${scene}`">
    <div class="custom-cover-container" :style="{ backgroundColor: `${bgColorMap[meta.type]} !important` }">
      <img :src="iconMap[meta.type] || iconMap.default" class="custom-cover-icon" :style="innerIconStyle" />
      <div class="custom-cover-wrap" :style="wrapStyle">️
        <p class="custom-cover-txt" :style="majorPStyle"><b :style="innerPStyle">{{ meta.title }}</b> | {{ meta.subTitle
          }}</p>
      </div>
      <!-- watermark -->
      <!-- <span class="u-water-mark">@ReAlign</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomCover',
  props: {
    scene: String,
    meta: Object
  },
  data() {
    return {
      wrapStyle: { backgroundColor: 'rgba(0, 0, 0, .3) !important', color: '#fff !important' },
      majorPStyle: { backgroundColor: 'transparent !important', color: '#fff !important' },
      innerIconStyle: { backgroundColor: 'transparent !important' },
      innerPStyle: { backgroundColor: 'transparent !important', color: '#fff !important' },
      iconMap: {
        default: '/images/cover/icons/default.png',
        http: '/images/cover/icons/http.svg',
        biz: '/images/cover/icons/biz.svg',
        coding: '/images/cover/icons/coding.svg',
        svelte: '/images/cover/icons/svelte.svg',
        git: '/images/cover/icons/git.svg',
        browser: '/images/cover/icons/browser.svg',
        js: '/images/cover/icons/js.svg',
        algorithm: '/images/cover/icons/algorithm.svg',
        css: '/images/cover/icons/css.svg',
        thought: '/images/cover/icons/thought.svg',
      },
      bgColorMap: {
        http: '#eccc68',
        biz: '#ff7f50',
        coding: '#ff6b81',
        svelte: '#a4b0be',
        git: '#57606f',
        browser: '#ffa502',
        js: '#ff6348',
        algorithm: '#ff4757',
        css: '#747d8c',
        thought: '#2f3542',
        // '#7bed9f',
        // '#70a1ff',
        // '#5352ed',
        // '#2ed573',
        // '#1e90ff',
        // '#3742fa',
        // '#e74c3c',
        // '#8e44ad',
        // '#2980b9',
        // '#3498db',
        // '#2ecc71',
        // '#c0392b',
        // '#d35400',
        // '#f39c12',
        // '#f1c40f',
        // '#2c3e50',
        // '#7f8c8d',
      },
    }
  },
}
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.custom-cover
  &-container
    position relative
    display inline-block
    width 100%
    font-size 0
    text-align center
    vertical-align middle
    border-radius 12px
  &-icon
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 20px
  &-wrap
    position absolute
    display flex
    align-items center
    justify-content center
    width 100%
    min-height 32px
    top 50%
    left 50%
    transform translate(-50%, -50%)
    padding 6px 8px
    overflow hidden
  &-txt
    white-space nowrap

.ccc-post_cover_detail
  position relative
  height 100%
  .custom-cover
    &-container
      height 100%
      border-radius 0
    &-icon
      width 360px
    &-wrap
      min-height 100px
      padding 16px 20px
    &-txt
      font-size 48px
      line-height 64px

.ccc-card_cover_top
  position relative
  height 100%
  .custom-cover
    &-container
      height 100%
    &-icon
      width 120px
      opacity .6
    &-wrap
      min-height 40px
      padding 6px 8px
    &-txt
      font-size 22px
      line-height 28px

.ccc-card_cover_side
  position relative
  height 100%
  .custom-cover
    &-container
      height calc(100% - 20px)
    &-icon
      width 86px
      opacity .6
    &-wrap
      padding 6px 8px
    &-txt
      font-size 14px
      line-height 20px
</style>