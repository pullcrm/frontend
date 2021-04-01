<template>
  <div class="specialist-info-page">
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
        label="Имя"
        required
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
        required
      >
        <UiInput
          v-model="form.lastName"
          name="surname"
          placeholder="Введите Фамилию"
          required
        />
      </UiField>

      <UiField
        label="Телефон"
      >
        <UiInput
          :value="phone"
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
          v-model="form.email"
          name="email"
          type="email"
          placeholder="Введите почту"
        />
      </UiField>

      <UiField
        label="Специализация"
      >
        <UiInput
          v-model="form.specialization"
          name="specialization"
          placeholder="Профиль специалиста"
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

      <UiField
        label="Доступность для записи"
        required
      >
        <UiSelect
          v-model="form.status"
          :options="statusList"
          label-key="value"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { AVATAR } from '@/constants/files'

import { statuses } from '@/logics/specialist'

import { copyText } from '@/utils/clipboard'

import Avatars from './components/Avatars.vue'
import CreatedAt from './components/CreatedAt.vue'

interface ISpecialistEditParams {
  id?: number
  email?: string
  status?: Record<string, any>
  lastName?: string
  firstName?: string
  description?: string
  specialization?: string
}

@Component({
  components: {
    Avatars,
    CreatedAt
  },

  props: {
    specialist: {
      type: Object,
      required: true
    }
  },

  beforeRouteEnter (_to, _from, next) {
    next(async (vm: SpecialistInfoPage) => {
      await vm.fetchAvatars()
    })
  }
})
export default class SpecialistInfoPage extends Vue {
  readonly specialist

  avatars = []

  form: ISpecialistEditParams = {}

  isLoading = false

  constructor () {
    super()

    const {
      user,
      status: currentStatus,
      description,
      specialization
    } = this.specialist

    const status = {
      ...statuses[currentStatus],
      key: currentStatus
    }

    this.form = {
      email: user.email,
      status,
      lastName: user.lastName,
      firstName: user.firstName,
      description,
      specialization
    }
  }

  get companyId () {
    return this.$store.getters['position/companyId']
  }

  get specialistId () {
    return Number(this.$route.params.specialistId)
  }

  get user () {
    return this.specialist.user
  }

  get phone () {
    return this.user.phone
  }

  get statusList () {
    return Object.keys(statuses).map(key => ({ key, ...statuses[key] }))
  }

  async onSubmit () {
    try {
      this.isLoading = true

      // @ts-ignore
      await this.$api.specialist.update(this.specialistId, {
        ...this.form,
        status: this.form.status.key
      })

      this.$store.dispatch('toasts/show', { title: 'Сохранено!' })

      await this.refresh()
    } catch (err) {
      this.$store.dispatch('toasts/show', {
        title: `Ошибка: ${err.data.message}`,
        type: 'error'
      })
    } finally {
      this.isLoading = false
    }
  }

  async refresh () {
    // TODO: Do update this specialist
    return await Promise.all([
      this.fetchAvatars(),
      this.$store.dispatch('specialists/fetch')
    ])
  }

  async fetchAvatars () {
    const result = await this.$api.files.all(this.user.id, {
      group: AVATAR
    })

    this.avatars = result
  }

  async copyPersonalLink () {
    const link = `https://pullcrm.com/widgets/base/${this.companyId}/?specialistId=${this.specialistId}`

    copyText(link)

    await this.$store.dispatch('toasts/show', {
      title: 'Ссылка скопирована!'
    })
  }
}
</script>

<style lang="scss" src="./SpecialistInfoPage.scss"></style>
