<template>
  <SettingsLayout
    class="company-settings-page"
  >
    <UiTitle
      class="company-settings-page__title"
      size="l"
      responsive
    >
      Настройки компании
    </UiTitle>

    <FileUpload
      :image="logo"
      responsive
      @input="onAvatar"
    >
      <template #default="{ url }">
        <UiAvatar
          :image="url"
          :name="company.name"
          size="xl"
          responsive
        />
      </template>
    </FileUpload>

    <UiField
      label="Название компании"
    >
      <UiInput
        v-model="companyName"
        left-icon="edit/edit-1"
        placeholder="Введите название"
      />
    </UiField>

    <UiButton
      theme="blue"
      :loading="isLoading"
      responsive
      @click.native="save"
    >
      Сохранить
    </UiButton>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import FileUpload from '@/components/FileUpload/FileUpload.vue'

import SettingsLayout from '../components/SettingsLayout.vue'

@Component({
  components: {
    FileUpload,
    SettingsLayout
  }
})
export default class Settings extends Vue {
  isLoading = false
  companyName = this.company.name

  get company () {
    return this.$store.getters['company/current']
  }

  get logo () {
    return this.company.logo?.path
  }

  async onAvatar (file) {
    const result = await this.$store.dispatch('files/create', file)

    await this.$api.companies.update(this.company.id, {
      logoId: result.id
    })

    return this.$store.dispatch('company/fetch')
  }

  async save () {
    try {
      this.isLoading = true

      await this.$api.companies.update(this.company.id, {
        name: this.companyName
      })

      await this.$store.dispatch('company/fetch')
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" src="./CompanySettingsPage.scss"></style>
