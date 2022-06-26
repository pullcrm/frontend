<script lang="ts" setup>
import TimeTableDay from './components/Day.vue'

useMeta({
  title: 'Налаштування графіку работи - pullcrm',
})

const timetableStore = useTimetableStore()

const timetable = computed(() => {
  return timetableStore.normalizeTimetable
})
</script>

<template>
  <div class="timetable-settings-page">
    <UiPanel
      size="m"
      responsive
    >
      <UiTitle
        size="s"
        responsive
        class="timetable-settings-page__title"
      >
        Графік роботи
      </UiTitle>

      <TimeTableDay
        v-for="(value, key) in timetable"
        :key="key"
        :to="value.to"
        :from="value.from"
        :opened="value.opened"
        :day-alias="key"
        class="timetable-settings-page__day"
      />
    </UiPanel>
  </div>
</template>

<style lang="scss" src="./TimetableSettingsPage.scss"></style>
