<template>
  <div
    v-if="specialist"
    class="specialist-page"
  >
    <UiContainer narrow>
      <UiBack
        v-if="hasBack"
        class="specialist-page__back"
        @click.native="onBack"
      />

      <UiTitle
        class="specialist-page__title"
        size="l"
        responsive
      >
        {{ specialist.fullName }}
      </UiTitle>

      <UiTabs
        class="specialist-page__tabs"
        :tabs="tabs"
        @input="onTab"
      />

      <RouterView
        :specialist="specialist"
      />
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SPECIALIST } from '@/constants/roles'

@Component({})
export default class SpecialistPage extends Vue {
  get tabs () {
    return [
      {
        name: 'Информация',
        to: {
          ...this.$route,
          name: 'specialistInfo'
        }
      },

      {
        name: 'Журнал записей',
        to: {
          ...this.$route,
          name: 'specialistAppointments'
        }
      },

      this.isMyProfile && {
        name: 'Выйти'
      }
    ].filter(Boolean)
  }

  get role () {
    return this.$store.getters['position/role']
  }

  get positionId () {
    return this.$store.getters['position/currentId']
  }

  get isMyProfile () {
    return this.specialistId === this.positionId
  }

  get specialists () {
    return this.$store.state.specialists.specialists
  }

  get specialistId () {
    return Number(this.$route.params.specialistId)
  }

  get specialist () {
    return this.specialists.find(({ id }) => id === this.specialistId)
  }

  get profile () {
    return this.$store.state.profile
  }

  get hasBack () {
    return this.role.name !== SPECIALIST
  }

  async onTab (tab) {
    if (tab.name === 'Выйти') {
      await this.logout()
    }
  }

  async logout () {
    const result = await this.$store.dispatch('popup/askQuestion', {
      title: 'Вы действительно хотите завершить сеанс?',
      acceptButtonTitle: 'Выйти'
    })

    if (result) {
      await this.$store.dispatch('auth/logout')

      const { href } = this.$router.resolve({
        name: 'login'
      })

      window.location.href = href
    }
  }

  async onBack () {
    await this.$router.push({ name: 'specialists' })
  }
}
</script>

<style lang="scss" src="./SpecialistPage.scss"></style>
