<template>
  <div class="schedule-page-header">
    <div class="schedule-page-header__left">
      <UiPopover
        size="m"
        placement="bottom_start"
      >
        <template #default="{ toggle }">
          <UiButton
            class="schedule-page-header__calendar"
            size="m"
            theme="transparent"
            left-icon="outlined/calendar"
            right-icon="solid/caret-down-fill"
            @click.native.prevent="toggle"
          >
            {{ date | formatDate('D MMMM, dd') }}
          </UiButton>
        </template>

        <template #body>
          <Calendar v-model="date" />
        </template>
      </UiPopover>

      <UiButton
        class="schedule-page-header__tomorrow"
        :class="{'_active': isTomorrow}"
        size="m"
        theme="transparent"
        @click.native="setDateTomorrow"
      >
        Завтра
      </UiButton>
    </div>

    <div class="schedule-page-header__right">
      <UiButton
        size="m"
        theme="blue"
        right-icon="outlined/plus"
        @click.native="addAppointment"
      >
        Добавить запись
      </UiButton>

      <UiButton
        size="m"
        theme="info-outlined"
        @click.native="toggleQueue"
      >
        {{ queueButtonText }}
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '@/utils/dayjs'

import Calendar from '@/components/Calendar/Calendar.vue'

@Component({
  components: {
    Calendar
  }
})
export default class Header extends Vue {
  get date () {
    return new Date(this.$store.state.schedule.date) as Date
  }

  set date (val) {
    const date = dayjs(val).format('YYYY-MM-DD')

    this.$router.replace({
      query: { date }
    })

    this.$store.commit('schedule/SET_DATE', date)
    this.$store.dispatch('schedule/fetch')
  }

  get isTomorrow () {
    return dayjs(this.date).isTomorrow()
  }

  get queue () {
    return this.$store.state.appointments.queue
  }

  get isQueueOpened (): boolean {
    return this.$store.state.schedule.isQueueOpened
  }

  get queueButtonText () {
    let text = this.isQueueOpened ? 'Скрыть очередь' : 'Показать очередь'

    if (this.queue.length > 0) {
      text += ` (${this.queue.length})`
    }

    return text
  }

  setDateTomorrow () {
    if (this.isTomorrow) return

    this.date = dayjs(new Date()).add(1, 'day').toDate()
  }

  addAppointment () {
    this.$store.dispatch('popup/show', 'appointment-new')
  }

  toggleQueue () {
    this.$store.commit('schedule/SET_QUEUE_OPEN', !this.isQueueOpened)
  }
}
</script>

<style lang="scss" src="./Header.scss"></style>
