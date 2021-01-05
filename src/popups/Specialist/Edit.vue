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
            name="+"
            size="xxl"
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
          v-model="status"
          :options="statusList"
          label="value"
          placeholder="Выбрать статус"
        />
      </UiField>

      <UiField
        label="Описание"
      >
        <UiInput
          v-model="description"
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

import { IRegistrationUser } from '@/services/api'

import { statuses } from '@/logics/specialist'

import FileUpload from '@/components/FileUpload/FileUpload.vue'

@Component({
  components: {
    FileUpload
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  }
})
export default class SpecialistNew extends Vue {
  readonly user: IRegistrationUser

  form: IRegistrationUser = this.user
  description = this.user.specialists.description

  isLoading = false
  currentFile: File

  status = {
    ...statuses[this.currentStatus],
    key: this.currentStatus
  }

  get image () {
    return this.user.avatar?.path
  }

  get currentStatus () {
    return this.user.specialists.status
  }

  get statusList () {
    return Object.keys(statuses).map(key => ({ key, ...statuses[key] }))
  }

  async fileSelect (file) {
    this.currentFile = file
  }

  async onSubmit () {
    try {
      this.isLoading = true

      const result = await this.$store.dispatch('specialists/onUploadAvatar', this.currentFile)

      await Promise.all([
        this.$api.specialist.update(this.form.id, {
          ...this.form,
          avatarId: result?.id,
          status: this.status.key,
          description: this.description
        })
      ])

      await this.$store.dispatch('specialists/fetch')

      this.$emit('close')
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" src="./Specialist.scss"></style>
