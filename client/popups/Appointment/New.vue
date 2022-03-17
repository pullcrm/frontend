<template>
  <div class="appointment-popup__inner">
    <AppointmentHeader
      class="appointment-popup__header"
      title="Новий запис"
      :status.sync="form.status"
    />

    <form @submit.prevent="submit">
      <UiFormValidator
        v-slot="{ resetFieldError }"
        ref="formValidator"
        :validations="validations"
      >
        <AppointmentClientSimple
          :name.sync="form.fullName"
          :phone.sync="form.phone"
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

        <UiSwitch
          v-model="form.isQueue"
          size="m"
          class="appointment-popup__queue"
        >
          <template #append>
            <UiText
              size="m"
              responsive
            >
              Добавити в чергу
            </UiText>
          </template>
        </UiSwitch>

        <AppointmentDateTime
          v-if="form.isQueue === false"
          class="appointment-popup__date-time"
          :date.sync="form.date"
          :duration="duration"
          :start-at.sync="form.startTime"
          :available-hours="availableHours"
          @resetFieldError="resetFieldError"
        />

        <UiField
          class="appointment-popup__comment"
          label="Коментар"
        >
          <UiInput
            v-model="form.description"
            tag="textarea"
            placeholder="Введіть текст"
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
        />
      </UiFormValidator>

      <div
        id="popup-actions"
        class="appointment-popup__actions"
      >
        <UiButton
          type="submit"
          size="m"
          theme="blue"
          :loading="isLoading"
        >
          Добавити запис
        </UiButton>
      </div>

      <FixedPanel
        :treshold="0.25"
        show-when-invisible="#popup-actions"
        class="appointment-popup__fixed-button"
      >
        <UiContainer narrow>
          <UiButton
            type="submit"
            size="m"
            theme="blue"
            :loading="isLoading"
          >
            Добавити запис
          </UiButton>
        </UiContainer>
      </FixedPanel>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SOURCE_DASHBOARD } from '~/constants'

import { IN_PROGRESS } from '~/constants/appointment'

import { toDate } from '~/utils/date-time'

import { getProceduresDuration } from '~/logics/appointment'

import FixedPanel from '~/components/FixedPanel/FixedPanel.vue'

import AppointmentHeader from './components/Header.vue'
import AppointmentNotify from './components/Notify.vue'
import AppointmentDateTime from './components/DateTime.vue'
import AppointmentClientSimple from './components/ClientSimple.vue'
import AppointmentSpecialistSelect from './components/SpecialistSelect.vue'
import AppointmentProceduresSelect from './components/ProceduresSelect.vue'
import AppointmentAdditionalSettings from './components/AdditionalSettings.vue'

@Component({
  components: {
    FixedPanel,
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
  readonly time!: string | null
  readonly isQueue!: boolean
  readonly specialistId!: number | null

  isLoading = false
  availableHours = []

  form = {
    date: toDate(this.$typedStore.state.schedule.date),
    total: 0,
    phone: '',
    source: SOURCE_DASHBOARD,
    status: IN_PROGRESS,
    isQueue: this.isQueue,
    fullName: '',
    startTime: this.time,
    specialist: this.specialistId && this.specialists.find(({ id }) => id === this.specialistId),
    procedures: [],
    description: '',
    hasRemindSMS: this.$typedStore.getters['sms/settings']?.hasRemindSMS,
    hasCreationSMS: this.$typedStore.getters['sms/settings']?.hasCreationSMS
  }

  get isSmsAuthorize () {
    return this.$typedStore.getters['sms/isAuthorize']
  }

  get validations () {
    return {}
  }

  get specialists () {
    return this.$typedStore.state.specialists.specialists
  }

  get procedures () {
    return this.form.specialist?.procedures ?? []
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
    const isValid = await this.validate()

    if (!isValid) {
      return
    }

    try {
      this.isLoading = true

      await this.$typedStore.dispatch('appointments/create', this.form)

      this.$typedStore.dispatch('popup/hide')
    } catch (err) {
      if (err.code === 400) {
        this.$typedStore.dispatch('toasts/show', {
          type: 'error',
          title: err.message
        })

        return
      }

      throw err
    } finally {
      await this.$typedStore.dispatch('schedule/fetch')

      this.isLoading = false
    }
  }

  async fetchAvailableTime () {
    this.availableHours = []

    if (!this.form.specialist?.id || this.duration === 0) {
      return
    }

    this.availableHours = await this.$api.appointments.availableTime({
      date: this.form.date.format('YYYY-MM-DD'),
      specialistId: this.form.specialist.id,
      duration: this.duration
    })
  }

  checkStartTime () {
    const startTimeIndex = this.availableHours.indexOf(this.form.startTime)

    if (startTimeIndex === -1) {
      this.form.startTime = null
    }
  }

  async validate () {
    const { procedures } = this.form

    if (procedures.length === 0) {
      await this.$typedStore.dispatch('toasts/show', {
        type: 'error',
        title: 'Потрібно вибрати послуги'
      })

      return false
    }

    return true
  }
}
</script>
