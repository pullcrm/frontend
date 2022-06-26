<script lang="ts">
import TimeOffTable from './components/Table.vue'

export default {
  components: {
    TimeOffTable,
  },

  async preFetch() {
    const scheduleStore = useScheduleStore()

    await scheduleStore.fetchTimeOffs()
  },

  setup() {
    useMeta({
      title: 'Не робочий час - pullcrm',
    })

    const popupStore = usePopupStore()

    function onAdd() {
      popupStore.show('time-off-new')
    }

    return {
      onAdd,
    }
  },
}
</script>

<template>
  <UiContainer>
    <UiPanel
      class="time-off-page"
    >
      <div class="time-off-page__header">
        <UiTitle
          size="m"
          responsive
        >
          Не робочий час
        </UiTitle>

        <UiButton
          theme="blue"
          responsive
          @click="onAdd"
        >
          Закрити запис
        </UiButton>
      </div>

      <TimeOffTable />
    </UiPanel>
  </UiContainer>
</template>

<style lang="scss" src="./TimeOffPage.scss"></style>
