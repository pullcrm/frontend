<template>
  <div class="bs-london-widget">
    <div class="bs-london-widget__inner">
      <Specialists
        v-if="step === 1"
        :specialists="specialists"
        @select="onSpecialist"
      />

      <Procedures
        v-if="step === 2"
        :procedures="procedures"
        @back="onBack"
        @select="onProcedure"
      />

      <Checkout
        v-if="step === 3"
        :procedure="procedure"
        :specialist="specialist"
        @back="onBack"
        @update="onUpdateHeight"
        @created="onCreated"
      />

      <Order
        v-if="step === 4"
        :date="date"
        :procedure="procedure"
        :start-time="startTime"
        :specialist="specialist"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { companyId } from '@/widgets/pages/BarbershopLondon/constants'

import Order from './components/Order/Order.vue'
import Checkout from './components/Checkout/Checkout.vue'
import Procedures from './components/Procedures/Procedures.vue'
import Specialists from './components/Specialists/Specialists.vue'

@Component({
  components: {
    Order,
    Checkout,
    Procedures,
    Specialists
  },

  watch: {
    step () {
      this.onUpdateHeight()
    }
  }
})
export default class BarbershopLondon extends Vue {
  step = 1

  date = null
  startTime = null
  procedure = null
  specialist = null

  procedures = []
  specialists = []

  async mounted () {
    const [
      procedures,
      specialists
    ] = await Promise.all([
      this.$api.public.proceduresByCompanyId({ companyId }),
      this.$api.public.specialistsByCompanyId({ companyId })
    ])

    this.procedures = procedures
    this.specialists = specialists

    this.onUpdateHeight()
  }

  onSpecialist (specialist) {
    this.specialist = specialist

    this.step = 2
  }

  onProcedure (procedure) {
    this.procedure = procedure

    this.step = 3
  }

  onCreated ({ date, startTime }) {
    this.step = 4

    this.date = date
    this.startTime = startTime
  }

  async onUpdateHeight () {
    await new Promise(requestAnimationFrame)

    const height = (document.querySelector('.bs-london-widget') as HTMLElement).offsetHeight

    const payload = {
      height
    }

    this.postMessage('updateHeight', payload)

    this.postMessage('createOrder')
  }

  postMessage (event, payload = {}) {
    parent.postMessage(`pullcrm:${event}|${JSON.stringify(payload)}`, '*')
  }

  onBack () {
    this.step = this.step - 1
  }
}
</script>

<style lang="scss">
  .bs-london-widget {
    padding: 32px;
    background-color: #0d0e0e;

    &__inner {
      max-width: 688px;
      margin: 0 auto;
    }

    @media (max-width: $ui-mobile-portrait - 1px) {
      padding: 16px;
    }
  }
</style>
