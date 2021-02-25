<template>
  <div
    v-click-outside="{
      handler: onClickOutside,
      isActive: isFocused,
      events: isTouchDevice ? ['touchstart'] : ['mousedown']
    }"
    class="ui-select"
    data-test="ui-select"
  >
    <slot
      name="input"
      v-bind="this"
    >
      <UiInput
        ref="input"
        v-model="query"
        data-test="ui-select-input"
        clearable
        :loading="isLoading"
        :required="required"
        :right-icon="isOpened ? 'outlined/caret-up' : 'outlined/caret-down'"
        v-bind="$attrs"
        @focus="onFocus"
        @clear="onClear"
        @keydown.up="onArrowUp"
        @keydown.down="onArrowDown"
        @keydown.enter="onEnter"
      />
    </slot>

    <div
      v-show="isOpened"
      class="ui-select__body"
      data-test="ui-select-body"
    >
      <UiText
        v-if="isNotFound"
        size="m"
        class="ui-select__not-found"
        data-test="ui-select-not-found"
      >
        <slot name="not-found">
          Не найдено
        </slot>
      </UiText>

      <div class="ui-select__items">
        <UiInputAutocompleteItem
          v-for="(item, index) in visibleItems"
          :key="index"
          ref="items"
          :icon="item.icon"
          :title="getTitle(item)"
          :sub-title="item.itemSubTitle"
          :active="activeItemIndex === index"
          @click.native.prevent="onSelectItem(item)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { isTouchDevice } from '@/utils/device'

import UiInput from '../Input/Input.vue'
import UiMicroText from '../MicroText/MicroText.vue'
import UiInputAutocompleteItem from '../InputAutocompleteItem/InputAutocompleteItem.vue'

@Component({
  inheritAttrs: false,

  components: {
    UiMicroText,
    UiInputAutocompleteItem
  },

  props: {
    options: {
      type: Array,
      required: true
    },

    value: {
      required: true
    },

    required: {
      type: Boolean,
      default: false
    },

    labelKey: {
      type: String,
      default: ''
    }
  },

  watch: {
    visibleItems () {
      this.activeItemIndex = 0
    },

    value: {
      immediate: true,
      handler (value: any) {
        this.query = (value && this.getTitle(value)) ?? ''
      }
    }
  }
})
export default class UiSelect extends Vue {
  readonly value?: any
  readonly options: any[]
  readonly labelKey: string
  readonly required: boolean

  query = ''

  isLoading = false
  isFocused = false
  activeItemIndex = 0

  $refs: {
    input: UiInput,
    items: UiInputAutocompleteItem[]
  }

  get items () {
    return this.options
      .filter(item => this.getTitle(item).toLowerCase().includes(this.query.toLowerCase()))
  }

  get isTouchDevice () {
    return isTouchDevice()
  }

  get visibleItems () {
    return this.isQueryEqualsValue ? this.options : this.items
  }

  get hasVisibleItems () {
    return this.visibleItems.length > 0
  }

  get isQueryEqualsValue () {
    return (this.value && this.getTitle(this.value)) === this.query
  }

  get isQueryEmpty () {
    return !this.query
  }

  get isNotFound () {
    if (this.isQueryEmpty || this.isLoading || this.hasVisibleItems) {
      return false
    }

    return true
  }

  get isOpened () {
    if (!this.isFocused) {
      return false
    }

    // if (this.isQueryEqualsValue) {
    //   return false
    // }

    if (this.hasVisibleItems) {
      return true
    }

    if (this.isLoading) {
      return false
    }

    if (this.isQueryEmpty) {
      return false
    }

    return true
  }

  getTitle (item) {
    if (typeof item === 'object') {
      return item[this.labelKey]
    }

    return item
  }

  /**
   * Handle input
   */
  onInput (value) {
    this.query = value
  }

  /**
   * Handle arrow up
   */
  onArrowUp (event) {
    if (this.activeItemIndex === 0) return

    this.activeItemIndex -= 1

    this.scrollToItem(this.activeItemIndex)

    event.preventDefault()
  }

  /**
   * Handle arrow down
   */
  onArrowDown (event) {
    if (this.activeItemIndex === this.visibleItems.length - 1) return

    this.activeItemIndex += 1

    this.scrollToItem(this.activeItemIndex)

    event.preventDefault()
  }

  /**
   * Handle focus
   */
  onFocus (event: FocusEvent) {
    this.$emit('focus', event)

    if (this.isQueryEqualsValue) {
      this.isFocused = true
      return
    }

    this.isFocused = true
  }

  /**
   * Handle select an item
   */
  onSelectItem (item: any) {
    this.select(item)

    this.blur()
  }

  /**
   * Handle clear
   */
  onClear () {
    this.query = ''

    this.focus()
  }

  /**
   * Handle enter
   */
  onEnter (event: Event) {
    if (this.isQueryEqualsValue) {
      return
    }

    // Prevent form submiting
    event.preventDefault()

    if (this.hasVisibleItems) {
      const item = this.visibleItems[this.activeItemIndex]

      this.select(item)

      this.blur()
      return
    }

    if (this.isQueryEmpty && !this.required) {
      this.select(null)
    }
  }

  /**
   * Handle click outside
   */
  onClickOutside () {
    this.isFocused = false

    if (this.isQueryEqualsValue) {
      return
    }

    if (this.isQueryEmpty && !this.required) {
      this.select(null)
      return
    }

    this.select(this.value)
  }

  /**
   * Check if an item equals the value
   */
  isItemEqualsValue (item: any) {
    return this.value && this.getTitle(this.value) === this.getTitle(item)
  }

  /**
   * Select an item
   */
  select (item: any | null) {
    if (item === null) {
      this.query = ''
      this.$emit('input', null)
      return
    }

    if (this.isItemEqualsValue(item)) {
      this.query = (this.value && this.getTitle(this.value)) ?? ''
      return
    }

    this.$emit('input', item)
  }

  /**
   * Focus in the autocomplete input
   */
  focus () {
    const input = this.$el.querySelector('input') as HTMLElement

    if (input) {
      input.focus()
    }
  }

  blur () {
    const input = this.$el.querySelector('input') as HTMLElement

    if (input) {
      input.blur()
    }

    this.isFocused = false
  }

  /**
   * Scroll to an item by index
   */
  scrollToItem (index: number) {
    const items = Array.isArray(this.$refs.items)
      ? this.$refs.items
      : [this.$refs.items]

    if (items[index]) {
      items[index].$el.scrollIntoView({
        block: 'nearest'
      })
    }
  }
}
</script>

<style lang="scss" src="./Select.scss" />
