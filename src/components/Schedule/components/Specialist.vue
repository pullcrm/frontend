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
      :name="specialist.firstName"
      size="s"
      type="rounded"
    />

    <div class="schedule-column-specialist__info">
      <UiText
        class="schedule-column-specialist__name"
        size="s"
      >
        {{ specialist.firstName }} {{ specialist.lastName }}
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
      ref="dropdownMenu"
      placement="bottom-right"
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
          Редактировать
        </UiText>

        <UiText
          v-if="isClosedDay === false"
          size="m"
          left-icon="slash"
          @click.native="onCloseDay"
        >
          Закрыть запись <br> на этот день
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

  get status () {
    return this.specialist.approaches.status
  }

  get avatar () {
    return this.specialist.avatar?.path
  }

  get isClosedDay () {
    return this.$store.getters['calendar/isClosedDay'](this.specialist.id)
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

  async onCloseDay () {
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

  open () {
    this.$store.dispatch('popup/show', {
      name: 'specialist-edit',
      props: { user: this.specialist }
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

    .ui-icon {
      cursor: pointer;
    }
  }
</style>
