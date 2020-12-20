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

    <UiIcon
      class="schedule-column-specialist__icon"
      size="s"
      name="more/vertical"
      @click.native="popperMenuOpen"
    />

    <SpecialistPopper
      ref="specialistPopper"
      :specialist="specialist"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import SpecialistPopper from './SpecialistPopper.vue'

@Component({
  props: {
    specialist: {
      type: Object,
      required: true
    }
  },

  components: {
    SpecialistPopper
  }
})
export default class Specialist extends Vue {
  readonly specialist

  $refs: {
    specialistPopper: SpecialistPopper
  }

  get status () {
    return this.specialist.approaches.status
  }

  get avatar () {
    return this.specialist.avatar?.path
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

  popperMenuOpen () {
    const reference = this.$el.querySelector('.schedule-column-specialist__icon') as HTMLElement

    this.$refs.specialistPopper.toggle(reference)
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
