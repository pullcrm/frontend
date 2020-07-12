<template>
  <div class="schedule-sidebar">
    <Calendar
      v-model="date"
      class="schedule-sidebar__calendar"
    />

    <div class="schedule-sidebar__divider" />

    <UiButton
      class="schedule-sidebar__add-appointment"
      size="l"
      theme="blue"
      right-icon="plus/plus"
      @click.native="addAppointment"
    >
      Добавить запись
    </UiButton>

    <div class="schedule-sidebar__divider" />

    <Queue
      class="schedule-sidebar__queqe"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { formatDate } from '@/utils/date-time'

import Calendar from '@/components/Calendar/Calendar.vue'

import Queue from '../Queue/Queue.vue'

@Component({
  components: {
    Queue,
    Calendar
  }
})
export default class Sidebar extends Vue {
  get date () {
    return new Date(this.$store.state.calendar.date) as Date
  }

  set date (val) {
    const date = formatDate(val, 'YYYY-MM-DD')

    this.$router.replace({
      query: { date }
    })

    this.$store.commit('calendar/SET_DATE', date)
    this.$store.dispatch('calendar/fetch')
  }

  addAppointment () {
    this.$store.dispatch('popup/show', 'appointment-new')
  }
}
</script>

<style lang="scss">
  .schedule-sidebar {
    // @include ui-scrollbar;
    @include hide-scrollbar;

    padding: 16px 12px;
    overflow-y: auto;
    background-color: $ui-white;
    border-right: 1px solid $ui-black-20;
    border-left: 1px solid $ui-black-20;

    &__add-appointment {
      width: 100%;
    }

    &__queqe {
      min-height: 400px;
    }

    &__divider {
      height: 1px;
      margin: 16px 0;
      background: rgba(#8f92a1, 0.2);
    }
  }
</style>
