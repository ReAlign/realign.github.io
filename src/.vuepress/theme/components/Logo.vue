<template>
  <router-link
    v-if="$themeLocaleConfig.logo.name"
    :to="$localeConfig.path"
    class="header-top-logo__link"
    itemprop="url">
    <img
      itemprop="logo"
      :src="`/${$themeLocaleConfig.logo.name}.${$themeLocaleConfig.logo.ext}`"
      :srcset="`/${$themeLocaleConfig.logo.name}.${$themeLocaleConfig.logo.ext} 1x, /${$themeLocaleConfig.logo.name}@2x.${$themeLocaleConfig.logo.ext} 2x`"
      :alt="$themeLocaleConfig.logo.alt"
    />
    <h1 class="header-top-logo__link__h1_title" v-if="$themeLocaleConfig.logo.title">
      <span>|</span>
      {{$themeLocaleConfig.logo.title}}
    </h1>
  </router-link>
  <div v-else>
    {{ $site.title }}
  </div>
</template>

<script>
  export default {
    name: 'Logo',
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'
$logo-height = 50px

.header-top-logo__link
  position relative
  display inline-block
  height $logo-height
  & > img
    position relative
    max-width 100%
    max-height 100%
    float left
  & > h1.header-top-logo__link__h1_title
    position relative
    height $logo-height
    line-height $logo-height
    letter-spacing 10px
    font-size 34px
    float left
    & > span
      line-height $logo-height
      font-size 20px
      margin-left 12px
      float left
</style>