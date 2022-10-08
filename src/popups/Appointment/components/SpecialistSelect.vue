<script lang="ts" setup>
defineProps({
  specialist: {
    type: Object,
    default: null,
  },

  options: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['update:specialist'])
</script>

<template>
  <div v-show="options.length > 1" class="appointment-popup-specialist-select">
    <UiTitle
      class="appointment-popup-specialist-select__title"
      size="s"
      responsive
    >
      Виконавець
    </UiTitle>

    <UiField>
      <UiSelect
        :model-value="specialist"
        required
        :options="options"
        label-key="fullName"
        placeholder="Вибрати виконавця"
        @update:model-value="
          $emit('update:specialist', $event)
        "
      />
    </UiField>
  </div>
</template>

<style lang="scss">
  .appointment-popup-specialist-select {
    &__title {
      margin-bottom: 12px;
    }
  }
</style>
