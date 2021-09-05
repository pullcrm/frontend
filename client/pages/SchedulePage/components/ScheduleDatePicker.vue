<template>
  <DatePicker
    v-model="date"
    :get-classes="getClasses"
    title-format="DD.MM.YYYY"
    class="schedule-page-queue-schedule-date-picker"
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '~/utils/dayjs'

import DatePicker from '~/components/DatePicker/DatePicker.vue'

@Component({
  components: {
    DatePicker
  }
})
export default class ScheduleDatePicker extends Vue {
  get date () {
    return new Date(this.$typedStore.state.schedule.date) as Date
  }

  set date (val) {
    const date = dayjs(val).format('YYYY-MM-DD')

    this.$router.replace({
      query: { date }
    })

    this.$typedStore.commit('schedule/SET_DATE', date)
    this.$typedStore.dispatch('schedule/fetch')
  }

  get timetable () {
    return this.$typedStore.getters['timetable/normalizeTimetable']
  }

  getClasses (date) {
    const day = dayjs(date).locale('en').format('dddd').toLowerCase()

    if (this.timetable[day]?.opened === false) {
      return '_closed'
    }
  }
}
</script>

<style lang="scss" src="./ScheduleDatePicker.scss"></style>
