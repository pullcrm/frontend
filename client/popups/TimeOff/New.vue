<template>
  <UiPopup
    class="time-off-new-popup"
    @close="$emit('close')"
  >
    <UiBack
      @back="$emit('close')"
    />

    <UiTitle
      class="time-off-new-popup__title"
      size="s"
    >
      Закрыть запись
    </UiTitle>

    <form @submit.prevent="submit">
      <UiFormValidator
        v-slot="{ resetFieldError }"
        ref="formValidator"
        :validations="validations"
      >
        <UiField
          label="Сотрудник"
        >
          <UiSelect
            v-model="form.specialist"
            :options="specialists"
            label-key="fullName"
            placeholder="Выбрать сотрудника"
            :clearable="false"
            required
            @input="resetFieldError('specialist')"
          />
        </UiField>

        <UiPopover
          class="time-off-new-popup__popover"
          size="m"
          placement="bottom_start"
        >
          <UiField label="Дата">
            <UiInput
              :value="date | formatDate('D MMMM')"
              readonly
              left-icon="outlined/calendar-blank"
            />
          </UiField>

          <template #body>
            <UiCalendar v-model="date" />
          </template>
        </UiPopover>

        <UiField>
          <UiSwitch
            v-model="isCloseDay"
            size="m"
          >
            <template #append>
              <UiText
                size="m"
              >
                Закрыть запись на целый день
              </UiText>
            </template>
          </UiSwitch>
        </UiField>

        <template
          v-if="isCloseDay === false"
        >
          <UiField
            label="Время начала"
          >
            <UiSelect
              v-model="form.startTime"
              :options="workingHours"
              required
              placeholder="Выбрать время начала"
              @input="resetFieldError('timeStart')"
            />
          </UiField>

          <UiField
            label="Время конца"
          >
            <UiSelect
              v-model="form.endTime"
              :options="workingHoursForTimeEnd"
              required
              placeholder="Выбрать время конца"
              @input="resetFieldError('endTime')"
            />
          </UiField>
        </template>

        <UiField
          label="Краткое описание"
        >
          <UiInput
            v-model="form.description"
            tag="textarea"
            placeholder="Введите описание"
            @input="resetFieldError('description')"
          />
        </UiField>

        <div class="time-off-new-popup__actions">
          <UiButton
            type="submit"
            size="l"
            theme="blue"
          >
            Добавить
          </UiButton>
        </div>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { setTime } from '~/utils/time'

@Component({
  props: {
    specialistId: {
      type: Number,
      default: null
    },

    time: {
      type: String,
      default: null
    }
  },

  watch: {
    isCloseDay (value) {
      if (value) {
        this.form.endTime = this.workingHours[this.workingHours.length - 1]
        this.form.startTime = this.workingHours[0]
      }
    }
  }
})
export default class TimeOffNew extends Vue {
  readonly time!: string | null
  readonly specialistId!: number | null

  isCloseDay = false

  form = {
    endTime: null,
    startTime: this.time,
    specialist: this.specialistId && this.specialists.find(({ id }) => id === this.specialistId),
    description: ''
  }

  date = new Date(this.$typedStore.state.schedule.date)

  get workingHours () {
    return this.$typedStore.getters['timetable/workingHours']
  }

  get workingHoursForTimeEnd () {
    if (!this.form.startTime) return []

    const startTimeIndex = this.workingHours.indexOf(this.form.startTime)

    return this.workingHours.filter((_time, index) => {
      return startTimeIndex < index
    })
  }

  get validations () {
    return {}
  }

  get specialists () {
    return this.$typedStore.state.specialists.specialists
  }

  async submit () {
    const endDateTime = setTime(this.date, this.form.endTime).format('MM.DD.YY HH:mm')
    const startDateTime = setTime(this.date, this.form.startTime).format('MM.DD.YY HH:mm')

    await this.$api.timeOff.create({
      specialistId: this.form.specialist.id,
      endDateTime,
      startDateTime,
      description: this.form.description
    })

    this.close()

    await this.$typedStore.dispatch('schedule/fetchTimeOffs')
  }

  async close () {
    this.$emit('close')
  }
}
</script>

<style lang="scss">
  .time-off-new-popup {
    &__title {
      margin-top: 8px;
      margin-bottom: 24px;
    }

    &__actions {
      margin-top: 24px;

      .ui-button {
        width: 100%;
      }
    }

    &__popover {
      margin: 24px 0;
    }

    .ui-field + .ui-field {
      margin-top: 20px;
    }
  }
</style>
