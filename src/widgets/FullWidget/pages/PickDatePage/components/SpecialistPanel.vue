<script lang="ts" setup>
import { formatMoney } from '~/utils/money'

const props = defineProps({
  procedures: {
    type: Array,
    required: true,
  },

  specialist: {
    type: Object,
    required: true,
  },
})

const user = computed(() => {
  return props.specialist.user
})

const avatar = computed(() => {
  return user.value.avatar?.path
})

const fullName = computed(() => {
  return user.value.fullName
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
    class="full-widget-pick-date-page-specialist-panel"
  >
    <UiAvatar
      :image="avatar"
      :name="fullName"
      size="m"
      class="full-widget-pick-date-page-specialist-panel__image"
    />

    <div class="full-widget-pick-date-page-specialist-panel__info">
      <UiText
        size="l"
        strong
        responsive
      >
        {{ proceduresText }}
      </UiText>

      <UiText
        size="m"
        responsive
        class="full-widget-pick-date-page-specialist-panel__name"
      >
        {{ fullName }}
      </UiText>
    </div>

    <UiPrice
      size="s"
      class="full-widget-pick-date-page-specialist-panel__price"
    >
      {{ formatMoney(price) }}
    </UiPrice>
  </UiPanel>
</template>

<style lang="scss" src="./SpecialistPanel.scss"></style>
