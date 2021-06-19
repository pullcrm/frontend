<template>
  <Layout class="full-widget-confirmation-page">
    <UiTitle
      size="m"
      responsive
      class="full-widget-confirmation-page__title"
    >
      Подтвердите запись
    </UiTitle>

    <InfoPanel
      :date="dateText"
      :specialist="specialist"
      :procedures="activeProcedures"
      class="full-widget-confirmation-page__info-panel"
    />

    <form
      class="full-widget-confirmation-page__form"
      @submit.prevent="onSubmit"
    >
      <UiFormValidator
        ref="formValidator"
        :validations="validations"
      >
        <template #default="{ resetFieldError, getFieldError }">
          <UiField
            :error="getFieldError('fullName')"
          >
            <UiInput
              v-model="form.fullName"
              trim
              name="fullName"
              left-icon="outlined/user"
              placeholder="Имя"
              required
              @input="resetFieldError('fullName')"
            />
          </UiField>

          <UiField
            :error="getFieldError('phone')"
          >
            <UiInput
              v-model="form.phone"
              mask="38 (###) #### ###"
              name="phone"
              left-icon="outlined/phone"
              placeholder="Телефон"
              required
              @input="resetFieldError('phone')"
            />
          </UiField>

          <UiField
            :error="getFieldError('description')"
          >
            <UiInput
              v-model="form.description"
              tag="textarea"
              name="description"
              left-icon="outlined/chat-circle-dots"
              placeholder="Комментарий или пожелание"
              @input="resetFieldError('description')"
            />
          </UiField>

          <UiText
            v-if="settings.hasRemindSMS"
            size="s"
            class="full-widget-confirmation-page__disclaimer"
          >
            Мы напомним вам о записи за {{ settings.remindSMSMinutes | minutesToTime }} до начала
          </UiText>

          <UiButton
            type="submit"
            size="m"
            theme="blue"
            :loading="isLoading"
            class="full-widget-confirmation-page__button"
          >
            Подтвердить
          </UiButton>
        </template>
      </UiFormValidator>
    </form>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '~/utils/dayjs'
import { setTime } from '~/utils/date-time'

import UiFormValidator, { Validations } from '~/ui/FormValidator.vue'

import Layout from '../../components/Layout.vue'

import InfoPanel from './components/InfoPanel.vue'

@Component({
  components: {
    Layout,
    InfoPanel
  },

  async asyncData ({ route, api }) {
    const companyId = Number(route.query.companyId || 0)
    const specialistId = Number(route.query.specialistId || 0)

    const company = await api.public.companyById(companyId)

    const specialist = await api.public.specialistById(specialistId)

    let { procedures } = specialist

    if (procedures.length === 0) {
      procedures = await api.public.proceduresByCompanyId({
        companyId
      })
    }

    return {
      company,
      procedures,
      specialist
    }
  }
})
export default class ConfirmationPage extends Vue {
  readonly company
  readonly procedures
  readonly specialist

  isLoading = false

  form = {
    phone: '',
    fullName: '',
    description: ''
  }

  $refs: {
    formValidator: UiFormValidator
  }

  get settings () {
    return this.company.company_setting || {}
  }

  get validations (): Validations {
    return {
      fullName: {
        rules: {
          required: true
        },
        messages: {
          required: 'Введите ваше имя'
        }
      },

      phone: {
        rules: {
          min: 10,
          required: true
        },
        messages: {
          min: 'Не верный формат номера',
          required: 'Введите номер телефона'
        }
      }
    }
  }

  get activeProcedureIds () {
    // eslint-disable-next-line unicorn/prefer-spread
    return [].concat(this.$route.query.procedureIds ?? []).map(Number)
  }

  get activeProcedures () {
    return this.procedures.filter(item => {
      return this.activeProcedureIds.includes(item.id)
    })
  }

  get duration () {
    return this.activeProcedures
      .reduce((acc, { duration }) => acc + duration, 0)
  }

  get date () {
    return this.$route.query.date as string
  }

  get time () {
    return this.$route.query.time as string
  }

  get dateText () {
    const date = setTime(new Date(this.date), this.time)

    // Четверг, 19:00 – 20:00
    return `${dayjs(this.date).format('dddd')}, ${date.format('HH:mm')} - ${date.add(this.duration, 'minute').format('HH:mm')}`
  }

  async onSubmit () {
    try {
      this.isLoading = true

      const { hasCreationSMS, hasRemindSMS } = this.company.company_setting

      await this.$api.public.appointmentCreate({
        ...this.form,
        date: this.date,
        startTime: `${this.time}:00`,
        companyId: this.company.id,
        procedures: this.activeProcedureIds,
        specialistId: this.specialist.id,
        hasRemindSMS,
        hasCreationSMS
      })

      this.$typedStore.dispatch('toasts/show', {
        title: 'Запись создана'
      })

      // this.$refs.baseWidgetLayout.postMessage('createOrder')

      this.$router.push({
        ...this.$route,
        name: 'fullWidgetOrderPage'
      })
    } catch (err) {
      if (err.status === 400) {
        this.$typedStore.dispatch('toasts/show', {
          type: 'error',
          title: 'Указана не вся информация, исправте данные!'
        })

        return
      }

      throw err
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" src="./ConfirmationPage.scss"></style>
