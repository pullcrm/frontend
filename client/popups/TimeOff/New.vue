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
      Закрити запис
    </UiTitle>

    <form @submit.prevent="submit">
      <UiFormValidator
        ref="formValidator"
        :validations="validations"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            label="Спеціаліст"
            required
            :error="getFieldError('specialist')"
          >
            <UiSelect
              v-model="form.specialist"
              :options="specialists"
              label-key="fullName"
              placeholder="Вибрати спеціаліста"
              :clearable="false"
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
              <DatePicker v-model="date" />
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
                  Закрити запис на весь день
                </UiText>
              </template>
            </UiSwitch>
          </UiField>

          <template
            v-if="isCloseDay === false"
          >
            <UiField
              label="Час початку"
              required
              :error="getFieldError('startTime')"
            >
              <UiSelect
                v-model="form.startTime"
                :options="workingHours"
                placeholder="Вибрати час початку"
                @input="resetFieldError('startTime')"
              />
            </UiField>

            <UiField
              label="Час закінчення"
              required
              :error="getFieldError('endTime')"
            >
              <UiSelect
                v-model="form.endTime"
                :options="workingHoursForTimeEnd"
                placeholder="Вибрати час закінчення"
                @input="resetFieldError('endTime')"
              />
            </UiField>
          </template>

          <UiField
            label="Короткий опис"
            :error="getFieldError('description')"
          >
            <UiInput
              v-model="form.description"
              tag="textarea"
              placeholder="Введіть опис"
              @input="resetFieldError('description')"
            />
          </UiField>

          <div class="time-off-new-popup__actions">
            <UiButton
              type="submit"
              size="l"
              theme="blue"
              :loading="isLoading"
            >
              Добавити
            </UiButton>
          </div>
        </template>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { setTime } from '~/utils/time'

import UiFormValidator, { Validations } from '~/ui/FormValidator.vue'

import DatePicker from '~/components/DatePicker/DatePicker.vue'

@Component({
  components: {
    DatePicker
  },

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

  isLoading = false

  isCloseDay = false

  form = {
    endTime: null,
    startTime: this.time,
    specialist: this.specialistId && this.specialists.find(({ id }) => id === this.specialistId),
    description: ''
  }

  date = new Date(this.$typedStore.state.schedule.date)

  $refs: {
    formValidator: UiFormValidator
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

  get validations (): Validations {
    return {
      specialist: {
        rules: 'required',
        messages: {
          required: 'Виберіть спеціаліста'
        }
      },

      startTime: !this.isCloseDay && {
        rules: 'required',
        messages: {
          required: 'Вкажіть час початку'
        }
      },

      endTime: !this.isCloseDay && {
        rules: 'required',
        messages: {
          required: 'Вкажіть час завершения'
        }
      },

      description: {
        rules: 'max:255',
        messages: {
          max: 'Максимальна кількість символів: 255'
        }
      }
    }
  }

  get specialists () {
    return this.$typedStore.state.specialists.specialists
  }

  async submit () {
    const isValid = await this.validate()

    if (!isValid) return

    try {
      this.isLoading = true

      const endDateTime = setTime(this.date, this.form.endTime).format('YYYY-MM-DD HH:mm:ss')
      const startDateTime = setTime(this.date, this.form.startTime).format('YYYY-MM-DD HH:mm:ss')

      await this.$api.timeOff.create({
        specialistId: this.form.specialist.id,
        endDateTime,
        startDateTime,
        description: this.form.description
      })

      await this.$typedStore.dispatch('schedule/fetchTimeOffs')

      this.close()
    } finally {
      this.isLoading = false
    }
  }

  validate () {
    return this.$refs.formValidator.validate(this.form)
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
