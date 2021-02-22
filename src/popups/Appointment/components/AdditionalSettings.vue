<template>
  <div class="appointment-popup-additional-settings">
    <UiTitle
      class="appointment-popup-additional-settings__title"
      size="s"
      responsive
    >
      Другое
    </UiTitle>

    <div class="ui-grid">
      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6'
        ]"
        label="Источник"
      >
        <UiSelect
          :value="activeSource"
          :options="sources"
          required
          label-key="name"
          :disabled="type !== 'new'"
          placeholder="Выбрать время"
          @input="$emit('update:source', $event.value)"
        />
      </UiField>

      <UiField
        :class="[
          'ui-grid-item',
          'ui-grid-item_12',
          'ui-grid-item_tablet_6'
        ]"
        label="Статус"
      >
        <UiSelect
          :value="activeStatus"
          :options="statuses"
          required
          label-key="name"
          placeholder="Выбрать время"
          @input="$emit('update:source', $event.value)"
        />
      </UiField>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { statusesDict, sourcesDict } from '@/logics/appointment'

import { SOURCE_WIDGET, SOURCE_DASHBOARD } from '@/constants'
import { IN_PROGRESS, COMPLETED, CANCELED } from '@/constants/appointment'

@Component({
  props: {
    type: {
      type: String,
      required: true
    },

    source: {
      type: String,
      required: true
    },

    status: {
      type: String,
      required: true
    }
  }
})
export default class AdditionalSettings extends Vue {
  readonly type!: string
  readonly source!: string
  readonly status!: string

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

  get activeStatus () {
    return statusesDict[this.status]
  }

  get statuses () {
    return [IN_PROGRESS, COMPLETED, CANCELED]
      .map(value => ({
        name: statusesDict[value],
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
