<script lang="ts" setup>
// inheritAttrs: false,

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  align: {
    type: String,
    default: 'center',
  },
})

const emit = defineEmits(['close'])

// readonly align:
// | 'left'
// | 'center'
// | 'right'

const popupStore = usePopupStore()

const isVisible = computed(() => {
  return popupStore.isVisible(props.name)
})

const popupProps = computed(() => {
  return popupStore.activeProps
})

onMounted(() => {
  window.addEventListener('keyup', keyPress, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('keyup', keyPress)
})

function onClose() {
  popupStore.hide()

  emit('close')
}

function keyPress({ key }: any) {
  if (isVisible && (key === 'Escape' || key === 'Esc'))
    onClose()
}
</script>

<template>
  <UiPopupBackdrop
    v-if="isVisible"
    class="popup"
    :align="align"
    @close="onClose"
  >
    <slot
      :close="onClose"
      :props="popupProps"
    />
  </UiPopupBackdrop>
</template>
