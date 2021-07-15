<template>
  <SpecialistLayout
    class="specialist-info-page"
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
        label="Имя и Фамилия"
        required
      >
        <UiInput
          v-model="specialist.user.fullName"
          name="name"
          placeholder="Введите Имя и Фамилию"
          required
        />
      </UiField>

      <UiField
        label="Телефон"
      >
        <UiInput
          :value="specialist.user.phone"
          name="phone"
          mask="38 (###) #### ###"
          type="phone"
          disabled
          left-icon="outlined/phone"
        />
      </UiField>

      <UiField
        label="Почта"
      >
        <UiInput
          v-model="specialist.user.email"
          name="email"
          type="email"
          placeholder="Введите почту"
        />
      </UiField>

      <UiField
        label="Специализация"
      >
        <UiInput
          v-model="specialist.specialization"
          name="specialization"
          placeholder="Профиль специалиста"
        />
      </UiField>

      <UiField
        label="Описание"
      >
        <UiInput
          v-model="specialist.description"
          name="description"
          placeholder="Добавьте описание"
          tag="textarea"
        />
      </UiField>

      <UiField
        label="Доступность для записи"
        required
      >
        <UiSelect
          v-model="status"
          :options="statusList"
          label-key="value"
          :disabled="isStatusDisabled"
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
        Персональная ссылка на страницу записи
      </UiLink>

      <UiButton
        id="submit-button"
        class="specialist-info-page__button"
        size="l"
        type="submit"
        theme="blue"
        :loading="isLoading"
      >
        Сохранить
      </UiButton>
    </form>
  </SpecialistLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { AVATAR } from '~/constants/files'
import { SPECIALIST } from '~/constants/roles'

import { copyText } from '~/utils/clipboard'

import { statuses } from '~/logics/specialist'

import SpecialistLayout from '../components/SpecialistLayout.vue'

import Avatars from './components/Avatars.vue'
import CreatedAt from './components/CreatedAt.vue'

@Component({
  components: {
    Avatars,
    CreatedAt,
    SpecialistLayout
  },

  async asyncData ({ typedStore, route, api }) {
    const slug = Number(route.params.slug)

    const specialist = typedStore.getters['specialists/byId'](slug)

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
      title: 'Информация о сотруднике - pullcrm'
    }
  }

  // async fetch () {
  //   const slug = Number(this.$route.params.slug)

  //   this.specialist = await this.$api.public.specialistById(slug)

  //   this.avatars = await this.$api.files.all(this.user.id, {
  //     group: AVATAR
  //   })
  // }
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

  get role () {
    return this.$typedStore.getters['position/role']
  }

  get isStatusDisabled () {
    return this.role.name === SPECIALIST
  }

  get status () {
    return statuses[this.specialist.status]
  }

  set status (val) {
    this.specialist.status = val.key
  }

  get statusList () {
    return Object.keys(statuses).map(key => ({ key, ...statuses[key] }))
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

      this.$typedStore.dispatch('toasts/show', { title: 'Сохранено!' })

      this.refresh()
    } catch (err) {
      this.$typedStore.dispatch('toasts/show', {
        title: `Ошибка: ${err.data.message}`,
        type: 'error'
      })
    } finally {
      this.isLoading = false
    }
  }

  async refresh () {
    await Promise.all([
      this.fetchAvatars,
      this.$typedStore.dispatch('specialists/fetch')
    ])

    this.specialist = this.$typedStore.getters['specialists/byId'](this.specialistId)
  }

  async fetchAvatars () {
    const result = await this.$api.files.all(this.user.id, {
      group: AVATAR
    })

    this.avatars = result
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
      title: 'Ссылка скопирована!'
    })
  }
}
</script>

<style lang="scss" src="./SpecialistInfoPage.scss"></style>
