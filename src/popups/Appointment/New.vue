<template>
  <UiPopup
    class="appointment-new"
    @close="$emit('close')"
  >
    <form @submit.prevent="submit">
      <Tags
        class="appointment-new__tags"
        :queue.sync="form.isQueue"
        :sms-remind-notify.sync="form.smsRemindNotify"
        :sms-creation-notify.sync="form.smsCreationNotify"
        is-create
      />

      <UiTitle
        class="appointment-new__title"
        size="s"
      >
        Добавить запись
      </UiTitle>

      <UiFormValidator
        v-slot="{ resetFieldError }"
        ref="formValidator"
        class="appointment-new-fields"
        :validations="validations"
      >
        <UiField
          label="Телефон"
        >
          <UiInput
            v-model="form.phone"
            mask="38 (###) #### ###"
            placeholder="Введите ваш номер телефона"
            required
            @input="resetFieldError('name')"
          />
        </UiField>

        <UiField
          label="Имя и фамилия"
        >
          <UiInput
            v-model="form.fullName"
            placeholder="Василь Петрович"
            required
            @input="resetFieldError('name')"
          />
        </UiField>

        <UiField
          label="Сотрудник"
        >
          <UiSelect
            v-model="form.specialist"
            :options="specialists"
            label="fullName"
            placeholder="Выбрать исполнителя"
            :clearable="false"
            required
            @input="resetFieldError('specialist')"
          />
        </UiField>

        <UiField
          label="Список услуг"
        >
          <UiSelect
            v-model="form.procedures"
            :options="procedures"
            label="name"
            placeholder="Выбрать услуги"
            multiple
            required
            @input="resetFieldError('procedures'), calculateTotal()"
          />
        </UiField>

        <UiField
          v-if="form.isQueue === false"
          label="Время начала"
        >
          <UiSelect
            v-model="form.startTime"
            label=""
            :options="workingHours"
            placeholder="Выбрать время начала"
            @input="resetFieldError('timeStart')"
          />
        </UiField>

        <UiField
          label="Дополнительная информация"
        >
          <UiInput
            v-model="form.description"
            tag="textarea"
            placeholder="Введите текст"
            @input="resetFieldError('description')"
          />
        </UiField>
      </UiFormValidator>

      <Total
        :date.sync="form.date"
        :total.sync="form.total"
        :start-time.sync="form.startTime"
        :procedures="form.procedures || []"
      />

      <UiButton
        class="appointment-new__button"
        type="submit"
        size="l"
        theme="blue"
        :loading="isLoading"
      >
        Добавить запись
      </UiButton>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { toDate } from '@/utils/date-time'

import Tags from './components/Tags.vue'
import Total from './components/Total.vue'

@Component({
  components: {
    Tags,
    Total
  },

  props: {
    specialistId: {
      type: Number,
      default: null
    },

    time: {
      type: String,
      default: null
    },

    isQueue: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    async duration () {
      await this.fetchAvailableTime()

      this.checkStartTime()
    },

    async specialist () {
      await this.fetchAvailableTime()

      this.checkStartTime()
    },

    async date () {
      await this.fetchAvailableTime()

      this.checkStartTime()
    }
  }
})
export default class AppointmentNew extends Vue {
  readonly time?: string
  readonly isQueue?: boolean
  readonly specialistId?: number

  isLoading = false
  workingHours = []

  form = {
    date: toDate(this.$store.state.schedule.date),
    total: 0,
    phone: '',
    isQueue: this.isQueue,
    fullName: '',
    startTime: this.time,
    specialist: this.specialistId && this.specialists.find(({ id }) => id === this.specialistId),
    procedures: [],
    description: '',
    smsCreationNotify: this.$store.getters['sms/settings']?.remindAfterCreation,
    smsRemindNotify: this.$store.getters['sms/settings']?.remindBefore
  }

  get validations () {
    return {}
  }

  get specialists () {
    return this.$store.state.specialists.specialists
  }

  get procedures () {
    return this.$store.state.procedures.procedures
  }

  get date () {
    return this.form.date
  }

  get specialist () {
    return this.form.specialist
  }

  get duration () {
    const procedures = this.form.procedures || []

    return procedures.reduce((result, procedure) => {
      return result + procedure.duration
    }, 0)
  }

  mounted () {
    this.fetchAvailableTime()
  }

  calculateTotal () {
    const procedures = this.form.procedures || []

    this.form.total = procedures.reduce((sum, { price }) => (sum + price), 0) ?? 0
  }

  async submit () {
    try {
      this.isLoading = true

      await this.$store.dispatch('appointments/create', this.form)
      await this.$store.dispatch('schedule/fetch')

      this.$store.dispatch('popup/hide')
    } finally {
      this.isLoading = false
    }
  }

  async fetchAvailableTime () {
    this.workingHours = []

    if (!this.form.specialist?.id || this.duration === 0) {
      return
    }

    this.workingHours = await this.$api.appointments.availableTime({
      date: this.form.date.format('YYYY-MM-DD'),
      specialistId: this.form.specialist.id,
      duration: this.duration
    })
  }

  checkStartTime () {
    const startTimeIndex = this.workingHours.indexOf(this.form.startTime)

    if (startTimeIndex === -1) {
      this.form.startTime = null
    }
  }
}
</script>

<style lang="scss">
  .appointment-new {
    &__tags {
      margin-bottom: 16px;
    }

    &__title {
      margin-bottom: 24px;
    }

    &__button {
      width: 100%;
      margin-top: 16px;
    }

    .ui-field + .ui-field {
      margin-top: 24px;
    }
  }
</style>
