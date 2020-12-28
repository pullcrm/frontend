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
        <!-- <UiField
          label="Краткое описание"
        >
          <UiInput
            v-model="form.name"
            required
            left-icon="edit/edit-1"
            placeholder="Введите описание"
            @input="resetFieldError('name')"
          />
        </UiField> -->

        <UiField
          label="Сотрудник"
        >
          <UiSelect
            v-model="form.employee"
            :options="specialists"
            label="fullName"
            placeholder="Выбрать сотрудника"
            :clearable="false"
            required
            @input="resetFieldError('employee')"
          />
        </UiField>

        <UiPopover
          class="time-off-new-popup__popover"
          size="s"
          placement="top-center"
        >
          <template #default="{ open, close, isOpened }">
            <UiField
              label="Дата"
              @click.native.prevent="isOpened ? close() : open()"
            >
              <UiInput
                :value="date | formatDate('D MMMM')"
                readonly
                left-icon="edit/edit-1"
              />
            </UiField>
          </template>

          <template #body>
            <Calendar
              v-model="date"
              class="schedule-sidebar__calendar"
            />
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
              label=""
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
              label=""
              :options="workingHoursForTimeEnd"
              required
              placeholder="Выбрать время конца"
              @input="resetFieldError('endTime')"
            />
          </UiField>
        </template>

        <div class="time-off-new-popup__actions">
          <UiButton
            type="submit"
            size="l"
            theme="yellow"
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

import { setTime } from '@/utils/date-time'

import Calendar from '@/components/Calendar/Calendar.vue'

@Component({
  components: {
    Calendar
  },

  props: {
    employeeId: {
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
  readonly time?: string
  readonly employeeId?: number

  isCloseDay = false

  form = {
    endTime: null,
    employee: this.employeeId && this.specialists.find(({ id }) => id === this.employeeId),
    startTime: this.time
  }

  date = new Date(this.$store.state.schedule.date)

  get workingHours () {
    return this.$time.workingHours
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
    return this.$store.state.employee.specialists
  }

  async submit () {
    const endDateTime = setTime(this.date, this.form.endTime).format('MM.DD.YY HH:mm')
    const startDateTime = setTime(this.date, this.form.startTime).format('MM.DD.YY HH:mm')

    await this.$api.timeOff.create({
      employeeId: this.form.employee.id,
      endDateTime,
      startDateTime
    })

    this.close()

    await this.$store.dispatch('schedule/fetchTimeOffs')
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
  }
</style>
