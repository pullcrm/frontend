<template>
  <div class="schedule-page">
    <UiContainer>
      <div class="schedule-page__header">
        <UiTitle
          size="m"
          responsive
        >
          Календарь
        </UiTitle>

        <UiButton
          size="s"
          theme="blue"
          right-icon="outlined/plus"
          @click.native="addAppointment"
        >
          Добавить запись
        </UiButton>
      </div>

      <Schedule
        class="schedule-page__schedule"
        :loading="isLoading"
      />
    </UiContainer>

    <DatePickerButton
      class="schedule-page__date-picker-button"
    />

    <Portal to="sidebar">
      <Sidebar />
    </Portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Schedule from '~/components/Schedule/Schedule.vue'

import Sidebar from './components/Sidebar.vue'
import DatePickerButton from './components/DatePickerButton/DatePickerButton.vue'

@Component({
  layout: 'dashboard',

  components: {
    Sidebar,
    Schedule,
    DatePickerButton
  },

  head () {
    return {
      title: 'Календарь - pullcrm'
    }
  }
})
export default class SchedulePage extends Vue {
  get isLoading () {
    return this.$typedStore.state.schedule.isLoading
  }

  async mounted () {
    const { date } = this.$route.query

    if (date) {
      this.$typedStore.commit('schedule/SET_DATE', date)
    }

    await this.$typedStore.dispatch('schedule/fetch')
  }

  async addAppointment () {
    await this.$typedStore.dispatch('popup/show', {
      name: 'appointment',
      props: { type: 'new' }
    })
  }
}
</script>

<style lang="scss" src="./SchedulePage.scss"></style>
