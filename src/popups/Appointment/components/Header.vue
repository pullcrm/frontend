<template>
  <div class="appointment-popup-header">
    <UiPopover
      ref="popover"
      size="m"
      placement="bottom"
    >
      <template #default="{ toggle }">
        <UiTitle
          class="appointment-popup-header__title"
          size="l"
          responsive
          @click.native="toggle"
        >
          <template #prepend>
            <UiIcon
              name="solid/flag"
              size="l"
            />
          </template>

          {{ type === 'new' ? 'Новая запись' : 'Редактировать' }}
        </UiTitle>
      </template>

      <template #body="{ close }">
        <UiDropdownList>
          <UiDropdownItem
            size="m"
            @click.native="close(), $emit('update:isQueue', false)"
          >
            Запись календаря
          </UiDropdownItem>

          <UiDropdownItem
            size="m"
            @click.native="close(), $emit('update:isQueue', true)"
          >
            Очередь
          </UiDropdownItem>
        </UiDropdownList>
      </template>
    </UiPopover>

    <UiText
      v-if="isStatusVisible"
      class="appointment-popup-header__status"
      tag="a"
      href="#"
      size="l"
      right-icon="outlined/caret-down"
      responsive
    >
      {{ isQueue ? 'Очередь' : 'Запись календаря' }}
    </UiText>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { COMPLETED } from '@/constants/appointment'

@Component({
  props: {
    type: {
      type: String,
      required: true
    },

    status: {
      type: String,
      required: true
    },

    isQueue: {
      type: Boolean,
      default: false
    }
  }
})
export default class Header extends Vue {
  readonly type!: 'new' | 'edit'
  readonly status!: string
  readonly isQueue!: boolean

  get isStatusVisible () {
    return this.status !== COMPLETED
  }
}
</script>

<style lang="scss">
  .appointment-popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__status {
      color: $ui-brand-blue;
    }
  }
</style>
