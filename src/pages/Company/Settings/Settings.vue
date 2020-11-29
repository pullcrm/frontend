<template>
  <div
    class="company-settings-page"
  >
    <UiContainer>
      <UiPanel
        responsive
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
            v-model="name"
            left-icon="edit/edit-1"
            placeholder="Введите название"
          />
        </UiField>

        <UiButton
          theme="blue"
          responsive
          @click.native="save"
        >
          Сохранить
        </UiButton>

        <div class="company-settings-page__divider" />

        <SmsNotification />
      </UiPanel>
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import FileUpload from '@/components/FileUpload/FileUpload.vue'

import SmsNotification from './components/SmsNotification/SmsNotification.vue'

@Component({
  components: {
    FileUpload,
    SmsNotification
  }
})
export default class Settings extends Vue {
  name = this.company.name

  get company () {
    return this.$store.getters['company/current']
  }

  get logo () {
    return this.company?.logo?.path
  }

  async onAvatar (file) {
    const result = await this.$store.dispatch('files/fetch', file)

    await this.$api.companies.update(this.company.id, {
      logoId: result.id
    })

    return this.$store.dispatch('company/fetch')
  }

  async save () {
    await this.$api.companies.update(this.company.id, {
      name: this.name
    })

    return this.$store.dispatch('company/fetch')
  }
}
</script>

<style lang="scss" src="./Settings.scss"></style>
