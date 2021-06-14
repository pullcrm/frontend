<template>
  <Layout class="full-widget-pick-date-page">
    <UiTitle
      size="m"
      responsive
      class="full-widget-pick-date-page__title"
    >
      Выберите время
    </UiTitle>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Layout from '../../components/Layout.vue'

@Component({
  components: {
    Layout
  }
})
export default class PickDatePage extends Vue {}
</script>

<style lang="scss" src="./PickDatePage.scss"></style>
