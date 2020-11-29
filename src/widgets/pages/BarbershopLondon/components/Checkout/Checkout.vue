<template>
  <div class="bs-london-widget-checkout">
    <UiMicroText
      class="bs-london-widget-checkout__back"
      @click.native="$emit('back')"
    >
      <template #prepend>
        <UiIcon
          size="s"
          name="arrow/ios/left"
        />
      </template>

      Назад
    </UiMicroText>

    <UiTitle
      class="bs-london-widget-checkout__title"
      size="l"
    >
      Виберіть дату та час
    </UiTitle>

    <div class="bs-london-widget-checkout__date">
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
      class="bs-london-widget-checkout__time"
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
        class="bs-london-widget-checkout__time-unavailable"
        size="l"
      >
        Немає доступних місць для запису!
      </UiText>
    </div>

    <UiTitle
      class="bs-london-widget-checkout__title"
      size="l"
    >
      Вкажіть свою інформацію
    </UiTitle>

    <div class="bs-london-widget-checkout__info">
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

    <div class="bs-london-widget-checkout__form">
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
      left-icon="alert/circle"
      theme="info"
    >
      Ми нагадаємо вам про запис за годину до початку
    </UiAlert>

    <UiAlert
      v-if="hasError"
      left-icon="alert/circle"
      theme="error"
    >
      Вказана не вся інформація, перевірте, будь ласка, форму!
    </UiAlert>

    <UiButton
      class="bs-london-widget-checkout__submit"
      theme="yellow"
      :loading="isLoading"
      @click.native="submit"
    >
      Записатись
    </UiButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import 'dayjs/locale/uk'

import { companyId } from '@/widgets/pages/BarbershopLondon/constants'

import { toDate } from '@/utils/date-time'

import { getHoursSlots } from '@/logics/appointment'

import UiTag from '@/ui/Tag/Tag.vue'
import UiMicroText from '@/ui/MicroText.vue'

@Component({
  components: {
    UiTag,
    UiMicroText
  },

  props: {
    procedure: {
      type: Object,
      required: true
    },

    specialist: {
      type: Object,
      required: true
    }
  }
})
export default class Checkout extends Vue {
  readonly procedure: any
  readonly specialist: any

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
  }

  async submit () {
    try {
      this.isLoading = true

      const date = this.workingDays[this.daySelectedIndex]
      const procedureId = this.procedure.id

      await this.$api.public.appointmentCreate({
        employeeId: this.specialist.id,
        fullName: this.form.fullName.trim(),
        phone: this.form.phone,
        companyId,
        procedures: [procedureId],
        date: date?.format('YYYY-MM-DD'),
        startTime: `${this.hourSelected}:00`,
        description: this.form.description
      })

      // @TODO: Send SMS

      this.$emit('created', {
        date,
        startTime: this.hourSelected
      })
    } catch (err) {
      if (err.status === 400) {
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

    const slots = await this.$api.public.hoursSlots({
      date,
      companyId,
      employeeId: this.specialist.id
    })

    this.workingHours = getHoursSlots(slots, {
      duration: this.procedure.duration
    })

    this.$emit('update')
  }

  getWorkingDays () {
    const days = []

    let date = toDate(new Date().toDateString()).locale('uk')

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
  .bs-london-widget-checkout {
    &__title {
      margin-bottom: 24px;
      color: $ui-white;
    }

    &__back {
      margin-bottom: 8px;
      color: $ui-black-80;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
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
        cursor: pointer;

        &._darked {
          background: #1e1e1e;
        }

        &._active {
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
          position: static;
          padding: 0;
          color: $ui-black-70;
          background: transparent;
          transform: none;
        }

        input,
        textarea {
          color: $ui-white;
          background: transparent;
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
