<template>
  <transition name="sw-update-popup">
    <div
      v-if="enabled"
      class="sw-update-popup">
      {{message}}
      <br>
      <button @click="reload">{{buttonText}}</button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    updateEvent: {
      type: Object,
      default: null
    }
  },

  computed: {
    popupConfig () {
      for (const config of [this.$themeLocaleConfig, this.$site.themeConfig]) {
        const sw = config.serviceWorker
        if (sw && sw.updatePopup) {
          return typeof sw.updatePopup === 'object' ? sw.updatePopup : {}
        }
      }
      return null
    },

    enabled () {
      return Boolean(this.popupConfig && this.updateEvent)
      // return true
    },

    message () {
      const c = this.popupConfig
      return (c && c.message) || this.$t('new_content')
    },

    buttonText () {
      const c = this.popupConfig
      return (c && c.buttonText) || this.$t('refresh')
    }
  },

  methods: {
    reload () {
      if (this.updateEvent) {
        this.updateEvent.skipWaiting().then(() => {
          location.reload(true)
        })
        this.updateEvent = null
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.sw-update-popup
  position fixed
  right 1em
  bottom 1em
  padding 1em
  font-size 1.2em
  line-height 2em
  border 1px solid #fff
  border-radius 6px
  background #fff
  box-shadow 2px 5px 10px rgba(0, 0, 0, 0.5)
  text-align center
  z-index 11

  button
    border 1px solid $primaryColor
    background #fff
    border-radius 1em
    color $primaryColor
    margin-top 0.5em
    padding 0.25em 2em
    transition all .3s
    &:hover
      border 1px solid $primaryColor
      background $primaryColor
      color #fff
      cursor pointer

.sw-update-popup-enter-active, .sw-update-popup-leave-active
  transition opacity 0.3s, transform 0.3s

.sw-update-popup-enter, .sw-update-popup-leave-to
  opacity 0
  transform translate(0, 50%) scale(0.5)
</style>