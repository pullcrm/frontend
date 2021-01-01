<template>
  <div
    class="procedures-page-table"
  >
    <UiTable
      :data="list"
      numbered
    >
      <template #head>
        <th
          align="left"
        >
          Название
        </th>
        <th
          align="left"
        >
          Описание
        </th>
        <th>Цена</th>
        <th>Длительность</th>
        <th
          width="140"
          align="right"
        >
          Изменить
        </th>
      </template>

      <template #default="{ row }">
        <UiTableColumn>
          {{ row.name }}
        </UiTableColumn>

        <UiTableColumn>
          <UiText
            size="s"
          >
            {{ row.description }}
          </UiText>
        </UiTableColumn>

        <UiTableColumn
          align="center"
        >
          <UiPrice
            size="xs"
            responsive
          >
            {{ row.price | price }}
          </UiPrice>
        </UiTableColumn>

        <UiTableColumn
          align="center"
        >
          {{ getDurationName(row.duration) }}
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
            Открыть
          </UiButton>
        </UiTableColumn>
      </template>
    </UiTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { DURATIONS } from '@/constants/generated'

import UiTable from '@/ui/Table/Table.vue'
import UiTableColumn from '@/ui/Table/TableColumn.vue'

@Component({
  props: {
    list: {
      type: Array,
      required: true
    }
  },

  components: {
    UiTable,
    UiTableColumn
  }
})
export default class ProceduresTable extends Vue {
  get durationList () {
    return DURATIONS
  }

  onEdit (procedure) {
    this.$store.dispatch('popup/show', {
      name: 'procedure-edit',
      props: { procedure }
    })
  }

  getDurationName (time) {
    return this.durationList.find(item => item.value === time)?.name
  }
}
</script>

<style lang="scss">
  .procedures-page-table {
    margin-top: 24px;
  }
</style>
