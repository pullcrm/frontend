<template>
  <UiTable
    class="procedures-page-table"
    :data="list"
    numbered
  >
    <template #default="{ row }">
      <UiTableColumn
        name="Название"
        align="left"
      >
        {{ row.name }}
      </UiTableColumn>

      <UiTableColumn name="Описание">
        <UiText
          size="s"
        >
          {{ row.description }}
        </UiText>
      </UiTableColumn>

      <UiTableColumn name="Цена">
        <UiPrice
          size="xs"
          responsive
        >
          {{ row.price | price }}
        </UiPrice>
      </UiTableColumn>

      <UiTableColumn name="Длительность">
        {{ getDurationName(row.duration) }}
      </UiTableColumn>

      <UiTableColumn name="Изменить">
        <UiButton
          theme="info-outlined"
          left-icon="outlined/pencil"
          size="s"
          @click.native="onEdit(row)"
        >
          Открыть
        </UiButton>
      </UiTableColumn>
    </template>
  </UiTable>
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
