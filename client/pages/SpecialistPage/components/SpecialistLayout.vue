<template>
  <div class="specialist-page-layout">
    <UiContainer narrow>
      <UiBack
        v-if="hasBack"
        class="specialist-page-layout__back"
        @click.native="onBack"
      />

      <UiTitle
        class="specialist-page-layout__title"
        size="l"
        responsive
      >
        {{ specialist.fullName }}
      </UiTitle>

      <UiNavigation
        class="specialist-page-layout__navigation"
        :navigation="navigation"
        @input="onNavigation"
      />

      <slot />
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { ADMIN, SPECIALIST } from '~/constants/roles'

@Component({})
export default class SpecialistLayout extends Vue {
  get navigation () {
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
          name: 'specialistSchedule'
        }
      },

      {
        name: 'Услуги',
        to: {
          ...this.$route,
          name: 'specialistProcedures'
        }
      },

      this.isMyProfile && {
        name: 'Выйти'
      },

      this.isDeletable && {
        name: 'Удалить профиль'
      }
    ].filter(Boolean)
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

  get specialistId () {
    return Number(this.$route.params.slug)
  }

  get specialist () {
    return this.$typedStore.getters['specialists/byId'](this.specialistId)
  }

  get hasBack () {
    return this.role.name !== SPECIALIST
  }

  async onNavigation (item) {
    if (item.name === 'Выйти') {
      await this.logout()
    }

    if (item.name === 'Удалить профиль') {
      await this.remove()
    }
  }

  async remove () {
    const result = await this.$typedStore.dispatch('popup/askQuestion', {
      title: 'Вы действительно хотите удалить профиль сотрудника? Это действие не обратимо!',
      acceptButtonTitle: 'Удалить!'
    })

    if (result) {
      await this.$api.specialist.remove(this.specialistId)

      const { href } = this.$router.resolve({
        name: 'specialists'
      })

      window.location.href = href
    }
  }

  async logout () {
    const result = await this.$typedStore.dispatch('popup/askQuestion', {
      title: 'Вы действительно хотите завершить сеанс?',
      acceptButtonTitle: 'Выйти'
    })

    if (result) {
      await this.$typedStore.dispatch('auth/logout')

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

<style lang="scss" src="./SpecialistLayout.scss"></style>
