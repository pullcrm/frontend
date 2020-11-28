<template>
  <div class="dashboard-page">
    <UiContainer>
      <!-- Who we are banner -->
      <DonateBanner />

      <UiPanel
        class="dashboard-page__panel"
      >
        <pre>
          {{ company }}
        </pre>
      </UiPanel>
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import DonateBanner from './components/DonateBanner.vue'

@Component({
  components: {
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
  .dashboard-page {
    &__panel {
      overflow: hidden;
    }
  }
</style>
