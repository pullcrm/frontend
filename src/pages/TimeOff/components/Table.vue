<template>
  <div
    class="time-off-page-table"
  >
    <UiTable
      :data="timeOffs"
      numbered
    >
      <template #head>
        <th
          align="left"
        >
          Сотрудник
        </th>
        <th
          align="left"
        >
          Время начала
        </th>
        <th
          align="left"
        >
          Время конца
        </th>
        <th
          width="200"
          align="right"
        >
          Действия
        </th>
      </template>

      <template #default="{ row }">
        <UiTableColumn>
          {{ row.employeeId }}
        </UiTableColumn>

        <UiTableColumn>
          <UiText
            size="m"
          >
            {{ row.startDateTime | formatDate('D MMMM HH:mm') }}
          </UiText>
        </UiTableColumn>

        <UiTableColumn>
          <UiText
            size="m"
          >
            {{ row.endDateTime | formatDate('D MMMM HH:mm') }}
          </UiText>
        </UiTableColumn>

        <UiTableColumn
          align="right"
        >
          <UiButton
            theme="info-outlined"
            left-icon="edit/edit-1"
            size="m"
            @click.native="onEdit(row)"
          >
            Изменить
          </UiButton>
        </UiTableColumn>
      </template>
    </UiTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiTable from '@/ui/Table/Table.vue'
import UiTableColumn from '@/ui/Table/TableColumn.vue'

@Component({
  components: {
    UiTable,
    UiTableColumn
  }
})
export default class Table extends Vue {
  get timeOffs () {
    return this.$store.getters['schedule/normalizeTimeOffs']
  }

  onEdit (timeOff) {
    this.$store.dispatch('popup/show', {
      name: 'time-off-edit',
      props: { timeOff }
    })
  }
}
</script>

<style lang="scss">
  .time-off-page-table {
    margin-top: 24px;
  }
</style>
