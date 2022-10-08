<script lang="ts" setup>
import PopperMenuInner from './PopperMenuInner.vue'

interface IPopperMenuOpenParams {
  name?: string
  options: IPopperMenuOpenOptionItem[]
  placement?: string
  onClosable: boolean
}

interface IPopperMenuOpenOptionItem {
  name: string
  icon?: string
  click?: Function
}

const name = ref<string | undefined>(undefined)
const options = ref<any[]>([])
const reference = ref<HTMLElement | null>(null)
const placement = ref('bottom')
const onClosable = ref(true)

const isOpened = computed(() => {
  return Boolean(reference.value)
})

const styles = computed<Record<string, any>>(() => {
  if (!reference.value)
    return {}

  const { height, left, top, width } = reference.value.getBoundingClientRect()

  return {
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
  }
})

async function open(element: HTMLElement, params: IPopperMenuOpenParams) {
  await new Promise(requestAnimationFrame)

  name.value = params.name
  options.value = params.options
  placement.value = params.placement || 'bottom'
  reference.value = element
  onClosable.value = params.onClosable
}

function close() {
  name.value = undefined
  options.value = []
  reference.value = null
  placement.value = 'bottom'
}

defineExpose({ open, close, reference, isOpened })
</script>

<template>
  <PopperMenuInner
    v-if="isOpened"
    :styles="styles"
    :name="name"
    :options="options"
    :placement="placement"
    :on-closable="onClosable"
    @close="close"
  />
</template>
