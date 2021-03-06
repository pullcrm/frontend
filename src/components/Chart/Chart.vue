<template>
  <div class="chart">
    <div class="chart__inner">
      <div
        v-for="(line, index) in chart.valueLinesPoints"
        :key="`line-${index}`"
        class="chart__value-line"
        :style="{ top: `${100 * line.y / chart.height}%` }"
        :data-label="line.label"
      />

      <svg
        :viewBox="`0 0 ${chart.width} ${chart.height}`"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          opacity="0.12"
          :d="chart.splitCurves"
          fill="#3C8AFF"
        />

        <path
          v-for="(curve, index) in chart.curves"
          :key="index"
          :d="curve.path"
          class="chart__curve"
        />
      </svg>

      <div class="chart__points">
        <div
          v-for="(point, index) in chart.points"
          :key="`point-zone-${index}`"
          :style="{ left: `${100 * point.x / chart.width}%` }"
          class="chart__point-zone"
          @click="setActivePointIndex(index)"
          @mouseover="setActivePointIndex(index)"
        >
          <UiText
            size="m"
            responsive
          >
            {{ point.label }}
          </UiText>
        </div>

        <UiPopover
          v-for="(point, index) in chart.points"
          :key="`point-${index}`"
          class="chart__point"
          :class="{ _active: isActivePointIndex(index) }"
          :style="{
            left: `${100 * point.x / chart.width}%`,
            top: `${100 * point.y / chart.height}%`
          }"
          size="s"
          :opened="isActivePointIndex(index)"
          placement="top"
          :clickable="false"
          @click.native="setActivePointIndex(index)"
        >
          <template #body>
            <slot
              name="point"
              :point="point"
            >
              <UiText>
                <strong>
                  {{ point.value }}
                </strong>

                <template v-if="point.valueDifference !== 0">
                  ({{ point.valueDifference }})
                </template>
              </UiText>
            </slot>
          </template>
        </UiPopover>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import LineChart from '@/services/line-chart'

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
  readonly chart!: LineChart

  activePointIndex:
    | number
    | null
    = null

  isActivePointIndex (index: number) {
    return this.activePointIndex === index
  }

  setActivePointIndex (index: number) {
    this.activePointIndex = index
  }
}
</script>

<style lang="scss" src="./Chart.scss"></style>
