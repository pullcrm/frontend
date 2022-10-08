<script lang="ts" setup>
const props = defineProps({
  image: {
    type: String,
    default: undefined,
  },

  icon: {
    type: String,
    default: '',
  },

  name: {
    type: String,
    default: undefined,
  },

  size: {
    type: String,
    default: 'm',
  },
})

// readonly size:
// | 's'
// | 'm'
// | 'l'
// | 'custom'

const hasImage = computed(() => {
  return Boolean(props.image)
})

const letter = computed(() => {
  const words = (props.name || '').trim().split(' ').filter(Boolean)

  if (words.length > 1)
    return `${words[0][0]}${words[1][0]}`

  return `${words[0][0]}${words[0][1]}`
})
</script>

<template>
  <div
    class="ui-avatar"
    :class="[
      `ui-avatar_size_${size}`,
    ]"
  >
    <div
      v-if="hasImage"
      class="ui-avatar__image"
    >
      <img
        :src="image"
        :alt="name"
      >
    </div>

    <div
      v-else-if="icon"
      class="ui-avatar__icon"
    >
      <UiIcon
        :name="icon"
        size="custom"
      />
    </div>

    <div
      v-else
      class="ui-avatar__letter"
    >
      <p>{{ letter }}</p>
    </div>
  </div>
</template>

<style lang="scss" src="./Avatar.scss"></style>
