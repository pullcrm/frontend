<template>
  <div
    class="ui-avatar"
    :class="[
      `ui-avatar_size_${size}`,
      `ui-avatar_type_${type}`
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
      v-else-if="upload"
      class="ui-avatar__icon"
    >
      <UiIcon
        name="outlined/plus"
        size="custom"
      />
    </div>

    <div
      v-else
      class="ui-avatar__letter"
    >
      <p>{{ firstLetter }}</p>
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

    name: {
      type: String,
      default: undefined
    },

    type: {
      type: String,
      default: 'rounded'
    },

    size: {
      type: String,
      default: 'm'
    },

    upload: {
      type: Boolean,
      default: false
    }
  }
})
export default class ImagePreviewCircle extends Vue {
  readonly upload: boolean
  readonly type: 'circle' | 'rounded'
  readonly image: string
  readonly name?: string | undefined
  readonly size:
    | 'm'
    | 'l'
    | 'xl'
    | 'xxl'
    | 'custom'

  get hasImage () {
    return Boolean(this.image)
  }

  get firstLetter () {
    const words = this.name.split(' ')

    if (words.length > 1) {
      return `${words[0][0]}${words[1][0]}`
    }

    return `${words[0][0]}${words[0][1]}`
  }
}
</script>

<style lang="scss" src="./Avatar.scss"></style>
