<template>
  <div
    class="schedule-calendar-header-specialist"
    :class="[
      `_status_${status}`
    ]"
  >
    <UiAvatar
      class="schedule-calendar-header-specialist__avatar"
      :image="avatar"
      :name="specialist.firstName"
      size="m"
      type="rounded"
    />

    <div class="schedule-calendar-header-specialist__info">
      <UiText
        class="schedule-calendar-header-specialist__name"
        size="s"
      >
        {{ specialist.firstName }} {{ specialist.lastName }}
      </UiText>

      <UiText
        class="schedule-calendar-header-specialist__total"
        size="s"
      >
        {{ appointmentsCount }}
        {{ appointmentsCount | pluralize('клиент', 'клиента', 'клиентов') }}
        <span> - </span>
        {{ money | price }}
      </UiText>
    </div>

    <UiDropdownMenu
      ref="dropdownMenu"
      placement="bottom-center"
    >
      <template #inner="{ open, close, isOpened }">
        <UiIcon
          size="s"
          name="more/vertical"
          @click.native="isOpened ? close() : open()"
        />
      </template>

      <UiDropdownGroup>
        <UiText
          size="m"
          left-icon="edit/edit-1"
          @click.native="open"
        >
          Редактировать информацию
        </UiText>

        <UiText
          v-if="isClosedDay === false"
          size="m"
          left-icon="slash"
          @click.native="closeDay"
        >
          Закрыть запись на этот день
        </UiText>
      </UiDropdownGroup>
    </UiDropdownMenu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiDropdownMenu from '@/ui/DropdownMenu/DropdownMenu.vue'

import { START_TIME_OF_DAY, END_TIME_OF_DAY } from '@/constants'

import { isCloseDay } from '@/logics/time-offs'

import { setTime } from '@/utils/date-time'

@Component({
  props: {
    specialist: {
      type: Object,
      required: true
    }
  }
})
export default class Specialist extends Vue {
  readonly specialist

  $refs: {
    dropdownMenu: UiDropdownMenu
  }

  get timeOffs () {
    return this.$store.state.calendar.timeOffs
  }

  get isClosedDay () {
    return this.timeOffs.some(timeOff => isCloseDay(timeOff) && timeOff.employeeId === this.specialist.id)
  }

  get avatar () {
    return this.specialist.avatar?.path
  }

  get status () {
    return this.specialist.approaches.status
  }

  get appointments () {
    return this.$store.state.calendar.appointments
      .filter(({ employee }) => employee.id === this.specialist.id)
  }

  get appointmentsCount () {
    return this.appointments.length
  }

  get money () {
    return this.appointments
      .filter(({ status }) => status === 'COMPLETED')
      .reduce((sum, { total }) => (sum + total), 0)
  }

  open () {
    this.$store.dispatch('popup/show', {
      name: 'specialist-edit',
      props: { user: this.specialist }
    })
  }

  async closeDay () {
    const date = new Date(this.$store.state.calendar.date)

    const endDateTime = setTime(date, END_TIME_OF_DAY).format('MM.DD.YY HH:mm')
    const startDateTime = setTime(date, START_TIME_OF_DAY).format('MM.DD.YY HH:mm')

    await this.$api.timeOff.create({
      employeeId: this.specialist.id,
      endDateTime,
      startDateTime
    })

    this.$refs.dropdownMenu.close()

    await this.$store.dispatch('calendar/fetchTimeOffs')
  }
}
</script>

<style lang="scss">
  .schedule-calendar-header-specialist {
    display: flex;
    align-items: center;
    width: $SCHEDULE_APPOINTMENT_WIDTH;
    padding: 16px 8px 16px 16px;
    background: $ui-white;
    border-right: 1px solid #e0e0e0;

    &._status_DASHBOARD {
      background: #fef0f0;
    }

    &__name {
      font-weight: 500;
    }

    &__total {
      color: $ui-black-80;
    }

    &__info {
      flex: 1;
      margin: 0 8px;
    }

    .ui-icon {
      cursor: pointer;
    }
  }
</style>
