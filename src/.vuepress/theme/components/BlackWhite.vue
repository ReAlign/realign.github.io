<template>
  <div class="switch-bw">
    <span class="switch-bw__text" :class="{ 'switch-bw__text--turnon': blackMode }">
      {{ getText }}
    </span>
    <label for="switch-bw" class="switch-bw__label">
      <input type="checkbox" id="switch-bw" name="switch-bw" class="switch-bw__input" @change="handle"
        :checked="blackMode" aria-labelledby="switch-bw-text">
      <span class="switch-bw__ball"></span>
    </label>
  </div>
</template>

<script>
import EventBus from '@theme/plugins/EventBus'

const LS_KEY_THEME_MODE = 'ls_key_theme_mode'
const LS_VALUE_THEME_MODE_WHITE = 'white'
const LS_VALUE_THEME_MODE_BLACK = 'black'

export default {
  name: 'BlackWhite',

  data() {
    return {
      blackMode: false
    }
  },

  computed: {
    getText() {
      return !this.blackMode ? this.$t('turnon_night_mode') : this.$t('turnoff_night_mode')
    }
  },

  mounted() {
    const x = localStorage.getItem(LS_KEY_THEME_MODE) || ''
    this.blackMode = x === LS_VALUE_THEME_MODE_BLACK
    this.emit()
  },

  methods: {
    handle() {
      this.blackMode = !this.blackMode
      localStorage.setItem(LS_KEY_THEME_MODE, this.blackMode ? LS_VALUE_THEME_MODE_BLACK : LS_VALUE_THEME_MODE_WHITE)
      this.emit()
    },
    emit() {
      EventBus.$emit('toggle_black_white', this.blackMode)
    }
  }
}
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.switch-bw
  display: flex

  &__text
    font-size: 8px
    color: black
    text-transform: uppercase
    margin-right: 12px
    margin-top: 3px
    letter-spacing: .5px

    &--turnon
      color: white

  &__label
    position: relative
    width: 40px
    height: 20px
    border-radius: 9px
    background-color: #e2e2e2
    cursor: pointer

  &__ball
    position: absolute
    top: -2px
    left: -3px
    width: 24px
    height: 24px
    background: $primaryColor
    border-radius: 50%
    transition: left .5s

  &__input
    opacity: 0
    cursor: pointer

  &__input:checked
    + .switch-bw__ball
      left: 20px
      background-color: #999

</style>