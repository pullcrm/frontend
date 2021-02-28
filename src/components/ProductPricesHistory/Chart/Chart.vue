<template>
  <div class="product-prices-history-chart">
    <div class="product-prices-history-chart__inner">
      <svg
        :viewBox="`0 0 ${chart.width} ${chart.height}`"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          v-for="(curve, index) in chart.curves"
          :key="index"
          :d="curve.path"
          :data-price1="curve.price1"
          :data-price2="curve.price2"
          class="product-prices-history-chart__curve"
        />

        <!-- <template v-for="(curve, index) in chart.curves">
          <circle
            :key="`1-${index}`"
            :cx="curve.controlPoint1.x"
            :cy="curve.controlPoint1.y"
            r="7"
            fill="red"
          />

          <circle
            :key="`2-${index}`"
            :cx="curve.controlPoint2.x"
            :cy="curve.controlPoint2.y"
            r="7"
            fill="blue"
          />
        </template> -->
      </svg>

      <div class="product-prices-history-chart__points">
        <div
          v-for="(point, index) in chart.points"
          :key="`point-zone-${index}`"
          :style="{ left: `${100 * point.x / chart.width}%` }"
          class="product-prices-history-chart__point-zone"
          @click="setActivePointIndex(index)"
          @mouseover="setActivePointIndex(index)"
        />

        <UiTooltip
          v-for="(point, index) in chart.points"
          :key="`point-${index}`"
          ref="points"
          :style="{
            left: `${100 * point.x / chart.width}%`,
            top: `${100 * point.y / chart.height}%`
          }"
          :opened="isActivePointIndex(index)"
          placement="top_middle"
          :clickable="false"
          :data-price="point.price"
          class="product-prices-history-chart__point"
          :class="{ _active: isActivePointIndex(index) }"
          @click.native="setActivePointIndex(index)"
        >
          <template #body>
            {{ point.label }}

            <br>

            <strong>
              {{ point.price | price }}
            </strong>

            <!-- <strong v-if="point.price > 0">
              {{ point.price | price }}
            </strong>
            <strong v-else>
              Не было в наличии
            </strong> -->

            <template v-if="point.priceDifference !== 0">
              ({{ point.priceDifference | price({ signed: true }) }})
            </template>
          </template>
        </UiTooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import PricesChart from '@/services/prices-chart'

import { scrollToElement } from '@/utils/scroll-to'

@Component({
  props: {
    chart: {
      type: Object,
      required: true
    }
  },

  provide () {
    return {
      getUiTooltipContainer: () => {
        return this.$el
      }
    }
  }
})
export default class Chart extends Vue {
  readonly chart!: PricesChart

  $refs: {
    points: HTMLElement
  }

  activePointIndex:
    | number
    | null
    = null

  async mounted () {
    const activePointIndex = this.chart.points.length - 1

    await scrollToElement(this.$refs.points[activePointIndex].$el, {
      speed: 0,
      minDuration: 0,
      maxDuration: 0,
      elementToScroll: this.$el
    })

    this.setActivePointIndex(activePointIndex)
  }

  isActivePointIndex (index: number) {
    return this.activePointIndex === index
  }

  setActivePointIndex (index: number) {
    this.activePointIndex = index
  }
}
</script>

<style lang="scss" src="./Chart.scss"></style>
