<template>
  <SettingsLayout
    class="timetable-settings-page"
  >
    <UiPanel
      size="m"
      responsive
    >
      <UiTitle
        size="s"
        responsive
        class="timetable-settings-page__title"
      >
        График работы
      </UiTitle>
    </UiPanel>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import SettingsLayout from '../components/Layout.vue'

@Component({
  layout: 'dashboard',

  components: {
    SettingsLayout
  }

  // async asyncData ({ api, typedStore }) {
  //   const companyId = typedStore.getters['position/companyId']

  //   const result = await api.timetable.get(companyId)

  //   console.log(result)
  // }
})
export default class TimetableSettingsPage extends Vue {}
</script>

<style lang="scss" src="./TimetableSettingsPage.scss"></style>
