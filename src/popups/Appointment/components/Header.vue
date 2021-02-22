<template>
  <div class="appointment-popup-header">
    <UiTitle
      size="l"
      responsive
    >
      {{ type === 'new' ? 'Новая запись' : 'Редактировать'}}
    </UiTitle>

    <UiText
      v-if="isStatusVisible"
      ref="reference"
      tag="a"
      href="#"
      size="l"
      right-icon="outlined/caret-down"
      responsive
      @click.native.prevent="onStatusMenu"
    >
      {{ isQueue ? 'Очередь' : 'Запись календаря' }}
    </UiText>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { COMPLETED } from '@/constants/appointment'

import PopperMenu from '@/components/PopperMenu/PopperMenu.vue'

@Component({
  inject: ['getPopperMenu'],

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

  readonly getPopperMenu!: () => PopperMenu

  $refs: {
    reference: HTMLElement
  }

  get isStatusVisible () {
    return this.status !== COMPLETED
  }

  onStatusMenu () {
    const popperMenu = this.getPopperMenu()

    if (popperMenu.reference === this.$refs.reference) {
      return
    }

    const appointment = {
      name: 'Запись календаря',
      click: () => this.$emit('update:isQueue', false)
    }

    const queue = {
      name: 'Очередь',
      click: () => this.$emit('update:isQueue', true)
    }

    popperMenu.open(this.$refs.reference, {
      options: [{
        items: [appointment, queue]
      }]
    })
  }
}
</script>

<style lang="scss">
  .appointment-popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ui-text {
      color: $ui-brand-blue;
    }
  }
</style>
