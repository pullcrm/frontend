<script lang="ts" setup>
import UiPopover from '~/ui/Popover/Popover.vue'

interface IProps {
  name?: string // null
  styles: Record<string, string>
  options: any[]
  placement?: string // bottom
  onClosable?: boolean // true
}

defineProps<IProps>()

const emit = defineEmits(['close'])

const root = ref<HTMLElement | null>(null)
const popover = ref<typeof UiPopover | null>(null)

onMounted(() => {
  popover.value?.open()

  window.addEventListener('scroll', close, { passive: true })
  window.addEventListener('resize', close, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', close)
  window.removeEventListener('resize', close)
})

function close() {
  emit('close')
}

onClickOutside(root, close)
</script>

<template>
  <div
    ref="root"
    class="popover-menu-inner"
    :style="styles"
  >
    <UiPopover
      ref="popover"
      size="m"
      :placement="placement || 'bottom'"
      :clickable="false"
    >
      <template #body>
        <UiDropdownList
          :name="name"
        >
          <UiText
            v-for="item in options"
            :key="item.name"
            tag="a"
            href="#"
            size="m"
            :left-icon="item.icon"
            @click.prevent="
              item.click(),
              onClosable !== false && close()
            "
          >
            {{ item.name }}
          </UiText>
        </UiDropdownList>
      </template>
    </UiPopover>
  </div>
</template>

<style lang="scss">
  .popover-menu-inner {
    position: fixed;
    z-index: 99;
    display: flex;
    pointer-events: none;

    .ui-popover {
      width: 100%;
      height: 100%;

      &__body {
        pointer-events: all;
      }
    }
  }
</style>
