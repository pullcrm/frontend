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
        {{ row.duration | minutesToTime }}
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
  async onEdit (procedure) {
    await this.$store.dispatch('popup/show', {
      name: 'procedure-edit',
      props: { procedure }
    })
  }
}
</script>
