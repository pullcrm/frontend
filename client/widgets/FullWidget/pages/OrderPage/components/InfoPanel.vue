<template>
  <UiPanel
    size="s"
    class="full-widget-order-page-info-panel"
  >
    <div class="full-widget-order-page-info-panel__inner">
      <UiTitle
        size="s"
      >
        {{ proceduresText }}
      </UiTitle>

      <UiText
        size="m"
        class="full-widget-order-page-info-panel__date"
      >
        {{ date }}
      </UiText>
    </div>

    <UiPrice
      size="s"
      class="full-widget-order-page-info-panel__price"
    >
      {{ price | price }}
    </UiPrice>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    date: {
      type: String,
      required: true
    },

    procedures: {
      type: Array,
      required: true
    }
  }
})
export default class InfoPanel extends Vue {
  readonly date
  readonly procedures

  get proceduresText () {
    return this.procedures
      .map(({ name }) => name)
      .join(', ')
  }

  get price () {
    return this.procedures
      .reduce((sum, { price }) => sum + price, 0)
  }
}
</script>

<style lang="scss" src="./InfoPanel.scss"></style>
