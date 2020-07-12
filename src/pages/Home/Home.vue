<template>
  <Layout>
    <UiContainer>
      <UiPanel>
        <pre>
          {{ company }}
        </pre>
      </UiPanel>
    </UiContainer>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Layout from '@/Layout/base.vue'
import UiPanel from '@/components/Panel.vue'
import UiContainer from '@/components/Container.vue'

@Component({
  components: {
    Layout,
    UiPanel,
    UiContainer
  }
})
export default class Home extends Vue {
  get company () {
    return this.$store.getters['company/current']
  }
}
</script>

<style lang="scss">
  //
</style>
