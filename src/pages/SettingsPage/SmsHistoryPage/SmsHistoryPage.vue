<script lang="ts" setup>
import type { IHistoryItem } from '~/services/api'
import { api } from '~/boot/api'
import { formatDate } from '~/utils/date-time'
import { formatMoney } from '~/utils/money'

useMeta({
  title: 'Історія відправки СМС - pullcrm',
})

let history = reactive<IHistoryItem[]>([])

onMounted(async () => {
  const { data } = await api.sms.history({
    offset: 0,
    limit: 50,
  })

  history = data
})
</script>

<template>
  <div class="sms-history-page">
    <UiPanel
      size="m"
      responsive
    >
      <UiTitle
        size="s"
        responsive
        class="sms-settings-page__title"
      >
        Історія відправки СМС
      </UiTitle>

      <UiTable
        :data="history"
        numbered
      >
        <template #default="{ row }">
          <UiTableColumn
            name="Дата створення"
            align="left"
          >
            <UiText
              size="m"
              responsive
            >
              {{ formatDate(row.createdAt, 'DD.MM.YYYY') }}
            </UiText>
          </UiTableColumn>

          <UiTableColumn
            name="Ціна"
            align="right"
          >
            <UiText
              size="m"
              responsive
            >
              {{ formatMoney(row.amount) }}
            </UiText>
          </UiTableColumn>
        </template>
      </UiTable>
    </UiPanel>
  </div>
</template>

<style lang="scss" src="./SmsHistoryPage.scss"></style>
