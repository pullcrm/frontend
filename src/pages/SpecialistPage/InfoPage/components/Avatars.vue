<script lang="ts" setup>
import { AVATAR } from '~/constants/files'

import FileUpload from '~/components/FileUpload/FileUpload.vue'
import { api } from '~/boot/api'

const props = defineProps({
  avatars: {
    type: Array,
    default: () => [],
  },

  specialist: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['refresh'])

const toastsStore = useToastsStore()
const specialistsStore = useSpecialistsStore()

const user = computed(() => {
  return props.specialist.user
})

const sortedAvatars = computed<any[]>(() => {
  return [...props.avatars].reverse()
})

const avatarId = computed(() => {
  return user.value.avatarId
})

async function uploadAvatar(file: any) {
  try {
    if (!file)
      return

    if (props.avatars.length > 5) {
      toastsStore.show({
        type: 'error',
        title: 'Перевищено ліміт завантаження аватарок',
      })

      return
    }

    const formData = new FormData()

    formData.append('files', file)
    formData.append('group', AVATAR)
    formData.append('userId', user.value.id)

    const [result] = await specialistsStore.onUploadAvatar(formData)

    if (result?.id) {
      await updateAvatar(result.id)

      window.location.reload()
    }
  }
  catch (err: any) {
    if (err.status === 413) {
      toastsStore.show({
        type: 'error',
        title: 'Файл занадто великий, спробуйте в іншому розмірі',
      })

      return
    }

    throw err
  }
}

async function updateAvatar(avatarId: number) {
  await api.specialist.update({
    id: props.specialist.id,
    avatarId,
  })

  toastsStore.show({ title: 'Встановлено новий аватар' })

  emit('refresh')
}
</script>

<template>
  <div class="specialist-about-page-avatars">
    <div
      v-for="avatar in sortedAvatars"
      :key="avatar.id"
      class="specialist-about-page-avatars__image"
      :class="{ _active: avatarId === avatar.id }"
      @click="updateAvatar(avatar.id)"
    >
      <UiAvatar
        size="l"
        :image="avatar.path"
      />
    </div>

    <div
      class="specialist-about-page-avatars__image"
    >
      <FileUpload
        @input="uploadAvatar"
      >
        <UiAvatar
          size="l"
          icon="outlined/plus"
        />
      </FileUpload>
    </div>
  </div>
</template>

<style lang="scss">
  .specialist-about-page-avatars {
    @include hide-scrollbar;

    display: flex;
    overflow-x: auto;
    overflow-y: hidden;

    &__image {
      margin-right: 16px;
      padding: 3px;
      border: 1px solid $ui-white;
      border-radius: 24px;
      box-shadow: inset 0 0 0 1px rgba($ui-blue-brand, 0);
      transition: border-color var(--ui-transition-hover);

      &:hover {
        border-color: $ui-blue-brand;
      }

      &._active {
        border-color: $ui-blue-brand;
        box-shadow: inset 0 0 0 1px $ui-blue-brand;
      }
    }
  }
</style>
