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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { AVATAR } from '~/constants/files'

import FileUpload from '~/components/FileUpload/FileUpload.vue'

@Component({
  components: {
    FileUpload
  },

  props: {
    avatars: {
      type: Array,
      default: () => []
    },

    specialist: {
      type: Object,
      required: true
    }
  }
})
export default class Avatars extends Vue {
  readonly avatars
  readonly specialist

  get user () {
    return this.specialist.user
  }

  get avatarId () {
    return this.user.avatarId
  }

  get sortedAvatars () {
    return this.avatars.reverse()
  }

  async uploadAvatar (file) {
    try {
      if (!file) return

      if (this.avatars.length > 5) {
        this.$typedStore.dispatch('toasts/show', {
          type: 'error',
          title: 'Перевищено ліміт завантаження аватарок'
        })

        return
      }

      const formData = new FormData()

      formData.append('files', file)
      formData.append('group', AVATAR)
      formData.append('userId', this.user.id)

      const [result] = await this.$typedStore.dispatch('specialists/onUploadAvatar', formData)

      if (result?.id) {
        await this.updateAvatar(result.id)

        window.location.reload()
      }
    } catch (err) {
      if (err.status === 413) {
        this.$typedStore.dispatch('toasts/show', {
          type: 'error',
          title: 'Файл занадто великий, спробуйте в іншому розмірі'
        })

        return
      }

      throw err
    }
  }

  async updateAvatar (avatarId) {
    await this.$api.specialist.update({
      id: this.specialist.id,
      avatarId
    })

    this.$typedStore.dispatch('toasts/show', { title: 'Встановлено новий аватар' })

    this.$emit('refresh')
  }
}
</script>

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
