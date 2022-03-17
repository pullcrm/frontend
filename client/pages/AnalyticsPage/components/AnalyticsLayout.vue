<template>
  <div class="analytics-page-layout">
    <UiContainer>
      <UiTitle
        class="analytics-page-layout__title"
        size="l"
        responsive
      >
        Аналітика
      </UiTitle>

      <UiNavigation
        class="analytics-page-layout__navigation"
        :navigation="navigation"
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
  get navigation () {
    return [
      {
        name: 'Календар',
        to: { name: 'analyticsAppointments' }
      },

      {
        name: 'Фінанси',
        to: { name: 'analyticsFinance' }
      }
    ]
  }
}
</script>

<style lang="scss" src="./AnalyticsLayout.scss"></style>
