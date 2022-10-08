<script lang="ts" setup>
import dayjs from '~/utils/dayjs'
import { setTime } from '~/utils/time'
import { debounce } from '~/utils/debounce'

const TIME = 1000 * 60 /* 1 minute */

const position = ref(0)
const time = ref<string | null>(null)

const timetableStore = useTimetableStore()

const fromMaxWorkingHours = computed(() => {
  return timetableStore.fromMaxWorkingHours
})

const toMaxWorkingHours = computed(() => {
  return timetableStore.toMaxWorkingHours
})

const updateTimer = debounce(() => {
  const startEt = fromMaxWorkingHours.value
  const endAt = toMaxWorkingHours.value

  if (!startEt || !endAt) {
    time.value = null

    return
  }

  const minutesOfDay = (setTime(new Date(), endAt).unix() - setTime(new Date(), startEt).unix()) / 60
  const minutesToNow = (dayjs(new Date()).unix() - setTime(new Date(), startEt).unix()) / 60

  position.value = minutesToNow * 100 / minutesOfDay

  if (position.value < 0 || position.value > 100) {
    time.value = null

    return
  }

  time.value = dayjs(new Date()).format('HH:mm')
}, 50)

onMounted(() => {
  updateTimer()

  const interval = setInterval(() => updateTimer(), TIME)

  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})

watch(fromMaxWorkingHours, updateTimer)
watch(toMaxWorkingHours, updateTimer)
</script>

<template>
  <div
    v-if="time"
    class="schedule-active-time"
  >
    <div
      class="schedule-active-time__inner"
      :style="`top: ${position}%;`"
      :data-time="time"
    />
  </div>
</template>

<style lang="scss" src="./ActiveTime.scss"></style>
