<script lang="ts" setup>
import type LineChart from '~/services/line-chart'

interface IState {
  chart: LineChart
}

defineProps<IState>()

const root = ref<HTMLElement | null>(null)

provide('getUiTooltipContainer', () => root.value?.querySelector('.chart__inner'))

const activePointIndex = ref<number | null>(null)

function isActivePointIndex(index: number) {
  return activePointIndex.value === index
}

function setActivePointIndex(index: number) {
  activePointIndex.value = index
}
</script>

<template>
  <div
    ref="root"
    class="chart"
  >
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

      <div
        v-for="(point, index) in chart.points"
        :key="`point-${index}`"
        class="chart__point"
        :style="{
          left: `${100 * point.x / chart.width}%`,
          top: `${100 * point.y / chart.height}%`,
        }"
      />

      <div class="chart__popovers">
        <UiPopover
          v-for="(point, index) in chart.points"
          :key="`point-${index}`"
          class="chart__popover"
          :style="{
            left: `${100 * point.x / chart.width}%`,
            top: `${100 * point.y / chart.height}%`,
          }"
          size="s"
          :opened="isActivePointIndex(index)"
          placement="top"
          :clickable="false"
          @click="setActivePointIndex(index)"
        >
          <template #body>
            <slot
              name="point"
              :point="point"
            />
          </template>
        </UiPopover>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./Chart.scss"></style>
