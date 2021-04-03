<template>
  <div class="analytics-page-layout">
    <UiContainer>
      <UiTitle
        class="analytics-page-layout__title"
        size="l"
        responsive
      >
        Аналитика
      </UiTitle>

      <UiTabs
        class="analytics-page-layout__tabs"
        :tabs="tabs"
      />

      <slot />
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class AnalyticsLayout extends Vue {
  get tabs () {
    return [
      {
        name: 'Календарь',
        to: { name: 'analyticsAppointments' }
      },

      {
        name: 'Финансы',
        to: { name: 'analyticsFinance' }
      }
    ]
  }
}
</script>

<style lang="scss" src="./AnalyticsLayout.scss"></style>
