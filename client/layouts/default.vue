<template>
  <div class="default-layout">
    <Nuxt />

    <Popups />
    <Toasts />

    <PopperMenu
      ref="popperMenu"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Popups from '~/components/Popups/Popups.vue'
import Toasts from '~/components/Toasts/Toasts.vue'
import PopperMenu from '~/components/PopperMenu/PopperMenu.vue'

@Component({
  components: {
    Popups,
    Toasts,
    PopperMenu
  },

  provide () {
    return {
      getPopperMenu: () => {
        return this.$refs.popperMenu
      }
    }
  }
})
export default class DefaultLayout extends Vue {
  $refs: {
    popperMenu: PopperMenu
  }
}
</script>

<style lang="scss">
  .default-layout {
    min-width: 300px;
  }
</style>
