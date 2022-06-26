<script lang="ts" setup>
import UiInputAutocompleteItem from '../InputAutocompleteItem/InputAutocompleteItem.vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },

  modelValue: {
    required: true,
  },

  required: {
    type: Boolean,
    default: false,
  },

  labelKey: {
    type: String,
    default: '',
  },

  clearable: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue', 'focus'])

const root = ref<HTMLElement | null>(null)
const itemsNodes = ref<typeof UiInputAutocompleteItem | typeof UiInputAutocompleteItem[] | null>(null)

const query = ref('')

const isLoading = ref(false)
const isFocused = ref(false)
const activeItemIndex = ref(0)

const items = computed(() => {
  return props.options
    .filter(item => getTitle(item).toLowerCase().includes(query.value.toLowerCase()))
})

const isQueryEqualsValue = computed(() => {
  return (props.modelValue && getTitle(props.modelValue)) === query.value
})

const visibleItems = computed<any[]>(() => {
  return isQueryEqualsValue.value ? props.options : items.value
})

const hasVisibleItems = computed(() => {
  return visibleItems.value.length > 0
})

const isQueryEmpty = computed(() => {
  return !query.value
})

const isNotFound = computed(() => {
  if (isQueryEmpty.value || isLoading.value || hasVisibleItems.value)
    return false

  return true
})

const isOpened = computed(() => {
  if (!isFocused.value)
    return false

  // if (this.isQueryEqualsValue) {
  //   return false
  // }

  if (hasVisibleItems.value)
    return true

  if (isLoading.value)
    return false

  if (isQueryEmpty.value)
    return false

  return true
})

watch(
  () => visibleItems.value,
  () => activeItemIndex.value = getActiveIndex(),
)

watch(
  () => props.modelValue,
  val => query.value = (val && getTitle(val)) ?? '',
  { immediate: true },
)

function getTitle(item: any) {
  if (typeof item === 'object')
    return item[props.labelKey]

  return item
}

/**
   * Handle input
   */
function onInput(value: string) {
  query.value = value
}

/**
   * Handle arrow up
   */
function onArrowUp(event: Event) {
  if (activeItemIndex.value === 0)
    return

  activeItemIndex.value -= 1

  scrollToItem(activeItemIndex.value)

  event.preventDefault()
}

/**
   * Handle arrow down
   */
function onArrowDown(event: Event) {
  if (activeItemIndex.value === visibleItems.value.length - 1)
    return

  activeItemIndex.value += 1

  scrollToItem(activeItemIndex.value)

  event.preventDefault()
}

/**
   * Handle focus
   */
function onFocus(event: FocusEvent) {
  emit('focus', event)

  if (isQueryEqualsValue.value) {
    isFocused.value = true
    return
  }

  isFocused.value = true
}

/**
   * Handle select an item
   */
function onSelectItem(item: any) {
  select(item)

  blur()
}

/**
   * Handle clear
   */
function onClear() {
  query.value = ''

  focus()
}

/**
   * Handle enter
   */
function onEnter() {
  // if (this.isQueryEqualsValue) {
  //   return
  // }

  if (hasVisibleItems.value) {
    const item = visibleItems.value[activeItemIndex.value]

    select(item)

    blur()
    return
  }

  if (isQueryEmpty.value && !props.required)
    select(null)
}

/**
   * Check if an item equals the value
   */
function isItemEqualsValue(item: any) {
  return props.modelValue && getTitle(props.modelValue) === getTitle(item)
}

/**
   * Select an item
   */
function select(item: any | null) {
  if (item === null) {
    query.value = ''
    emit('update:modelValue', null)
    return
  }

  if (isItemEqualsValue(item)) {
    query.value = (props.modelValue && getTitle(props.modelValue)) ?? ''
    return
  }

  emit('update:modelValue', item)
}

/**
   * Focus in the autocomplete input
   */
function focus() {
  const input = root.value?.querySelector('input') as HTMLElement

  if (input)
    input.focus()
}

function blur() {
  const input = root.value?.querySelector('input') as HTMLElement

  if (input)
    input.blur()

  isFocused.value = false
}

function getActiveIndex() {
  if (!props.modelValue)
    return 0

  const index = visibleItems.value.findIndex((item) => {
    return getTitle(props.modelValue) === getTitle(item)
  })

  return index >= 0
    ? index
    : 0
}

/**
   * Scroll to an item by index
   */
function scrollToItem(index: number) {
  const items = Array.isArray(itemsNodes.value)
    ? itemsNodes.value
    : [itemsNodes.value]

  if (items[index]) {
    items[index]?.root.scrollIntoView({
      block: 'nearest',
    })
  }
}

/**
   * Handle click outside
   */
onClickOutside(root, () => {
  if (isFocused.value) {
    isFocused.value = false

    if (isQueryEqualsValue)
      return

    if (isQueryEmpty && !props.required) {
      select(null)
      return
    }

    select(props.modelValue)
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div
    ref="root"
    class="ui-select"
    data-test="ui-select"
    @keyup.esc="blur"
  >
    <slot
      name="input"
      v-bind="{ onFocus, onInput, onArrowUp, onArrowDown, onEnter, onClear }"
    >
      <UiInput
        v-model="query"
        data-test="ui-select-input"
        :clearable="clearable"
        :loading="isLoading"
        :required="required"
        :right-icon="isOpened ? 'outlined/caret-up' : 'outlined/caret-down'"
        v-bind="$attrs"
        @focus="onFocus"
        @clear="onClear"
        @keydown.up="onArrowUp"
        @keydown.down="onArrowDown"
        @keydown.enter.prevent="onEnter"
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
          ref="itemsNodes"
          :icon="item.icon"
          :title="getTitle(item)"
          :sub-title="item.itemSubTitle"
          :active="activeItemIndex === index"
          @click.prevent="onSelectItem(item)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./Select.scss" />
