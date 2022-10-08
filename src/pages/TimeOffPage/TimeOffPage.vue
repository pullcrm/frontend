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
      title: 'Таблиця перерв - pullcrm',
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
          Таблиця перерв
        </UiTitle>

        <UiButton
          theme="blue"
          responsive
          @click="onAdd"
        >
          Додати перерву
        </UiButton>
      </div>

      <TimeOffTable />
    </UiPanel>
  </UiContainer>
</template>

<style lang="scss" src="./TimeOffPage.scss"></style>
