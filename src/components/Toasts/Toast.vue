<script lang="ts" setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const toastsStore = useToastsStore()

const isVisible = computed(() => {
  return toastsStore.has(props.id)
})

function close() {
  toastsStore.close(props.id)
}
</script>

<template>
  <div
    v-if="isVisible"
    class="toast"
    data-test="toast"
  >
    <slot :close="close" />
  </div>
</template>
