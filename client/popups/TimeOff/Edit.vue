<template>
  <UiPopup
    class="time-off-edit-popup"
    @close="$emit('close')"
  >
    <UiBack
      @back="$emit('close')"
    />

    <UiTitle
      class="time-off-edit-popup__title"
      size="s"
    >
      Изменить
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
          class="time-off-edit-popup__popover"
          size="m"
          placement="bottom_start"
        >
          <UiField label="Дата">
            <UiInput
              :value="date | formatDate('D MMMM')"
              readonly
              left-icon="outlined/pencil"
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

        <div class="time-off-edit-popup__actions">
          <UiButton
            type="submit"
            size="l"
            theme="blue"
          >
            Сохранить
          </UiButton>

          <UiButton
            size="l"
            theme="danger-outlined"
            @click.native="remove"
          >
            Удалить
          </UiButton>
        </div>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { toDate } from '~/utils/date-time'
import { setTime } from '~/utils/time'

import { isCloseDay } from '~/logics/time-offs'

@Component({
  props: {
    timeOff: {
      type: Object,
      required: true
    },

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
export default class TimeOffEdit extends Vue {
  readonly timeOff

  isCloseDay = false

  form = {
    id: null,
    endTime: null,
    specialist: null,
    startTime: null,
    description: ''
  }

  date = new Date()

  constructor () {
    super()

    const {
      id,
      endTime,
      startTime,
      endDateTime,
      specialistId,
      startDateTime,
      description
    } = this.timeOff

    this.form.id = id
    this.form.endTime = endTime
    this.form.startTime = startTime
    this.form.description = description

    this.date = toDate(startDateTime).toDate()

    this.form.specialist = this.specialists.find(({ id }) => id === specialistId)

    this.isCloseDay = isCloseDay({ startDateTime, endDateTime })
  }

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

    await this.$api.timeOff.update(this.form.id, {
      specialistId: this.form.specialist.id,
      endDateTime,
      startDateTime,
      description: this.form.description
    })

    this.close()

    await this.$typedStore.dispatch('schedule/fetchTimeOffs')
  }

  async remove () {
    await this.$api.timeOff.delete(this.form.id)
    await this.$typedStore.dispatch('schedule/fetchTimeOffs')

    this.$typedStore.dispatch('toasts/show', { title: 'Удалено!' })

    this.close()
  }

  async close () {
    this.$emit('close')
  }
}
</script>

<style lang="scss">
  .time-off-edit-popup {
    &__title {
      margin-top: 8px;
      margin-bottom: 24px;
    }

    &__actions {
      margin-top: 24px;

      .ui-button {
        width: 100%;

        &:last-child {
          margin-top: 16px;
        }
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
