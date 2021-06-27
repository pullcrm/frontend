<template>
  <div
    class="ui-avatar"
    :class="[
      `ui-avatar_size_${size}`
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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    image: {
      type: String,
      default: undefined
    },

    icon: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      default: undefined
    },

    size: {
      type: String,
      default: 'm'
    }
  }
})
export default class ImagePreviewCircle extends Vue {
  readonly icon: string
  readonly image: string
  readonly name?: string | undefined
  readonly size:
    | 's'
    | 'm'
    | 'l'
    | 'custom'

  get hasImage () {
    return Boolean(this.image)
  }

  get letter () {
    const words = this.name.trim().split(' ')

    if (words.length > 1) {
      return `${words[0][0]}${words[1][0]}`
    }

    return `${words[0][0]}${words[0][1]}`
  }
}
</script>

<style lang="scss" src="./Avatar.scss"></style>
