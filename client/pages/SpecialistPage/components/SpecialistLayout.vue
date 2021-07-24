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

      <CompanyPicker
        class="specialist-page-layout__company-picker"
      />

      <UiNavigation
        class="specialist-page-layout__navigation"
        :navigation="navigation"
      />

      <slot />
    </UiContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SPECIALIST } from '~/constants/roles'

import CompanyPicker from './CompanyPicker.vue'

@Component({
  components: {
    CompanyPicker
  }
})
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

      {
        name: 'Настройки',
        to: {
          ...this.$route,
          name: 'specialistSettings'
        }
      }
    ].filter(Boolean)
  }

  get role () {
    return this.$typedStore.getters['position/role']
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

  async onBack () {
    await this.$router.push({ name: 'specialists' })
  }
}
</script>

<style lang="scss" src="./SpecialistLayout.scss"></style>
