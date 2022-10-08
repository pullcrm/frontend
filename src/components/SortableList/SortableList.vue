<script lang="ts" setup>
// TODO: Try quasar example
// https://quasar.dev/vue-directives/mutation#drag-and-drop-example

// https://github.com/Jexordexan/vue-slicksort
import { SlickItem, SlickList } from 'vue-slicksort'

// inheritAttrs: true,

defineProps({
  list: {
    type: Array,
    required: true,
  },

  itemClass: {
    type: [String, Object, Array],
    default: undefined,
  },
})

const emit = defineEmits(['update:list'])

function onUpdate(items: any) {
  emit('update:list', items)
}
</script>

<template>
  <SlickList
    :list="list"
    class="sortable-list"
    use-window-as-scroll-container
    @update:list="onUpdate"
  >
    <SlickItem
      v-for="(item, index) in list"
      :key="index"
      :index="index"
      :class="itemClass"
    >
      <slot :item="item" />
    </SlickItem>
  </SlickList>
</template>
