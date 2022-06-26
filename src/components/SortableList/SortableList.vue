<script lang="ts" setup>
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

const emit = defineEmits(['update'])

function onUpdate(items: any) {
  emit('update', items)
}

const items2 = ref(['sadas', 'sad', 'awdaw'])
</script>

<template>
  <div>
    <SlickList
      :list="list"
      use-window-as-scroll-container
      v-bind="$attrs"
      class="sortable-list"
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
  </div>
</template>
