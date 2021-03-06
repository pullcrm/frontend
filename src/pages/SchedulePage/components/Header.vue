<template>
  <div class="schedule-page-header">
    <div class="schedule-page-header__left">
      <UiPopover
        size="m"
        placement="bottom_start"
      >
        <UiButton
          class="schedule-page-header__calendar"
          size="m"
          theme="transparent"
          left-icon="outlined/calendar"
          right-icon="solid/caret-down-fill"
        >
          {{ date | formatDate('D MMMM, dd') }}
        </UiButton>

        <template #body>
          <UiCalendar v-model="date" />
        </template>
      </UiPopover>

      <UiButton
        v-if="isToday"
        class="schedule-page-header__tomorrow"
        size="m"
        theme="transparent"
        @click.native="setDateTomorrow"
      >
        Завтра
      </UiButton>

      <UiButton
        v-else
        class="schedule-page-header__today"
        size="m"
        theme="transparent"
        @click.native="date = new Date()"
      >
        Сегодня
      </UiButton>
    </div>

    <div class="schedule-page-header__right">
      <UiText
        v-if="balance !== null"
        class="schedule-page-header__balance"
        size="m"
        left-icon="outlined/chat-text"
        responsive
      >
        <UiPrice
          size="xs"
          responsive
        >
          {{ balance | price }}
        </UiPrice>
      </UiText>

      <UiButton
        class="schedule-page-header__add"
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
        Очередь ({{ queue.length }})
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '@/utils/dayjs'

@Component({})
export default class Header extends Vue {
  get balance () {
    return this.$store.state.sms.balance
  }

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

  get isToday () {
    return dayjs(this.date).isToday()
  }

  get queue () {
    return this.$store.state.appointments.queue
  }

  get isQueueOpened (): boolean {
    return this.$store.state.schedule.isQueueOpened
  }

  setDateTomorrow () {
    this.date = dayjs(new Date()).add(1, 'day').toDate()
  }

  addAppointment () {
    this.$store.dispatch('popup/show', {
      name: 'appointment',
      props: {
        type: 'new'
      }
    })
  }

  toggleQueue () {
    this.$store.commit('schedule/SET_QUEUE_OPEN', !this.isQueueOpened)
  }
}
</script>

<style lang="scss" src="./Header.scss"></style>
