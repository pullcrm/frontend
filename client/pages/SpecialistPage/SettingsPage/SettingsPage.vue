<template>
  <SpecialistLayout
    :specialist="specialist"
    class="specialist-settings-page"
  >
    <form @submit.prevent="onSubmit">
      <UiField
        label="Доступність для запису"
        required
      >
        <UiSelect
          v-model="status"
          :options="statusList"
          label-key="value"
          required
          :disabled="isStatusDisabled"
        />
      </UiField>

      <UiField
        label="Роль"
        required
      >
        <UiSelect
          v-model="specialistRole"
          :options="roles"
          label-key="name"
          :disabled="isRoleDisable"
          required
        />
      </UiField>

      <UiButton
        class="specialist-settings-page__button"
        size="l"
        type="submit"
        theme="blue"
        :loading="isLoading"
      >
        Зберегти
      </UiButton>

      <UiButton
        v-if="isMyProfile"
        class="specialist-settings-page__button"
        size="l"
        theme="danger-outlined"
        @click.native="onLogout"
      >
        Вийти
      </UiButton>

      <template v-if="isDeletable">
        <UiDivider />

        <UiButton
          class="specialist-settings-page__button"
          size="l"
          theme="danger-outlined"
          @click.native="onRemove"
        >
          Видалити співробітника
        </UiButton>
      </template>
    </form>
  </SpecialistLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SPECIALIST, MANAGER, ADMIN } from '~/constants/roles'

import { roles, statuses } from '~/logics/specialist'

import SpecialistLayout from '../components/SpecialistLayout.vue'

@Component({
  components: {
    SpecialistLayout
  },

  async asyncData ({ route, api }) {
    const slug = Number(route.params.slug)

    const specialist = await api.specialist.get(slug)

    const specialistRole = roles[
      specialist.role.name
    ]

    return {
      specialist,
      specialistRole
    }
  }
})
export default class SpecialistSettingsPage extends Vue {
  specialist!: any
  specialistRole!: any

  isLoading = false

  get status () {
    return statuses[this.specialist.status]
  }

  set status (val) {
    this.specialist.status = val.name
  }

  get statusList () {
    return Object.values(statuses)
  }

  get isStatusDisabled () {
    return this.role.name === SPECIALIST
  }

  get specialistId () {
    return this.specialist.id
  }

  get roles () {
    return [
      roles[MANAGER],
      roles[SPECIALIST]
    ]
  }

  get role () {
    return this.$typedStore.getters['position/role']
  }

  get positionId () {
    return this.$typedStore.getters['position/currentId']
  }

  get isMyProfile () {
    return this.specialistId === this.positionId
  }

  get isDeletable () {
    return (
      this.role.name === ADMIN &&
      this.isMyProfile === false
    )
  }

  get isRoleDisable () {
    return this.role.name === SPECIALIST
  }

  async onSubmit () {
    try {
      this.isLoading = true

      await this.$api.specialist.update({
        id: this.specialist.id,
        role: this.specialistRole.value,
        status: this.specialist.status
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

  async onLogout () {
    const result = await this.$typedStore.dispatch('popup/askQuestion', {
      title: 'Ви дійсно бажаєте завершити сеанс?',
      acceptButtonTitle: 'Вийти'
    })

    if (result) {
      await this.$typedStore.dispatch('auth/logout')

      const { href } = this.$router.resolve({
        name: 'login'
      })

      window.location.href = href
    }
  }

  async onRemove () {
    const result = await this.$typedStore.dispatch('popup/askQuestion', {
      title: 'Ви дійсно бажаєте видалити профіль співробітника? Ця дія не зворотня!',
      acceptButtonTitle: 'Видалити!'
    })

    if (result) {
      await this.$api.specialist.remove(this.specialistId)

      const { href } = this.$router.resolve({
        name: 'specialists'
      })

      window.location.href = href
    }
  }

  async refresh () {
    await this.$typedStore.dispatch('specialists/fetch')

    this.specialist = this.$typedStore.getters['specialists/byId'](this.specialistId)
  }
}
</script>

<style lang="scss" src="./SettingsPage.scss"></style>
