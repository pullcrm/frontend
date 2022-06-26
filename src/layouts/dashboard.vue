<script lang="ts" setup>
// head () {
//   return {
//     base: {
//       href: this.$router.base,
//       target: '_blank'
//     }
//   }
// }

import Navbar from '~/components/Navbar/Navbar.vue'
import Header from '~/components/Header/Header.vue'
import Loader from '~/components/Loader.vue'

const baseStore = useBaseStore()

const loading = computed(() => {
  return baseStore.loading
})
</script>

<template>
  <q-layout class="dashboard-layout">
    <Navbar
      class="dashboard-layout__navbar"
    />

    <div class="dashboard-layout__container">
      <Header
        class="dashboard-layout__header"
      />

      <router-view />

      <div class="dashboard-layout__footer" />
    </div>

    <PortalTarget name="sidebar" />

    <Loader
      v-if="loading"
    />
  </q-layout>
</template>

<style lang="scss" src="./dashboard.scss"></style>
