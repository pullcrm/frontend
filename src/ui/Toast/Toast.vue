<script lang="ts" setup>
const props = defineProps({
  theme: {
    type: String,
    default: 'success',
  },

  title: {
    type: String,
    default: undefined,
  },

  text: {
    type: String,
    default: undefined,
  },

  timeout: {
    type: Number,
    default: undefined,
  },

  leftIcon: {
    type: String,
    default: undefined,
  },
})

const emit = defineEmits(['close'])

// readonly theme:
// | 'info'
// | 'error'
// | 'warning'
// | 'success'

onMounted(() => {
  if (props.timeout) {
    const timerId = setTimeout(onClose, props.timeout)

    onBeforeUnmount(() => {
      clearTimeout(timerId)
    })
  }
})

function onClose() {
  emit('close')
}
</script>

<template>
  <div
    class="ui-toast"
    :class="[
      `ui-toast_theme_${theme}`,
    ]"
    data-test="ui-toast"
  >
    <div
      v-if="leftIcon"
      class="ui-toast__prepend"
    >
      <UiIcon
        :name="leftIcon"
        size="s"
      />
    </div>
    <div
      v-else-if="$slots.prepend"
      class="ui-toast__prepend"
    >
      <slot name="prepend" />
    </div>

    <div class="ui-toast__content">
      <slot>
        <UiText
          size="l"
          responsive
        >
          {{ title }}
        </UiText>
      </slot>
    </div>

    <div
      v-if="$slots.append"
      class="ui-toast__append"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<style lang="scss" src="./Toast.scss" />
