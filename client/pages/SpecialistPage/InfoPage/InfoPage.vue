<template>
  <SpecialistLayout
    class="specialist-info-page"
    :specialist="specialist"
  >
    <Avatars
      class="specialist-info-page__avatars"
      :avatars="avatars"
      :specialist="specialist"
      @refresh="refresh"
    />

    <form
      @submit.prevent="onSubmit"
    >
      <UiField
        label="Ім'я та Прізвище"
        required
      >
        <UiInput
          v-model="specialist.user.fullName"
          name="name"
          placeholder="Введіть Ім'я та Прізвище"
          required
        />
      </UiField>

      <UiField
        label="Телефон"
        required
      >
        <UiInput
          :value="specialist.user.phone"
          name="phone"
          mask="+38 (###) #### ###"
          type="phone"
          disabled
          inputmode="tel"
          left-icon="outlined/phone"
        />
      </UiField>

      <UiField
        label="Пошта"
      >
        <UiInput
          v-model="specialist.user.email"
          name="email"
          type="email"
          placeholder="Введіть почту"
        />
      </UiField>

      <UiField
        label="Специализация"
      >
        <UiInput
          v-model="specialist.specialization"
          name="specialization"
          placeholder="Профіль спеціаліста"
        />
      </UiField>

      <UiField
        label="Опис"
      >
        <UiInput
          v-model="specialist.description"
          name="description"
          placeholder="Добавте опис"
          tag="textarea"
        />
      </UiField>

      <CreatedAt
        class="specialist-info-page__created-at"
        :created-at="specialist.createdAt"
      />

      <UiLink
        tag="UiText"
        size="l"
        theme="action"
        left-icon="outlined/link"
        class="specialist-info-page__widget"
        @click.native.prevent="copyPersonalLink"
      >
        Персональне посилання на сторінку запису
      </UiLink>

      <UiButton
        class="specialist-info-page__button"
        size="l"
        type="submit"
        theme="blue"
        :loading="isLoading"
      >
        Зберегти
      </UiButton>
    </form>
  </SpecialistLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { AVATAR } from '~/constants/files'

import { copyText } from '~/utils/clipboard'

import SpecialistLayout from '../components/SpecialistLayout.vue'

import Avatars from './components/Avatars.vue'
import CreatedAt from './components/CreatedAt.vue'

@Component({
  components: {
    Avatars,
    CreatedAt,
    SpecialistLayout
  },

  async asyncData ({ route, api }) {
    const slug = Number(route.params.slug)

    const specialist = await api.specialist.get(slug)

    const avatars = await api.files.all(specialist.user.id, {
      group: AVATAR
    })

    return {
      avatars,
      specialist
    }
  },

  head () {
    return {
      title: 'Информація про спеціаліста - pullcrm'
    }
  }
})
export default class SpecialistInfoPage extends Vue {
  avatars: any[]
  specialist!: any

  isLoading = false

  get companyId () {
    return this.$typedStore.getters['position/companyId']
  }

  get specialistId () {
    return this.specialist.id
  }

  get user () {
    return this.specialist.user
  }

  async onSubmit () {
    try {
      this.isLoading = true

      const {
        id,
        user,
        status,
        description,
        specialization
      } = this.specialist

      await this.$api.specialist.update({
        id,
        email: user.email || undefined,
        status,
        fullName: user.fullName,
        description,
        specialization
      })

      this.$typedStore.dispatch('toasts/show', { title: 'Збережено!' })

      this.refresh()
    } catch (err) {
      this.$typedStore.dispatch('toasts/show', {
        title: `Помилка: ${err.data.message}`,
        type: 'error'
      })
    } finally {
      this.isLoading = false
    }
  }

  async refresh () {
    const [avatars, specialist] = await Promise.all([
      this.$api.files.all(this.user.id, {
        group: AVATAR
      }),
      this.$api.specialist.get(this.specialistId)
    ])

    this.avatars = avatars
    this.specialist = specialist
  }

  async copyPersonalLink () {
    const { href } = this.$router.resolve({
      name: 'fullWidgetSpecialistPage',
      query: {
        companyId: this.companyId,
        specialistId: this.specialistId
      }
    })

    const { BASE_HOST } = this.$runtimeConfig

    copyText(`https://${BASE_HOST}${href}`)

    await this.$typedStore.dispatch('toasts/show', {
      title: 'Посилання скопійовано'
    })
  }
}
</script>

<style lang="scss" src="./InfoPage.scss"></style>
