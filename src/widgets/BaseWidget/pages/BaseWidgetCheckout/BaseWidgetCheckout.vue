<template>
  <BaseWidgetLayout
    ref="baseWidgetLayout"
    class="base-widget-checkout"
    has-back
  >
    <UiTitle
      class="base-widget-checkout__title"
      size="l"
    >
      Виберіть дату та час
    </UiTitle>

    <div class="base-widget-checkout__date">
      <UiTag
        v-for="(day, index) in days"
        :key="day"
        :class="{'_active': daySelectedIndex === index}"
        type="green"
        @click.native="onDay(index)"
      >
        {{ day }}
      </UiTag>
    </div>

    <div
      v-if="daySelectedIndex !== null"
      class="base-widget-checkout__time"
    >
      <UiBadge
        v-for="hour in workingHours"
        :key="hour"
        :class="[
          {'_darked': hourSelected !== null },
          {'_active': hourSelected === hour}
        ]"
        size="l"
        clickable
        @click.native="onHour(hour)"
      >
        {{ hour }}
      </UiBadge>

      <UiText
        v-if="workingHours.length === 0"
        class="base-widget-checkout__time-unavailable"
        size="l"
      >
        Немає доступних місць для запису!
      </UiText>
    </div>

    <UiTitle
      class="base-widget-checkout__title"
      size="l"
    >
      Вкажіть свою інформацію
    </UiTitle>

    <div class="base-widget-checkout__info">
      <UiText
        size="l"
      >
        Майстер: <strong>{{ specialist.user.firstName }}</strong>
      </UiText>

      <UiText
        size="l"
      >
        Послуга: <strong>
          {{ procedure.name }} - {{ procedure.price | price }}
        </strong>
      </UiText>
    </div>

    <div class="base-widget-checkout__form">
      <UiField
        label="Телефон"
        required
      >
        <UiInput
          v-model="form.phone"
          mask="38 (###) #### ###"
          placeholder="Введіть номер вашого телефону"
          @input="hasError = false"
        />
      </UiField>

      <UiField
        label="Ім'я та призвіще"
        required
      >
        <UiInput
          v-model="form.fullName"
          placeholder="Василь Петрович"
          @input="hasError = false"
        />
      </UiField>

      <UiField
        label="Додатковий текст"
      >
        <UiInput
          v-model="form.description"
          name="description"
          placeholder="(Не обов'язково)"
          tag="textarea"
        />
      </UiField>
    </div>

    <UiAlert
      v-if="hasRemindSms"
      left-icon="outlined/warning-circle"
      theme="info"
    >
      Ми нагадаємо вам про запис за годину до початку
    </UiAlert>

    <UiAlert
      v-if="hasError"
      left-icon="outlined/warning-octagon"
      theme="error"
    >
      Вказана не вся інформація, перевірте, будь ласка, форму!
    </UiAlert>

    <UiButton
      class="base-widget-checkout__submit"
      theme="yellow"
      :loading="isLoading"
      @click.native="submit"
    >
      Записатись
    </UiButton>
  </BaseWidgetLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import 'dayjs/locale/uk'

import dayjs from '@/utils/dayjs'

import UiTag from '@/ui/Tag/Tag.vue'
import UiMicroText from '@/ui/MicroText/MicroText.vue'

import BaseWidgetLayout from '../../components/Layout.vue'

@Component({
  components: {
    UiTag,
    UiMicroText,
    BaseWidgetLayout
  }
})
export default class BarbershopLondon extends Vue {
  $refs: {
    baseWidgetLayout: BaseWidgetLayout
  }

  get company () {
    return this.$store.state.widget.company
  }

  get procedure () {
    return this.$store.state.widget.order.procedure
  }

  get specialist () {
    return this.$store.state.widget.order.specialist
  }

  get hasRemindSms () {
    return this.company.company_setting?.hasRemindSMS
  }

  get hasCreationSms () {
    return this.company.company_setting?.hasCreationSMS
  }

  hasError = false
  isLoading = false

  form = {
    phone: '',
    fullName: '',
    description: ''
  }

  hourSelected = null
  daySelectedIndex = null

