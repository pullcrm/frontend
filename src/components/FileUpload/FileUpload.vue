<template>
  <div
    class="file-upload"
  >
    <label
      class="file-upload__inner"
      :for="`file-upload-${_uid}`"
    >
      <slot v-bind="{ url }" />

      <input
        :id="`file-upload-${_uid}`"
        type="file"
        :name="`file-upload-${_uid}`"
        accept="image/jpeg,image/png,image/jpg"
        @change="onAvatar"
      >
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { readFileAsync } from '@/logics/file'

@Component({
  props: {
    image: {
      type: String,
      default: null
    }
  }
})
export default class FileUpload extends Vue {
  readonly image
  newImage = ''

  get url () {
    return this.newImage || this.image
  }

  async onAvatar ({ target }) {
    if (!target.files) return

    const photo = await readFileAsync(target.files[0])

    if (!photo) return

    this.newImage = photo.url

    this.$emit('input', target.files[0])
  }
}
</script>

<style lang="scss">
  .file-upload {
    &__inner {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      visibility: hidden;
    }
  }
</style>
