<template>
  <div
    class="ui-image-preview-circle"
    :class="`_size_${size}`"
  >
    <div
      v-if="hasImage"
      class="ui-image-preview-circle__image"
    >
      <img :src="image" :alt="name">
    </div>

    <div
      v-else
      class="ui-image-preview-circle__letter"
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
      type: [String, Object],
      default: null
    },

    name: {
      type: String,
      required: true
    },

    size: {
      type: String,
      default: 'm'
    }
  }
})
export default class ImagePreviewCircle extends Vue {
  readonly image: string
  readonly name: string
  readonly size: 'm'|'l'|'custom'

  get hasImage () {
    return Boolean(this.image)
  }

  get firstLetter () {
    return this.name[0]
  }
}
</script>

<style lang="scss">
  .ui-image-preview-circle {
    &__image {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__letter {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      color: $ui-black-100;
      background: #fff;
      border: 1px solid #d6d6d6;
      border-radius: 50%;

      p {
        width: 100%;
        font-weight: 400;
        text-align: center;
        text-transform: uppercase;
      }
    }

    &._size_m {
      @include ui-typo-14;

      width: 36px;
      height: 36px;
    }

    &._size_l {
      @include ui-typo-16;

      width: 44px;
      height: 44px;
    }
  }
</style>
