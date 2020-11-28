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
      required: true
    },

    type: {
      type: String,
      default: 'rounded'
    },

    size: {
      type: String,
      default: 'm'
    }
  }
})
export default class ImagePreviewCircle extends Vue {
  readonly type: 'circle' | 'rounded'
  readonly image: string
  readonly name: string
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
    return this.name[0]
  }
}
</script>

<style lang="scss" src="./Avatar.scss"></style>
