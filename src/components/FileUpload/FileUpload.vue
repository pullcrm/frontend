<script lang="ts" setup>
import { readFileAsync } from '~/logics/file'
import { generateId } from '~/utils/generate-id'

const props = defineProps({
  image: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['input'])

const uid = generateId()
const newImage = ref('')

const url = computed(() => {
  return newImage.value || props.image
})

async function onAvatar({ target }: any) {
  if (!target.files)
    return

  const photo = await readFileAsync(target.files[0])

  if (!photo)
    return

  newImage.value = photo.url

  emit('input', target.files[0])
}
</script>

<template>
  <div
    class="file-upload"
  >
    <label
      class="file-upload__inner"
      :for="`file-upload-${uid}`"
    >
      <slot :url="url" />

      <input
        :id="`file-upload-${uid}`"
        type="file"
        :name="`file-upload-${uid}`"
        accept="image/jpeg,image/png,image/jpg"
        @change="onAvatar"
      >
    </label>
  </div>
</template>

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
