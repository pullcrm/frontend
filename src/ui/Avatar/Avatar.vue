<template>
  <div
    class="ui-avatar"
    :class="`_size_${size} _type_${type}`"
  >
    <div
      v-if="hasImage"
      class="ui-avatar__image"
    >
      <img :src="image" :alt="name">
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

<style lang="scss">
  .ui-avatar {
    & > div {
      width: 100%;
      height: 100%;
    }

    &__image {
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__letter {
      display: flex;
      align-items: center;
      color: $ui-black-100;
      background: #fff;
      border: 1px solid #d6d6d6;

      p {
        width: 100%;
        font-weight: 400;
        text-align: center;
        text-transform: uppercase;
      }
    }

    &._type_circle {
      .ui-avatar {
        &__image,
        &__letter {
          border-radius: 50%;
        }
      }
    }

    &._type_rounded {
      .ui-avatar {
        &__image,
        &__letter {
          border-radius: 8px;
        }
      }
    }

    &._size_m {
      @include ui-typo-14;

      width: 36px;
      height: 36px;
    }

    &._size_l {
      @include ui-typo-16;

      width: 48px;
      height: 48px;
    }

    &._size_xl {
      @include ui-typo-36;

      width: 64px;
      height: 64px;
    }

    &._size_xxl {
      @include ui-typo-44;

      width: 80px;
      height: 80px;
    }
  }
</style>
