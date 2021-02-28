<template>
  <UiPanel class="dashboard-page-analytics-panel">
    <UiText
      size="m"
      responsive
    >
      {{ name }}

      <template #append>
        <UiTitle
          size="s"
        >
          {{ value }}
        </UiTitle>
      </template>
    </UiText>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    name: {
      type: String,
      required: true
    },

    value: {
      type: [Number, String],
      default: 0
    }
  }
})
export default class AnalyticPanel extends Vue {
  readonly name!: string
  readonly value!: number
}
</script>

<style lang="scss">
  .dashboard-page-analytics-panel {
    display: flex;
    height: 124px;
    background: transparent;

    .ui-text {
      width: 100%;
    }
  }
</style>
