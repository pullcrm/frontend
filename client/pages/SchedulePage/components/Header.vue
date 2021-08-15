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
          <DataPicker
            v-model="date"
          />
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

import dayjs from '~/utils/dayjs'

import DataPicker from '~/components/DatePicker/DatePicker.vue'

@Component({
  components: {
    DataPicker
  }
})
export default class Header extends Vue {
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

  get queue () {
    return this.$typedStore.state.appointments.queue
  }

  get isQueueOpened (): boolean {
    return this.$typedStore.state.schedule.isQueueOpened
  }

  setDateTomorrow () {
    this.date = dayjs(new Date()).add(1, 'day').toDate()
  }

  async addAppointment () {
    await this.$typedStore.dispatch('popup/show', {
      name: 'appointment',
      props: { type: 'new' }
    })
  }

  toggleQueue () {
    this.$typedStore.commit('schedule/SET_QUEUE_OPEN', !this.isQueueOpened)
  }
}
</script>

<style lang="scss" src="./Header.scss"></style>
