<template>
  <div class="specialist-schedule-page-header">
    <div class="specialist-schedule-page-header__left">
      <UiPopover
        size="m"
        placement="bottom_start"
      >
        <UiButton
          class="specialist-schedule-page-header__calendar"
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
        class="specialist-schedule-page-header__tomorrow"
        size="m"
        theme="transparent"
        @click.native="setDateTomorrow"
      >
        Завтра
      </UiButton>

      <UiButton
        v-else
        class="specialist-schedule-page-header__today"
        size="m"
        theme="transparent"
        @click.native="date = new Date()"
      >
        Сегодня
      </UiButton>
    </div>

    <div class="specialist-schedule-page-header__right">
      {{ appointmentsCount }}
      {{ appointmentsCount | pluralize('клиент', 'клиента', 'клиентов') }}
      <span> - </span>
      {{ money | price }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { COMPLETED } from '~/constants/appointment'

import dayjs from '~/utils/dayjs'

import DataPicker from '~/components/DatePicker/DatePicker.vue'

@Component({
  components: {
    DataPicker
  },

  props: {
    appointments: Array,
    default: () => []
  }
})
export default class Header extends Vue {
  readonly appointments

  get date () {
    return new Date(this.$typedStore.state.schedule.date) as Date
  }

  set date (val) {
    const date = dayjs(val).format('YYYY-MM-DD')

    this.$typedStore.commit('schedule/SET_DATE', date)
    this.$typedStore.dispatch('schedule/fetch')
  }

  get isToday () {
    return dayjs(this.date).isToday()
  }

  get appointmentsCount () {
    return this.appointments.length
  }

  get money () {
    return this.appointments
      .filter(({ status }) => status === COMPLETED)
      .reduce((sum, { total }) => (sum + total), 0)
  }

  setDateTomorrow () {
    this.date = dayjs(new Date()).add(1, 'day').toDate()
  }
}
</script>

<style lang="scss">
  .specialist-schedule-page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__right {
      color: $ui-black-60;
    }

    &__left {
      display: flex;

      .ui-button {
        margin-right: 8px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &__today,
    &__tomorrow {
      padding: 0 8px;
    }

    &__calendar {
      text-transform: capitalize;

      .ui-button__append {
        .ui-icon {
          width: 12px;
          height: 12px;
        }
      }
    }

    @include ui-mobile-only {
      &__tomorrow {
        display: none;
      }
    }
  }
</style>
