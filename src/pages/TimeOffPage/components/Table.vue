<script lang="ts" setup>
import { formatDate } from '~/utils/date-time'

const popupStore = usePopupStore()
const scheduleStore = useScheduleStore()

const timeOffs = computed(() => {
  return scheduleStore.normalizeTimeOffs
})

function onEdit(timeOff: any) {
  popupStore.show({
    name: 'time-off-edit',
    props: { timeOff },
  })
}
</script>

<template>
  <div
    class="time-off-page-table"
  >
    <!-- TODO: Check this -->
    <q-no-ssr>
      <UiTable
        :data="timeOffs"
        numbered
      >
        <template #default="{ row }">
          <UiTableColumn
            name="Співробітник"
            align="left"
          >
            {{ row.specialistId }}
          </UiTableColumn>

          <UiTableColumn
            name="Час початку"
            align="left"
          >
            <UiText
              size="m"
            >
              {{ formatDate(row.startDateTime, 'D MMMM HH:mm') }}
            </UiText>
          </UiTableColumn>

          <UiTableColumn
            name="Час закінчення"
            align="left"
          >
            <UiText
              size="m"
            >
              {{ formatDate(row.endDateTime, 'D MMMM HH:mm') }}
            </UiText>
          </UiTableColumn>

          <UiTableColumn
            name="Дії"
            align="right"
          >
            <UiButton
              theme="info-outlined"
              left-icon="outlined/pencil"
              size="m"
              @click="onEdit(row)"
            >
              Змінити
            </UiButton>
          </UiTableColumn>
        </template>
      </UiTable>
    </q-no-ssr>
  </div>
</template>

<style lang="scss">
  .time-off-page-table {
    margin-top: 24px;
  }
</style>
