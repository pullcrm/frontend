<script lang="ts" setup>
import { formatDate } from '~/utils/date-time'
import { pluralize } from '~/utils/pluralize'
import { formatMoney } from '~/utils/money'
import { COMPLETED } from '~/constants/appointment'
import dayjs from '~/utils/dayjs'

const props = defineProps({
  appointments: {
    type: Array,
    default: () => [],
  },
})

const scheduleStore = useScheduleStore()

const date = computed<Date>({
  get() {
    return new Date(scheduleStore.date) as Date
  },

  async set(val) {
    const date = dayjs(val).format('YYYY-MM-DD')

    scheduleStore.date = date

    await scheduleStore.fetch()
  },
})

const isToday = computed(() => {
  return dayjs(date.value).isToday()
})

const appointmentsCount = computed(() => {
  return props.appointments.length
})

const money = computed(() => {
  return props.appointments
    .filter(({ status }: any) => status === COMPLETED)
    .reduce((sum, { total }: any) => (sum + total), 0)
})

function setDateTomorrow() {
  date.value = dayjs(new Date()).add(1, 'day').toDate()
}
</script>

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
          {{ formatDate(date, 'D MMMM, dd') }}
        </UiButton>

        <template #body>
          <DatePicker
            v-model="date"
          />
        </template>
      </UiPopover>

      <UiButton
        v-if="isToday"
        class="specialist-schedule-page-header__tomorrow"
        size="m"
        theme="transparent"
        @click="setDateTomorrow"
      >
        Завтра
      </UiButton>

      <UiButton
        v-else
        class="specialist-schedule-page-header__today"
        size="m"
        theme="transparent"
        @click="date = new Date()"
      >
        Сьогодні
      </UiButton>
    </div>

    <div class="specialist-schedule-page-header__right">
      {{ appointmentsCount }}
      {{ pluralize(appointmentsCount, 'клієнт', 'клієнта', 'клієнтів') }}
      <span> - </span>
      {{ formatMoney(money) }}
    </div>
  </div>
</template>

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
