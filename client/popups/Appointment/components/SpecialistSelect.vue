<template>
  <div class="appointment-popup-specialist-select">
    <UiTitle
      class="appointment-popup-specialist-select__title"
      size="s"
      responsive
    >
      Исполнитель
    </UiTitle>

    <UiField>
      <UiSelect
        :value="specialist"
        required
        :options="options"
        label-key="fullName"
        placeholder="Выбрать исполнителя"
        @input="
          $emit('resetFieldError', 'specialist')
          $emit('update:specialist', $event)
        "
      />
    </UiField>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    specialist: {
      type: Object,
      default: null
    },

    options: {
      type: Array,
      default: () => []
    }
  }
})
export default class SpecialistSelect extends Vue {
  readonly options
  readonly specialist
}
</script>

<style lang="scss">
  .appointment-popup-specialist-select {
    &__title {
      margin-bottom: 12px;
    }
  }
</style>
