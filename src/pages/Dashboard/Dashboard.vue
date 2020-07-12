<template>
  <UiContainer>
    <!-- Who we are banner -->
    <DonateBanner />

    <Companies />

    <UiPanel>
      <pre>
        {{ company }}
      </pre>
    </UiPanel>
  </UiContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import DonateBanner from './components/DonateBanner.vue'
import Companies from './components/Companies.vue'

@Component({
  components: {
    Companies,
    DonateBanner
  }
})
export default class Dashboard extends Vue {
  get company () {
    return this.$store.getters['company/current']
  }
}
</script>

<style lang="scss">
  //
</style>
