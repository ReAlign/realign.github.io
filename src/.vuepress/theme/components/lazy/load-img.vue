<template>
  <img v-bind="getAttributes" :style="getStyle" />
</template>

<script>
import LoadDataMixin from './mixin'

export default {
  name: 'LazyLoadImage',

  mixins: [LoadDataMixin],

  data() {
    return {
      default: {
        class: 'lazy-load-image',
        src: '',
        alt: ''
      }
    }
  }
}
</script>

<style lang="stylus">
img.lazy-load-image
  width 100%
  margin 0 0 6px 0!important
</style>
