<template>
  <div class="appointment-popup">
    <AppointmentHeader
      class="appointment-popup__header"
      type="new"
      :status="form.status"
      :is-queue.sync="form.isQueue"
    />

    <form @submit.prevent="submit">
      <UiFormValidator
        v-slot="{ resetFieldError }"
        ref="formValidator"
        :validations="validations"
      >
        <AppointmentClientSimple
          v-model="form.fullName"
        />

        <AppointmentSpecialistSelect
          class="appointment-popup__specialist"
          :options="specialists"
          :specialist.sync="form.specialist"
          @resetFieldError="resetFieldError"
        />

        <AppointmentProceduresSelect
          class="appointment-popup__procedures"
          :total.sync="form.total"
          :options="procedures"
          :procedures.sync="form.procedures"
          @resetFieldError="resetFieldError"
        />

        <AppointmentDateTime
          v-if="form.isQueue === false"
          class="appointment-popup__date-time"
          :date.sync="form.date"
          :duration="duration"
          :start-at.sync="form.startTime"
          :working-hours="workingHours"
          @resetFieldError="resetFieldError"
        />

        <UiField
          class="appointment-popup__comment"
          label="Комментарий"
        >
          <UiInput
            v-model="form.description"
            tag="textarea"
            placeholder="Введите текст"
            @input="resetFieldError('description')"
          />
        </UiField>

        <AppointmentNotify
          v-if="isSmsAuthorize"
          class="appointment-popup__notify"
          type="new"
          :has-remind-sms.sync="form.hasRemindSMS"
          :has-creation-sms.sync="form.hasCreationSMS"
        />

        <AppointmentAdditionalSettings
          class="appointment-popup__additional-settings"
          type="new"
          :source.sync="form.source"
          :status.sync="form.status"
        />
      </UiFormValidator>

      <div class="appointment-popup__actions">
        <UiButton
          type="submit"
          size="l"
          theme="blue"
          :loading="isLoading"
        >
          Добавить запись
        </UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SOURCE_DASHBOARD } from '@/constants'
import { IN_PROGRESS } from '@/constants/appointment'

import { getProceduresDuration } from '@/logics/appointment'

import { toDate } from '@/utils/date-time'

import AppointmentHeader from './components/Header.vue'
import AppointmentNotify from './components/Notify.vue'
import AppointmentDateTime from './components/DateTime.vue'
import AppointmentClientSimple from './components/ClientSimple.vue'
import AppointmentSpecialistSelect from './components/SpecialistSelect.vue'
import AppointmentProceduresSelect from './components/ProceduresSelect.vue'
import AppointmentAdditionalSettings from './components/AdditionalSettings.vue'

@Component({
  components: {
    AppointmentHeader,
    AppointmentNotify,
    AppointmentDateTime,
    AppointmentClientSimple,
    AppointmentSpecialistSelect,
    AppointmentProceduresSelect,
    AppointmentAdditionalSettings
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
    phone: '0',
    source: SOURCE_DASHBOARD,
    status: IN_PROGRESS,
    isQueue: this.isQueue,
    fullName: '',
    startTime: this.time,
    specialist: this.specialistId && this.specialists.find(({ id }) => id === this.specialistId),
    procedures: [],
    description: '',
    hasRemindSMS: this.$store.getters['sms/settings']?.hasRemindSMS,
    hasCreationSMS: this.$store.getters['sms/settings']?.hasCreationSMS
  }

  get isSmsAuthorize () {
    return this.$store.getters['sms/isAuthorize']
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

    return getProceduresDuration({ procedures })
  }

  mounted () {
    this.fetchAvailableTime()
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
