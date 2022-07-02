<script lang="ts" setup>
import Navbar from '~/components/Navbar/Navbar.vue'
import Header from '~/components/Header/Header.vue'
import Loader from '~/components/Loader.vue'

const baseStore = useBaseStore()

const router = useRouter()

const loading = computed(() => {
  return baseStore.loading
})

async function onRefresh(done: any) {
  window.location.reload()

  // await router.push({
  //   query: {
  //     update: Date.now(),
  //   },
  // })

  done()
}
</script>

<template>
  <q-layout class="dashboard-layout">
    <q-pull-to-refresh
      class="dashboard-layout__pull-to-refresh"
      no-mouse
      @refresh="onRefresh"
    >
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
    </q-pull-to-refresh>
  </q-layout>
</template>

<style lang="scss" src="./dashboard.scss"></style>
