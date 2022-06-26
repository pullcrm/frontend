<script lang="ts" setup>
import dayjs from '~/utils/dayjs'
import { setTime } from '~/utils/time'

const TIME = 1000 * 60 /* 1 minute */

const position = ref(0)
const time = ref<string | null>(null)

const timetableStore = useTimetableStore()

const timeWork = computed(() => {
  return timetableStore.timeWork
})

onMounted(() => {
  const { from, to } = timeWork.value

  startTimer(from, to)

  const interval = setInterval(() => startTimer(from, to), TIME)

  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})

function startTimer(startEt: string, endAt: string) {
  const minutesOfDay = (setTime(new Date(), endAt).unix() - setTime(new Date(), startEt).unix()) / 60
  const minutesToNow = (dayjs(new Date()).unix() - setTime(new Date(), startEt).unix()) / 60

  position.value = minutesToNow * 100 / minutesOfDay

  if (position.value < 0 || position.value > 100) {
    time.value = null

    return
  }

  time.value = dayjs(new Date()).format('HH:mm')
}
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
