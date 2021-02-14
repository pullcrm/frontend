<template>
  <div
    class="schedule-column-specialist"
    :class="[
      `_status_${status}`
    ]"
  >
    <UiAvatar
      class="schedule-column-specialist__avatar"
      :image="avatar"
      :name="user.firstName"
      size="s"
    />

    <div class="schedule-column-specialist__info">
      <UiText
        class="schedule-column-specialist__name"
        size="s"
      >
        {{ user.firstName }} {{ user.lastName }}
      </UiText>

      <UiText
        class="schedule-column-specialist__total"
        size="s"
      >
        {{ appointmentsCount }}
        {{ appointmentsCount | pluralize('клиент', 'клиента', 'клиентов') }}
        <span> - </span>
        {{ money | price }}
      </UiText>
    </div>

    <UiDropdownMenu
      placement="bottom_end"
    >
      <template #inner="{ toggle }">
        <UiIcon
          class="schedule-column-specialist__icon"
          size="m"
          name="outlined/dots-three-vertical"
          @click.native="toggle"
        />
      </template>

      <UiDropdownList>
        <UiDropdownItem
          size="m"
          left-icon="outlined/pencil"
          @click.native="openPopup"
        >
          Редактировать
        </UiDropdownItem>

        <UiDropdownItem
          v-if="isClosedDay === false"
          size="m"
          left-icon="outlined/prohibit"
          @click.native="onCloseDay"
        >
          Закрыть запись <br> на этот день
        </UiDropdownItem>
      </UiDropdownList>
    </UiDropdownMenu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { START_TIME_OF_DAY, END_TIME_OF_DAY } from '@/constants'

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

  get status () {
    return this.specialist.status
  }

  get user () {
    return this.specialist.user
  }

  get avatar () {
    return this.user.avatar?.path
  }

  get isClosedDay () {
    return this.$store.getters['schedule/isClosedDay'](this.specialist.id)
  }

  get appointments () {
    return this.$store.state.appointments.appointments
      .filter(({ specialist }) => specialist.id === this.specialist.id)
  }

  get appointmentsCount () {
    return this.appointments.length
  }

  get money () {
    return this.appointments
      .filter(({ status }) => status === 'COMPLETED')
      .reduce((sum, { total }) => (sum + total), 0)
  }

  async onCloseDay () {
    const date = new Date(this.$store.state.schedule.date)

    const endDateTime = setTime(date, END_TIME_OF_DAY).format('MM.DD.YY HH:mm')
    const startDateTime = setTime(date, START_TIME_OF_DAY).format('MM.DD.YY HH:mm')

    await this.$api.timeOff.create({
      specialistId: this.specialist.id,
      endDateTime,
      startDateTime
    })

    await this.$store.dispatch('schedule/fetchTimeOffs')
  }

  openPopup () {
    this.$store.dispatch('popup/show', {
      name: 'specialist-edit',
      props: { specialist: this.specialist }
    })
  }
}
</script>

<style lang="scss">
  .schedule-column-specialist {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 8px 16px 16px;
    background: $ui-white;

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

    &__icon {
      cursor: pointer;
    }
  }
</style>
