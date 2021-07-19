<template>
  <div class="appointment-popup-header">
    <UiTitle
      class="appointment-popup-header__title"
      size="l"
      responsive
    >
      {{ title }}
    </UiTitle>

    <UiPopover
      ref="popover"
      size="m"
      placement="bottom_end"
    >
      <UiText
        class="appointment-popup-header__status"
        tag="a"
        href="#"
        size="l"
        right-icon="outlined/caret-down"
        responsive
      >
        {{ activeStatus }}
      </UiText>

      <template #body="{ close }">
        <UiDropdownList>
          <UiText
            v-for="item in statuses"
            :key="item.value"
            tag="a"
            href="#"
            size="m"
            :left-icon="item.value === status ? 'outlined/check' : 'outlined/minus'"
            @click.native.prevent="close(), $emit('update:status', item.value)"
          >
            {{ item.name }}
          </UiText>
        </UiDropdownList>
      </template>
    </UiPopover>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { IN_PROGRESS, COMPLETED, CANCELED } from '~/constants/appointment'

import { statusesDict } from '~/logics/appointment'

@Component({
  props: {
    title: {
      type: String,
      required: true
    },

    status: {
      type: String,
      required: true
    }
  }
})
export default class Header extends Vue {
  readonly title!: string
  readonly status!: string

  get activeStatus () {
    return statusesDict[this.status]
  }

  get statuses () {
    return [COMPLETED, CANCELED, IN_PROGRESS]
      .map(value => ({
        name: statusesDict[value],
        value
      }))
  }
}
</script>

<style lang="scss">
  .appointment-popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__status {
      color: $ui-blue-brand;
    }
  }
</style>
