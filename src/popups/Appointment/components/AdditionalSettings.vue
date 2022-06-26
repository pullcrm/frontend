<script lang="ts" setup>
import { SOURCE_DASHBOARD, SOURCE_WIDGET } from '~/constants'

import { sourcesDict } from '~/logics/appointment'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },
})

defineEmits(['update:source'])

const activeSource = computed(() => {
  return sourcesDict[props.source as keyof typeof sourcesDict]
})

const sources = computed(() => {
  return [SOURCE_DASHBOARD, SOURCE_WIDGET]
    .map(value => ({
      name: sourcesDict[value as keyof typeof sourcesDict],
      value,
    }))
})
</script>

<template>
  <div class="appointment-popup-additional-settings">
    <!-- <UiTitle
      class="appointment-popup-additional-settings__title"
      size="s"
      responsive
    >
      Інше
    </UiTitle> -->

    <UiField label="Джерело">
      <UiSelect
        :model-value="activeSource"
        :options="sources"
        required
        label-key="name"
        disabled
        placeholder="Вибрати час"
        @update:model-value="$emit('update:source', $event.value)"
      />
    </UiField>
  </div>
</template>

<style lang="scss">
  .appointment-popup-additional-settings {
    &__title {
      margin-bottom: 12px;
    }
  }
</style>
