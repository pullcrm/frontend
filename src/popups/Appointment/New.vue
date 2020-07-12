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
            v-model="form.employee"
            :options="specialists"
            label="fullName"
            placeholder="Выбрать исполнителя"
            :clearable="false"
            required
            @input="resetFieldError('employee')"
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
      >
        Добавить запись
      </UiButton>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { getHoursSlots } from '@/logics/appointment'

import { toDate } from '@/utils/date-time'

import Tags from './components/Tags.vue'
import Total from './components/Total.vue'

@Component({
  components: {
    Tags,
    Total
  },

  props: {
    employeeId: {
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
      await this.fetchSlots()

      this.checkStartTime()
    },

    async specialist () {
      await this.fetchSlots()

      this.checkStartTime()
    },

    async date () {
      await this.fetchSlots()

      this.checkStartTime()
    }
  }
})
export default class AppointmentNew extends Vue {
  readonly time?: string
  readonly isQueue?: boolean
  readonly employeeId?: number

  workingHours = []

  form = {
    date: toDate(this.$store.state.calendar.date),
    total: 0,
    phone: '',
    isQueue: this.isQueue,
    fullName: '',
    employee: this.employeeId && this.specialists.find(({ id }) => id === this.employeeId),
    startTime: this.time,
    procedures: [],
    description: '',
    smsCreationNotify: (
      this.hasSMSAuthorize && this.$store.state.sms.settings.remindAfterCreation
    ),
    smsRemindNotify: (
      this.hasSMSAuthorize && this.$store.state.sms.settings.remindBeforeTime
    )
  }

  get validations () {
    return {}
  }

  get hasSMSAuthorize () {
    return this.$store.getters['sms/hasSMSAuthorize']
  }

  get specialists () {
    return this.$store.state.employee.specialists
  }

  get procedures () {
    return this.$store.state.procedures.procedures
  }

  get date () {
    return this.form.date
  }

  get specialist () {
    return this.form.employee
  }

  get duration () {
    const procedures = this.form.procedures || []

    return procedures.reduce((result, procedure) => {
      return result + procedure.duration
    }, 0)
  }

  mounted () {
    this.fetchSlots()
  }

  calculateTotal () {
    const procedures = this.form.procedures || []

    this.form.total = procedures.reduce((sum, { price }) => (sum + price), 0) ?? 0
  }

  async submit () {
    await this.$store.dispatch('appointment/create', this.form)
    await this.$store.dispatch('calendar/fetch')

    this.$store.dispatch('popup/hide')
  }

  async fetchSlots () {
    this.workingHours = []

    if (!this.form.employee?.id) {
      return
    }

    const slots = await this.$api.appointments.slots({
      date: this.form.date.format('YYYY-MM-DD'),
      employeeId: this.form.employee.id
    })

    this.workingHours = getHoursSlots(slots, {
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
  }
</style>
