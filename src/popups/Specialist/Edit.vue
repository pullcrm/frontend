<template>
  <UiPopup
    class="popup-specialist"
    @close="$emit('close')"
  >
    <UiBack
      class="popup-specialist__back"
      @click.native="$emit('close')"
    />

    <div class="popup-specialist__header">
      <UiTitle
        size="s"
      >
        Обновить данные
      </UiTitle>
    </div>

    <form
      @submit.prevent="onSubmit"
    >
      <FileUpload
        class="popup-specialist__avatar"
        :image="image"
        @input="fileSelect"
      >
        <template #default="{ url }">
          <UiAvatar
            :image="url"
            size="l"
            upload
          />
        </template>
      </FileUpload>

      <UiField
        label="Имя"
      >
        <UiInput
          v-model="form.firstName"
          name="name"
          placeholder="Введите Имя"
          required
        />
      </UiField>

      <UiField
        label="Фамилия"
      >
        <UiInput
          v-model="form.lastName"
          name="surname"
          placeholder="Введите Фамилию"
          required
        />
      </UiField>

      <UiField
        label="Статус"
      >
        <UiSelect
          v-model="form.status"
          :options="statusList"
          label="value"
          placeholder="Выбрать статус"
        />
      </UiField>

      <UiField
        label="Описание"
      >
        <UiInput
          v-model="form.description"
          name="description"
          placeholder="Добавьте описание"
          tag="textarea"
        />
      </UiField>

      <div class="popup-specialist__actions">
        <UiButton
          size="l"
          type="submit"
          theme="yellow"
          :loading="isLoading"
        >
          Обновить
        </UiButton>
      </div>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { statuses } from '@/logics/specialist'

import FileUpload from '@/components/FileUpload/FileUpload.vue'

interface ISpecialistEditParams {
  id?: number
  firstName?: string
  lastName?: string
  description?: string
  status?: Record<string, any>
}

@Component({
  components: {
    FileUpload
  },

  props: {
    specialist: {
      type: Object,
      required: true
    }
  }
})
export default class SpecialistNew extends Vue {
  readonly specialist

  form: ISpecialistEditParams = {}

  isLoading = false
  currentFile: File

  constructor () {
    super()

    const {
      user,
      status: currentStatus,
      description
    } = this.specialist

    const status = {
      ...statuses[currentStatus],
      key: currentStatus
    }

    this.form = {
      id: user.id,
      status,
      lastName: user.lastName,
      firstName: user.firstName,
      description
    }
  }

  get user () {
    return this.specialist.user
  }

  get image () {
    return this.user.avatar?.path
  }

  get statusList () {
    return Object.keys(statuses).map(key => ({ key, ...statuses[key] }))
  }

  async onSubmit () {
    try {
      this.isLoading = true

      const result = await this.$store.dispatch('specialists/onUploadAvatar', this.currentFile)

      await Promise.all([
        // @ts-ignore
        this.$api.specialist.update(this.form.id, {
          ...this.form,
          status: this.form.status.key,
          avatarId: result?.id
        })
      ])

      await this.$store.dispatch('specialists/fetch')

      this.$emit('close')
    } finally {
      this.isLoading = false
    }
  }

  async fileSelect (file) {
    this.currentFile = file
  }
}
</script>

<style lang="scss" src="./Specialist.scss"></style>
