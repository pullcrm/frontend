<script lang="ts" setup>
import Popups from '~/components/Popups/Popups.vue'
import Toasts from '~/components/Toasts/Toasts.vue'
import PopperMenu from '~/components/PopperMenu/PopperMenu.vue'

const popperMenu = ref<any | null>(null)

provide('getPopperMenu', () => popperMenu.value)

// useMeta({
//   htmlAttr: {
//     class: process.env.MODE === 'capacitor' ? '_capacitor' : '',
//   },
// })
</script>

<template>
  <div class="main-layout">
    <RouterView />

    <Popups />
    <Toasts />

    <PopperMenu
      ref="popperMenu"
    />
  </div>
</template>

<style lang="scss">
  .main-layout {
    min-width: 300px;
    padding-top: var(--safe-area-inset-top);
    padding-bottom: var(--safe-area-inset-bottom);
  }
</style>
