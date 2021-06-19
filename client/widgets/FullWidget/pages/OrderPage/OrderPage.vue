<template>
  <Layout
    :back="false"
    class="full-widget-order-page"
  >
    <UiTitle
      size="m"
      responsive
      class="full-widget-order-page__title"
    >
      Ваша запись
    </UiTitle>

    <InfoPanel
      :date="dateText"
      :procedures="activeProcedures"
      class="full-widget-order-page__info-panel"
    />

    <SpecialistPanel
      :specialist="specialist"
      class="full-widget-order-page__specialist-panel"
    />

    <CompanyPanel
      :company="company"
      class="full-widget-order-page__company-panel"
    />

    <UiButton
      size="m"
      theme="blue"
      class="full-widget-order-page__button"
      @click.native="onAdd"
    >
      Добавить в календарь
    </UiButton>

    <UiButton
      size="m"
      theme="info-outlined"
      class="full-widget-order-page__button"
      @click.native="onNew"
    >
      Записаться еще
    </UiButton>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import dayjs from '~/utils/dayjs'
import { setTime } from '~/utils/date-time'

import Layout from '../../components/Layout.vue'
import CompanyPanel from '../../components/CompanyPanel.vue'
import SpecialistPanel from '../../components/SpecialistPanel.vue'

import InfoPanel from './components/InfoPanel.vue'

@Component({
  components: {
    Layout,
    InfoPanel,
    CompanyPanel,
    SpecialistPanel
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
export default class OrderPage extends Vue {
  readonly company
  readonly procedures
  readonly specialist

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

  onNew () {
    const { href } = this.$router.resolve({
      name: 'fullWidgetSpecialistsPage',
      query: {
        companyId: String(this.company.id)
      }
    })

    window.open(href, '_self')
  }

  onAdd () {
    this.$typedStore.dispatch('toasts/show', {
      title: 'Не доступно!',
      type: 'warning'
    })
  }
}
</script>

<style lang="scss" src="./OrderPage.scss"></style>
