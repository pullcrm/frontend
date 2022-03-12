<template>
  <div class="timetable-settings-page-day">
    <UiSwitch
      :value="opened"
      size="m"
      class="timetable-settings-page-day__switch"
      @input="onUpdate('opened', $event)"
    >
      <template #append>
        <UiText
          size="l"
          responsive
        >
          {{ day }}
        </UiText>
      </template>
    </UiSwitch>

    <div class="timetable-settings-page-day__selectors">
      <UiSelect
        :value="from"
        :options="timeOptions"
        required
        :disabled="!opened"
        placeholder="Час відкриття"
        class="timetable-settings-page-day__select"
        @input="onUpdate('from', $event)"
      />

      <UiText
        size="l"
        responsive
        class="timetable-settings-page-day__text"
      >
        до
      </UiText>

      <UiSelect
        :value="to"
        :options="timeOptions"
        required
        :disabled="!opened"
        placeholder="Час закриття"
        class="timetable-settings-page-day__select"
        @input="onUpdate('to', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { getWorkingHours } from '~/utils/time'

import { getLocaleDayByAlias } from '~/logics/date'

@Component({
  props: {
    from: {
      type: String,
      required: true
    },

    to: {
      type: String,
      required: true
    },

    opened: {
      type: Boolean,
      required: true
    },

    dayAlias: {
      type: String,
      required: true
    }
  }
})
export default class Day extends Vue {
  readonly to!: string
  readonly from!: string
  readonly opened!: Boolean
  readonly dayAlias!: string

  get day () {
    return getLocaleDayByAlias(this.dayAlias)
  }

  get timeOptions () {
    return getWorkingHours('07:00', '23:00')
  }

  async onUpdate (key, value) {
    try {
      this.$typedStore.commit('SET_LOADING', true)

      const options = {
        opened: this.opened,
        from: this.from,
        to: this.to
      }

      options[key] = String(value)

      await this.$api.timetable.update({
        [this.dayAlias]: Object.values(options).join(';')
      })

      await this.$typedStore.dispatch('timetable/fetch')
    } finally {
      this.$typedStore.commit('SET_LOADING', false)
    }
  }
}
</script>

<style lang="scss" src="./Day.scss"></style>
