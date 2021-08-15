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
      :name="user.fullName"
      size="s"
    />

    <div class="schedule-column-specialist__info">
      <UiText
        class="schedule-column-specialist__name"
        size="s"
      >
        {{ user.fullName }}
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
      <template #inner>
        <UiIcon
          class="schedule-column-specialist__icon"
          size="s"
          name="outlined/dots-three-vertical"
        />
      </template>

      <UiDropdownList>
        <UiText
          tag="a"
          href="#"
          size="m"
          left-icon="outlined/pencil"
          @click.native.prevent="edit"
        >
          Редактировать
        </UiText>

        <UiText
          v-if="isClosedDay === false"
          tag="a"
          href="#"
          size="m"
          left-icon="outlined/prohibit"
          @click.native.prevent="onCloseDay"
        >
          Закрыть запись <br> на этот день
        </UiText>
      </UiDropdownList>
    </UiDropdownMenu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { COMPLETED } from '~/constants/appointment'

import { setTime } from '~/utils/time'

import { isCloseDay } from '~/logics/time-offs'

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

  get timeOffs () {
    return this.$typedStore.state.schedule.timeOffs
  }

  get timeWork () {
    return this.$typedStore.getters['timetable/timeWork']
  }

  get isClosedDay () {
    return this.timeOffs.some(timeOff => {
      if (timeOff.specialistId !== this.specialist.id) {
        return false
      }

      return isCloseDay(timeOff, this.timeWork)
    })
  }

  get appointments () {
    return this.$typedStore.state.appointments.appointments
      .filter(({ specialist }) => specialist.id === this.specialist.id)
  }

  get appointmentsCount () {
    return this.appointments.length
  }

  get money () {
    return this.appointments
      .filter(({ status }) => status === COMPLETED)
      .reduce((sum, { total }) => (sum + total), 0)
  }

  async onCloseDay () {
    const { from, to } = this.timeWork

    const date = new Date(this.$typedStore.state.schedule.date)

    const startDateTime = setTime(date, from).format('MM.DD.YY HH:mm')
    const endDateTime = setTime(date, to).format('MM.DD.YY HH:mm')

    await this.$api.timeOff.create({
      specialistId: this.specialist.id,
      endDateTime,
      startDateTime,
      description: ''
    })

    await this.$typedStore.dispatch('schedule/fetchTimeOffs')
  }

  async edit () {
    await this.$router.push({
      name: 'specialistInfo',
      params: {
        slug: this.specialist.id
      }
    })
  }
}
</script>

<style lang="scss">
  .schedule-column-specialist {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
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
