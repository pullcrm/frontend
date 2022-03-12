<template>
  <div class="appointment-popup-additional-settings">
    <UiTitle
      class="appointment-popup-additional-settings__title"
      size="s"
      responsive
    >
      Інше
    </UiTitle>

    <UiField label="Джерело">
      <UiSelect
        :value="activeSource"
        :options="sources"
        required
        label-key="name"
        :disabled="type !== 'new'"
        placeholder="Вибрати час"
        @input="$emit('update:source', $event.value)"
      />
    </UiField>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SOURCE_WIDGET, SOURCE_DASHBOARD } from '~/constants'

import { sourcesDict } from '~/logics/appointment'

@Component({
  props: {
    type: {
      type: String,
      required: true
    },

    source: {
      type: String,
      required: true
    }
  }
})
export default class AdditionalSettings extends Vue {
  readonly type!: string
  readonly source!: string

  get activeSource () {
    return sourcesDict[this.source]
  }

  get sources () {
    return [SOURCE_DASHBOARD, SOURCE_WIDGET]
      .map(value => ({
        name: sourcesDict[value],
        value
      }))
  }
}
</script>

<style lang="scss">
  .appointment-popup-additional-settings {
    &__title {
      margin-bottom: 12px;
    }
  }
</style>
