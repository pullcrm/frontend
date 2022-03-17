<template>
  <Layout
    back
    class="full-widget-pick-date-page"
  >
    <UiTitle
      size="m"
      responsive
      class="full-widget-pick-date-page__title"
    >
      Виберіть час
    </UiTitle>

    <DatePicker
      :date="fromDatePick"
      :days-count="12"
      class="full-widget-pick-date-page__date-picker"
    />

    <SpecialistPanel
      :specialist="specialist"
      :procedures="activeProcedures"
      class="full-widget-pick-date-page__specialist-panel"
    />

    <TimePicker
      :hours="availableHours"
    />

    <template #fixed-panel>
      <UiButton
        v-if="canNext"
        size="m"
        theme="blue"
        class="full-widget-pick-date-page__button"
        @click.native="onSubmit"
      >
        Продовжити
      </UiButton>
    </template>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '~/utils/dayjs'

import Layout from '../../components/Layout.vue'
import DatePicker from '../../components/DatePicker/DatePicker.vue'

import TimePicker from './components/TimePicker/TimePicker.vue'
import SpecialistPanel from './components/SpecialistPanel.vue'

@Component({
  middleware: [
    'widget/prepare-date'
  ],

  components: {
    Layout,
    TimePicker,
    DatePicker,
    SpecialistPanel
  },

  provide () {
    return {
      duration: this.duration
    }
  },

  watch: {
    date () {
      this.$fetch()
    }
  },

  async fetch () {
    const date = this.$route.query.date
    const companyId = Number(this.$route.query.companyId || 0)
    const specialistId = Number(this.$route.query.specialistId || 0)

    this.availableHours = await this.$api.public.hoursSlots({
      date,
      duration: this.duration,
      companyId,
      specialistId
    }).then(result => {
      return result.map(item => {
        const [hour, minute] = item.split(':').map(Number)

        return (new Date()).setHours(hour, minute, 0)
      })
    }).then(result => {
      return result.filter(item => {
        if (!this.isToday) return true

        return dayjs(item).isAfter(dayjs() /** add(30, 'minute') */)
      })
    })
  },

  async asyncData ({ route, api }) {
    const companyId = Number(route.query.companyId || 0)
    const specialistId = Number(route.query.specialistId || 0)

    await api.public.companyById(companyId)

    const specialist = await api.public.specialistById(specialistId)

    return {
      companyId,
      specialist
    }
  }
})
export default class PickDatePage extends Vue {
  readonly companyId!: number
  readonly specialist!: any

  availableHours = []

  fromDatePick = new Date()

  get isToday () {
    return dayjs(String(this.date)).isToday()
  }

  get procedures () {
    return this.specialist.procedures
  }

  get canNext () {
    return this.date && this.time
  }

  get date () {
    return this.$route.query.date
  }

  get time () {
    return this.$route.query.time
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

  async onSubmit () {
    await this.$router.push({
      name: 'fullWidgetConfirmationPage',
      query: this.$route.query
    })
  }
}
</script>

<style lang="scss" src="./PickDatePage.scss"></style>
