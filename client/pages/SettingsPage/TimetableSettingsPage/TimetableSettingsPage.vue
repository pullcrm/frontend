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

      <TimeTableDay
        v-for="(value, key) in timetable"
        :key="key"
        :to="value.to"
        :from="value.from"
        :opened="value.opened"
        :day-alias="key"
        class="timetable-settings-page__day"
      />
    </UiPanel>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import SettingsLayout from '../components/Layout.vue'

import TimeTableDay from './components/Day.vue'

@Component({
  layout: 'dashboard',

  components: {
    TimeTableDay,
    SettingsLayout
  },

  head () {
    return {
      title: 'Настройки графика работы - pullcrm'
    }
  }
})
export default class TimetableSettingsPage extends Vue {
  get timetable () {
    return this.$typedStore.getters['timetable/normalizeTimetable']
  }
}
</script>

<style lang="scss" src="./TimetableSettingsPage.scss"></style>
