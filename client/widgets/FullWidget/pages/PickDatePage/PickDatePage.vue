<template>
  <Layout class="full-widget-pick-date-page">
    <UiTitle
      size="m"
      responsive
      class="full-widget-pick-date-page__title"
    >
      Выберите время
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
      :hours="filteredAvailableHours"
    />
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
    const { companyId, specialistId, date } = this.$route.query

    this.availableHours = await this.$api.public.hoursSlots({
      date,
      duration: this.duration,
      companyId,
      specialistId
    }).then((result) => {
      return result.map(item => {
        const [hour, minute] = item.split(':').map(Number)

        return dayjs().hour(hour).minute(minute)
      })
    })
  },

  async asyncData ({ route, api }) {
    const companyId = Number(route.query.companyId || 0)
    const specialistId = Number(route.query.specialistId || 0)

    await api.public.companyById(companyId)

    const specialist = await api.public.specialistById(specialistId)

    let { procedures } = specialist

    if (procedures.length === 0) {
      procedures = await api.public.proceduresByCompanyId({
        companyId
      })
    }

    return {
      companyId,
      procedures,
      specialist
    }
  }
})
export default class PickDatePage extends Vue {
  readonly companyId!: number
  readonly procedures
  readonly specialist

  fromDatePick = new Date()

  availableHours = []

  get date () {
    return String(this.$route.query.date)
  }

  get filteredAvailableHours () {
    if (dayjs(this.date).isToday()) {
      return this.availableHours.filter(item => {
        return item.isAfter(dayjs() /** add(30, 'minute') */)
      })
    }

    return this.availableHours
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
}
</script>

<style lang="scss" src="./PickDatePage.scss"></style>
