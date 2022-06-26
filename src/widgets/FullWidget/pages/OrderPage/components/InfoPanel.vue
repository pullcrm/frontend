<script lang="ts" setup>
import { formatMoney } from '~/utils/money'

const props = defineProps({
  date: {
    type: String,
    required: true,
  },

  procedures: {
    type: Array,
    required: true,
  },
})

const proceduresText = computed(() => {
  return props.procedures
    .map(({ name }: any) => name)
    .join(', ')
})

const price = computed(() => {
  return props.procedures
    .reduce((sum, { price }: any) => sum + price, 0)
})
</script>

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
      {{ formatMoney(price) }}
    </UiPrice>
  </UiPanel>
</template>

<style lang="scss" src="./InfoPanel.scss"></style>
