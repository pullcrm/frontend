<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { isTouchDevice } from 'utils/device'
import { debounce } from 'utils/debounce'

import UiInput from '../Input/Input.vue'
import UiMicroText from '../MicroText/MicroText.vue'
import UiInputAutocompleteItem from '../InputAutocompleteItem/InputAutocompleteItem.vue'
import type { IItem } from '~/types'

// inheritAttrs: false,

const props = defineProps({
  load: {
    type: Function,
    required: true,
  },

  value: {
    required: true,
  },

  allowEmptyValue: {
    type: Boolean,
    default: true,
  },

  historyKey: {
    type: String,
    default: null,
  },

  historySize: {
    type: Number,
    default: 10,
  },
})

const emit = defineEmits(['focus', 'input'])

// readonly name?: string
// readonly value?: IItem
// readonly allowEmptyValue: boolean
// readonly historyKey?: string
// readonly historySize: number
// readonly load: (query: string) => Promise<IItem[]>

const $q = useQuasar()

const query = ref('')
let items = reactive<IItem[]>([])
let history = reactive<IItem[]>([])

const isLoading = ref(false)
const isFocused = ref(false)
const activeItemIndex = ref(0)

// $refs: {
//   input: UiInput
//   items: UiInputAutocompleteItem[]
// }

// constructor() {
//   super()

//   this.onLoad = debounce(this.onLoad, 200)
// }

onMounted(() => {
  if (props.historyKey)
    fetchHistory()
})

onBeforeUnmount(() => {
  // @ts-expect-error
  onLoad.cancel()
})

const isQueryEmpty = computed(() => {
  return !query.value
})

const hasHistory = computed(() => {
  return history.length > 0
})

const visibleItems = computed(() => {
  if (isQueryEmpty && hasHistory)
    return history

  return items
})

const hasVisibleItems = computed(() => {
  return visibleItems.value.length > 0
})

const isQueryEqualsValue = computed(() => {
  return (
    props.value?.title === query.value
    && props.value?.isPrefix !== true
  )
})

const isNotFound = computed(() => {
  if (isQueryEmpty || isLoading || hasVisibleItems)
    return false

  return true
})

const isOpened = computed(() => {
  if (!isFocused)
    return false

  if (isQueryEqualsValue)
    return false

  if (hasVisibleItems)
    return true

  if (isLoading)
    return false

  if (isQueryEmpty)
    return false

  return true
})

watch(
  () => visibleItems.value,
  () => activeItemIndex.value = 0,
)

watch(
  () => query,
  () => {
    if (isQueryEqualsValue.value)
      return

    isLoading.value = true

    onLoad()
  },
)

watch(
  () => props.value,
  (val: IItem) => query.value = val?.title ?? '',
  {
    immediate: true,
  },
)

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
  isLoading.value = true

  onLoad()
}

/**
   * Handle select an item
   */
function onSelectItem(item: IItem) {
  select(item)

  isFocused.value = false
}

/**
   * Handle clear
   */
function onClear() {
  query.value = ''
  items = []

  focus()
}

/**
   * Handle enter
   */
function onEnter(event: Event) {
  if (isQueryEqualsValue)
    return

  // Prevent form submiting
  event.preventDefault()

  if (hasVisibleItems) {
    const item = visibleItems.value[activeItemIndex.value]

    select(item)
    return
  }

  if (isQueryEmpty && props.allowEmptyValue)
    select(null)
}

/**
   * Load items
   */
async function onLoad() {
  try {
    isLoading.value = true

    items = await load(query.value)
  }
  finally {
    isLoading.value = false
  }
}

/**
   * Check if an item equals the value
   */
function isItemEqualsValue(item: IItem) {
  return props.value?.title === item.title
}

/**
   * Select an item
   */
function select(item: IItem | null) {
  if (item === null) {
    query.value = ''
    emit('input', null)
    return
  }

  if (isItemEqualsValue(item)) {
    query.value = props.value?.title ?? ''
    return
  }

  emit('input', item)

  if (props.historyKey)
    saveToHistory(item)
}

/**
   * Focus in the autocomplete input
   */
function focus() {
  const input = this.$el.querySelector('input') as HTMLElement

  if (input)
    input.focus()
}

/**
   * Scroll to an item by index
   */
function scrollToItem(index: number) {
  const items = Array.isArray(this.$refs.items)
    ? this.$refs.items
    : [this.$refs.items]

  if (items[index]) {
    items[index].$el.scrollIntoView({
      block: 'nearest',
    })
  }
}

/**
   * Fetch the history from the local storage
   */
function fetchHistory() {
  history = JSON.parse($q.localStorage.getItem(props.historyKey) || '[]')
}

/**
   * Save an item to the history
   */
function saveToHistory(item: IItem) {
  history = history
    .filter(({ title }) => item.title !== title)
    .slice(0, props.historySize - 1)

  history.unshift(item)

  $q.localStorage.set(props.historyKey, JSON.stringify(history))
}

const root = ref<HTMLElement | null>(null)

onClickOutside(root, () => {
  if (!isFocused.value)
    return

  isFocused.value = false

  if (isQueryEqualsValue)
    return

  if (isQueryEmpty && props.allowEmptyValue) {
    select(null)
    return
  }

  select(props.value)
})
</script>

<template>
  <div
    ref="root"
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
          @click="onSelectItem(item)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./InputAutocomplete.scss" />
