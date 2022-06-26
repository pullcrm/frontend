<script lang="ts" setup>
import { formatPhone } from '~/utils/format-phone'

defineProps({
  company: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <UiPanel
    size="s"
    class="full-widget-company-panel"
  >
    <UiText
      size="m"
    >
      {{ company.name }}, {{ company.type.name }}
    </UiText>

    <UiText
      v-if="company.address"
      size="m"
      class="full-widget-company-panel__address"
    >
      {{ company.address }}
    </UiText>

    <UiText
      v-if="company.phone"
      tag="a"
      :href="`tel:${company.phone}`"
      size="m"
      class="full-widget-company-panel__phone"
    >
      {{ formatPhone(company.phone) }}
    </UiText>
  </UiPanel>
</template>

<style lang="scss" src="./CompanyPanel.scss"></style>
