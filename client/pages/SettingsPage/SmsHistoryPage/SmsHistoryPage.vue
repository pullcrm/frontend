<template>
  <SettingsLayout
    class="sms-history-page"
  >
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
              {{ row.createdAt | formatDate('DD.MM.YYYY') }}
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
              {{ row.amount | price }}
            </UiText>
          </UiTableColumn>
        </template>
      </UiTable>
    </UiPanel>
  </SettingsLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { IHistoryItem } from '~/services/api'

import InfoPanel from '~/components/InfoPanel/InfoPanel.vue'

import Section from '../components/Section.vue'
import SmsTemplate from '../components/SmsTemplate.vue'
import SettingsLayout from '../components/Layout.vue'

@Component({
  layout: 'dashboard',

  components: {
    Section,
    InfoPanel,
    SmsTemplate,
    SettingsLayout
  },

  async asyncData ({ api }) {
    const { data: history } = await api.sms.history({
      offset: 0,
      limit: 50
    })

    return {
      history
    }
  },

  head () {
    return {
      title: 'Історія відправки СМС - pullcrm'
    }
  }
})
export default class SmsHistoryPage extends Vue {
  readonly history: IHistoryItem[] = []
}
</script>

<style lang="scss" src="./SmsHistoryPage.scss"></style>
