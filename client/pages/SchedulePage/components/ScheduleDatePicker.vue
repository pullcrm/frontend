<template>
  <div class="schedule-page-queue-schedule-date-picker">
    <DatePicker
      v-model="date"
      :get-classes="getClasses"
      title-format="DD.MM.YYYY"
      class="schedule-page-queue-schedule-date-picker__date-picker"
      @input="$emit('input', $event)"
    />

    <div class="schedule-page-queue-schedule-date-picker__footer">
      <UiText
        tag="a"
        href="#"
        size="m"
        :class="[
          'schedule-page-queue-schedule-date-picker__button',
          {'active': isToday}
        ]"
        data-test="date-picker-today"
        @click.native.prevent="setToday"
      >
        Сегодня
      </UiText>

      <UiText
        tag="a"
        href="#"
        size="m"
        :class="[
          'schedule-page-queue-schedule-date-picker__button',
          {'active': isTomorrow}
        ]"
        data-test="date-picker-tomorrow"
        @click.native.prevent="setTomorrow"
      >
        Завтра
      </UiText>
    </div>
  </div>
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

  get isToday () {
    return dayjs(this.date).isToday()
  }

  get isTomorrow () {
    return dayjs(this.date).isTomorrow()
  }

  get timetable () {
    return this.$typedStore.getters['timetable/normalizeTimetable']
  }

  setToday () {
    if (this.isToday) return

    this.date = new Date()
  }

  setTomorrow () {
    if (this.isTomorrow) return

    this.date = dayjs().add(1, 'day').toDate()
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
