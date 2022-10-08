<script lang="ts" setup>
import Sidebar from './components/Sidebar.vue'
import DatePickerButton from './components/DatePickerButton/DatePickerButton.vue'
import Schedule from '~/components/Schedule/Schedule.vue'

useMeta({
  title: 'Календар - pullcrm',
})

const route = useRoute()

const popupStore = usePopupStore()
const scheduleStore = useScheduleStore()

const isLoading = computed(() => {
  return scheduleStore.isLoading
})

onMounted(async () => {
  const { date } = route.query

  if (date)
    scheduleStore.date = String(date)

  await scheduleStore.fetch()
})

async function addAppointment() {
  await popupStore.show({
    name: 'appointment',
    props: { type: 'new' },
  })
}
</script>

<template>
  <q-page class="schedule-page">
    <UiContainer>
      <div class="schedule-page__header">
        <UiTitle
          size="m"
          responsive
        >
          Календар
        </UiTitle>

        <UiButton
          size="s"
          theme="blue"
          right-icon="outlined/plus"
          @click="addAppointment"
        >
          Додати запис
        </UiButton>
      </div>

      <Schedule
        class="schedule-page__schedule"
        :loading="isLoading"
      />
    </UiContainer>

    <DatePickerButton
      class="schedule-page__date-picker-button"
    />

    <Portal to="sidebar">
      <Sidebar />
    </Portal>
  </q-page>
</template>

<style lang="scss" src="./SchedulePage.scss"></style>
