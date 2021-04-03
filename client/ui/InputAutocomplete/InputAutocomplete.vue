<template>
  <div
    v-click-outside="{
      handler: onClickOutside,
      isActive: isFocused,
      events: isTouchDevice ? ['touchstart'] : ['mousedown']
    }"
    class="ui-input-autocomplete"
    data-test="ui-input-autocomplete"
  >
    <slot
      name="input"
      v-bind="this"
    >
      <UiInput
        ref="input"
        v-model="query"
        data-test="ui-input-autocomplete-input"
        clearable
        :loading="isLoading"
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
      class="ui-input-autocomplete__body"
      data-test="ui-input-autocomplete-body"
    >
      <UiText
        v-if="isNotFound"
        size="m"
        class="ui-input-autocomplete__not-found"
        data-test="ui-input-autocomplete-not-found"
      >
        <slot name="not-found">
          Не найдено
        </slot>
      </UiText>

      <UiMicroText
        v-if="isQueryEmpty && hasHistory"
        size="s"
        class="ui-input-autocomplete__history"
        data-test="ui-input-autocomplete-history"
      >
        Предыдущие запросы
      </UiMicroText>

      <div class="ui-input-autocomplete__items">
        <UiInputAutocompleteItem
          v-for="(item, index) in visibleItems"
          :key="index"
          ref="items"
          :icon="item.icon"
          :title="item.itemTitle || item.title"
          :sub-title="item.itemSubTitle"
          :active="activeItemIndex === index"
          @click.native="onSelectItem(item)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { debounce } from '~/utils/debounce'
import { isTouchDevice } from '~/utils/device'

import UiInput from '../Input/Input.vue'
import UiMicroText from '../MicroText/MicroText.vue'
import UiInputAutocompleteItem from '../InputAutocompleteItem/InputAutocompleteItem.vue'

export interface IItem {
  title: string,
  icon?: string,
  subTitle?: string,
  isPrefix?: boolean
}

@Component({
  inheritAttrs: false,

  components: {
    UiMicroText,
    UiInputAutocompleteItem
  },

  props: {
    load: {
      type: Function,
      required: true
    },

    value: {
      required: true
    },

    allowEmptyValue: {
      type: Boolean,
      default: true
    },

    historyKey: {
      type: String,
      default: null
    },

    historySize: {
      type: Number,
      default: 10
    }
  },

  watch: {
    visibleItems () {
      this.activeItemIndex = 0
    },

    query () {
      if (this.isQueryEqualsValue) return

      this.isLoading = true

      this.onLoad()
    },

    value: {
      immediate: true,
      handler (value: IItem) {
        this.query = value?.title ?? ''
      }
    }
  }
})
export default class InputAutocomplete extends Vue {
  readonly name?: string
  readonly value?: IItem
  readonly allowEmptyValue: boolean
  readonly historyKey?: string
  readonly historySize: number
  readonly load: (query: string) => Promise<IItem[]>

  query = ''
  items: IItem[] = []
  history: IItem[] = []

  isLoading = false
  isFocused = false
  activeItemIndex = 0

  $refs: {
    input: UiInput,
    items: UiInputAutocompleteItem[]
  }

  constructor () {
    super()

    this.onLoad = debounce(this.onLoad, 200)
  }

  mounted () {
    if (this.historyKey) {
      this.fetchHistory()
    }
  }

  beforeDestroy () {
    // @ts-ignore
    this.onLoad.cancel()
  }

  get isTouchDevice () {
    return isTouchDevice()
  }

  get visibleItems () {
    if (this.isQueryEmpty && this.hasHistory) {
      return this.history
    }

    return this.items
  }

  get hasVisibleItems () {
    return this.visibleItems.length > 0
  }

  get hasHistory () {
    return this.history.length > 0
  }

  get isQueryEqualsValue () {
    return (
      this.value?.title === this.query &&
      this.value?.isPrefix !== true
    )
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

    if (this.isQueryEqualsValue) {
      return false
    }

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
    this.isLoading = true

    this.onLoad()
  }

  /**
   * Handle select an item
   */
  onSelectItem (item: IItem) {
    this.select(item)

    this.isFocused = false
  }

  /**
   * Handle clear
   */
  onClear () {
    this.query = ''
    this.items = []

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
      return
    }

    if (this.isQueryEmpty && this.allowEmptyValue) {
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

    if (this.isQueryEmpty && this.allowEmptyValue) {
      this.select(null)
      return
    }

    this.select(this.value)
  }

  /**
   * Load items
   */
  async onLoad () {
    try {
      this.isLoading = true

      this.items = await this.load(this.query)
    } finally {
      this.isLoading = false
    }
  }

  /**
   * Check if an item equals the value
   */
  isItemEqualsValue (item: IItem) {
    return this.value?.title === item.title
  }

  /**
   * Select an item
   */
  select (item: IItem | null) {
    if (item === null) {
      this.query = ''
      this.$emit('input', null)
      return
    }

    if (this.isItemEqualsValue(item)) {
      this.query = this.value?.title ?? ''
      return
    }

    this.$emit('input', item)

    if (this.historyKey) {
      this.saveToHistory(item)
    }
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

  /**
   * Fetch the history from the local storage
   */
  fetchHistory () {
    this.history = JSON.parse(this.$localStorage.getItem(this.historyKey) || '[]')
  }

  /**
   * Save an item to the history
   */
  saveToHistory (item: IItem) {
    this.history = this.history
      .filter(({ title }) => item.title !== title)
      .slice(0, this.historySize - 1)

    this.history.unshift(item)

    this.$localStorage.setItem(this.historyKey, JSON.stringify(this.history))
  }
}
</script>

<style lang="scss" src="./InputAutocomplete.scss" />
