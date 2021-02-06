<template>
  <div class="schedule-page">
    <UiContainer>
      <div class="ui-grid">
        <AnalyticPanel
          v-for="(analytic, index) in analytics"
          :key="`analytic-${index}`"
          :class="[
            'ui-grid-item',
            'ui-grid-item_12',
            'ui-grid-item_tablet_6',
            'ui-grid-item_laptop_4'
          ]"
          :name="analytic.name"
          :value="analytic.value"
        />
      </div>

      <Header
        class="schedule-page__header"
      />

      <Schedule
        class="schedule-page__schedule"
        :loading="isLoading"
      />
    </UiContainer>

    <Portal
      v-if="isQueueOpened"
      to="sidebar"
    >
      <Queue />
    </Portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { formatMoney } from '@/utils/money'

import Schedule from '@/components/Schedule/Schedule.vue'
import AnalyticPanel from '@/components/AnalyticPanel/AnalyticPanel.vue'

import Queue from './components/Queue.vue'
import Header from './components/Header.vue'

@Component({
  components: {
    Queue,
    Header,
    Schedule,
    AnalyticPanel
  }
})
export default class SchedulePage extends Vue {
  get isQueueOpened (): boolean {
    return this.$store.state.schedule.isQueueOpened
  }

  get isLoading () {
    return this.$store.state.schedule.isLoading
  }

  get appointments () {
    return this.$store.state.appointments.appointments
  }

  get appointmentsCount (): number {
    return this.appointments.length
  }

  get expectedTotal () {
    return this.appointments
      .filter(({ status }) => status !== 'CANCELED')
      .reduce((sum, { total }) => (sum + total), 0)
  }

  get total () {
    return this.appointments
      .filter(({ status }) => status === 'COMPLETED')
      .reduce((sum, { total }) => (sum + total), 0)
  }

  get analytics () {
    return [
      {
        name: 'Количество записей',
        value: this.appointmentsCount
      },
      {
        name: 'Ожидаемый доход за день',
        value: formatMoney(this.expectedTotal)
      },
      {
        name: 'Доход за день',
        value: formatMoney(this.total)
      }
    ]
  }

  async mounted () {
    const { date } = this.$route.query

    if (date) {
      this.$store.commit('schedule/SET_DATE', date)
    }

    await this.$store.dispatch('schedule/fetch')
  }
}
</script>

<style lang="scss" src="./SchedulePage.scss"></style>