  workingDays = []
  workingHours = []

  get companyId () {
    return Number(this.$route.params.companyId)
  }

  get days () {
    return this.workingDays
      .map(day => {
        if (day.isToday()) {
          return 'Сьогодні'
        }

        if (day.isTomorrow()) {
          return 'Завтра'
        }

        return day.format('D MMMM')
      })
  }

  mounted () {
    this.workingDays = this.getWorkingDays()

    this.$refs.baseWidgetLayout.onUpdateHeight()
  }

  async submit () {
    try {
      this.isLoading = true

      const date = this.workingDays[this.daySelectedIndex]
      const procedureId = this.procedure.id

      await this.$api.public.appointmentCreate({
        specialistId: this.specialist.id,
        fullName: this.form.fullName.trim(),
        phone: this.form.phone,
        companyId: this.companyId,
        procedures: [procedureId],
        date: date?.format('YYYY-MM-DD'),
        startTime: `${this.hourSelected}:00`,
        description: this.form.description,
        hasRemindSMS: this.hasRemindSms,
        hasCreationSMS: this.hasCreationSms
      })

      this.$refs.baseWidgetLayout.postMessage('createOrder')

      this.$store.commit('widget/SET_ORDER_BY_KEY', ['date', date])
      this.$store.commit('widget/SET_ORDER_BY_KEY', ['startTime', this.hourSelected])

      this.$router.push({
        ...this.$route,
        name: 'BaseWidgetOrder'
      })
    } catch (err) {
      if (err.data.status === 400) {
        this.hasError = true

        return
      }

      throw err
    } finally {
      this.isLoading = false
    }
  }

  onHour (hour) {
    this.hasError = false

    this.hourSelected = hour
  }

  async onDay (index) {
    if (this.daySelectedIndex === index) {
      return
    }

    this.daySelectedIndex = index
    this.hourSelected = null

    const date = this.workingDays[index].format('YYYY-MM-DD')

    this.workingHours = await this.$api.public.hoursSlots({
      date,
      companyId: this.companyId,
      specialistId: this.specialist.id,
      duration: this.procedure.duration
    })

    this.$refs.baseWidgetLayout.onUpdateHeight()
  }

  getWorkingDays () {
    const days = []

    let date = dayjs(new Date()).locale('uk')

    while (days.length < 6) {
      if (date.format('d') !== '0') {
        days.push(date)
      }

      date = date.add(1, 'day')
    }

    return days
  }
}
</script>

<style lang="scss">
.base-widget-checkout {
  &__title {
    margin-bottom: 24px;
    color: $ui-white;
  }

  &__submit {
    width: 100%;
    margin-top: 24px;
  }

  &__date {
    margin: 0 -4px 8px;

    .ui-tag {
      margin: 0 4px 8px;
      color: $ui-white;
      cursor: pointer;

      &._active {
        background: $ui-green-hover-15;
      }
    }
  }

  &__time {
    margin: 0 -4px 32px;

    .ui-badge {
      margin: 0 4px 8px;
      color: $ui-black-90;
      background: $ui-black-20;
      cursor: pointer;

      &.ui-badge_clickable {
        @media (hover: hover) {
          &:hover {
            background: $ui-black-40;
          }
        }

        &:active {
          background: $ui-black-40;
        }
      }

      &._darked {
        background: #1e1e1e;
      }

      &._active {
        color: $ui-black-100;
        background: $ui-yellow-brand;
      }
    }
  }

  &__time-unavailable {
    color: $ui-white;
  }

  &__info {
    margin-bottom: 16px;
    color: $ui-black-40;

    .ui-text {
      margin-bottom: 4px;
    }

    strong {
      font-weight: 700;
    }
  }

  &__form {
    .ui-field {
      &__label {
        color: $ui-black-60;
      }

      input,
      textarea {
        color: $ui-white;
        background: transparent;
      }

      & + .ui-field {
        margin-top: 24px;
      }
    }
  }

  .ui-alert {
    margin-top: 16px;
    color: $ui-black-100;
    background: $ui-white;
    border: none;
  }
}
</style>
