<template>
  <div
    v-if="isVisible"
    class="specialist-page-company-picker"
  >
    <UiSelect
      :value="position"
      :options="positions"
      label-key="title"
      placeholder="Ваші компанії"
      @input="fetch"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SPECIALIST } from '~/constants/roles'

@Component({})
export default class CompanyPicker extends Vue {
  get isVisible () {
    return this.role.name === SPECIALIST
  }

  get role () {
    return this.$typedStore.getters['position/role']
  }

  get companyId () {
    return this.$typedStore.getters['position/companyId']
  }

  get position () {
    return this.positions.find(item => {
      return item.company.id === this.companyId
    })
  }

  get positions () {
    return [
      ...this.$typedStore.state.position.positions
        .map(item => {
          return {
            ...item,
            title: item.company.name
          }
        }),
      {
        title: 'Створити нову компанію',
        id: 0
      }
    ]
  }

  async fetch (position) {
    if (position.id === 0) {
      return this.$router.push({
        name: 'companyCreate'
      })
    }

    await this.$typedStore.dispatch('auth/refreshTokenByPosition', position)

    const { href } = this.$router.resolve({
      name: 'dashboard'
    })

    window.location.href = href
  }
}
</script>
