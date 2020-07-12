<template>
  <UiPopup
    class="appointment-edit"
    @close="$emit('close')"
  >
    <form @submit.prevent="submit">
      <Tags
        class="appointment-edit__tags"
        :queue.sync="form.isQueue"
        :status.sync="form.status"
        :sms-remind-notify.sync="form.smsRemindNotify"
      />

      <UiTitle
        class="appointment-edit__title"
        size="s"
      >
        Редактировать запись
      </UiTitle>

      <UiFormValidator
        v-slot="{ resetFieldError }"
        ref="formValidator"
        class="appointment-edit-fields"
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
            disabled
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
            placeholder="Выбрать время"
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

      <div
        class="appointment-edit__actions"
      >
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
    appointment: {
      type: Object,
      required: true
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
export default class AppointmentEdit extends Vue {
  readonly appointment

  workingHours = []

  form = {
    ...this.appointment,
    date: toDate(this.appointment.date),
    employee: this.specialists.find(({ id }) => id === this.appointment.employee.id),
    smsRemindNotify: Boolean(this.appointment.smsIdentifier)
  }

  get validations () {
    return {}
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
    await this.$store.dispatch('appointment/update', this.form)
    await this.$store.dispatch('calendar/fetch')

    this.$store.dispatch('popup/hide')
  }

  async remove () {
    const { smsIdentifier, phone } = this.form

    const result = await this.$store.dispatch('popup/askQuestion', {
      title: 'Вы действительно хотите удалить эту запись?',
      acceptButtonTitle: 'Удалить'
    })

    if (result) {
      await Promise.all([
        this.$api.appointments.remove(this.form.id),
        smsIdentifier && this.$store.dispatch('sms/remove', {
          id: smsIdentifier,
          phone
        })
      ])

      await this.$store.dispatch('calendar/fetch')

      this.$store.dispatch('popup/hide')
    }
  }

  async fetchSlots () {
    this.workingHours = []

    if (!this.form.employee?.id) {
      return
    }

    const slots = await this.$api.appointments.slots({
      date: this.form.date.format('YYYY-MM-DD'),
      excludeId: this.form.id,
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
  .appointment-edit {
    &__tags {
      margin-bottom: 16px;
    }

    &__title {
      margin-bottom: 24px;
    }

    &__actions {
      display: flex;
      flex-direction: column;

      .ui-button {
        margin-top: 16px;
      }
    }
  }
</style>
