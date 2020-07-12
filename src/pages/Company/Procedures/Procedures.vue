<template>
  <Layout>
    <UiContainer>
      <UiPanel
        class="procedures-page"
      >
        <div class="procedures-page__header">
          <div class="procedures-page__header-title">
            Услуги
          </div>

          <div class="procedures-page__header-inner">
            <div class="procedures-page__search">
              <input type="text" placeholder="Поиск по услугам">

              <UiIcon
                name="search"
                size="xs"
              />
            </div>

            <div
              class="procedures-page__add-button"
              @click="onShowServicePopup"
            >
              <p>Добавить услугу</p>
            </div>
          </div>
        </div>

        <div class="procedures-page-table">
          <UiTable
            :data="procedures"
            :labels="tableLabels"
          >
            <template slot-scope="{ row }">
              <UiTableColumn>
                {{ row.name }}
              </UiTableColumn>

              <UiTableColumn>
                <p>В этом месте должно быть краткое описание данной услуги</p>
              </UiTableColumn>

              <UiTableColumn>
                {{ row.price }} грн
              </UiTableColumn>

              <UiTableColumn>
                {{ getDurationName(row.duration) }}
              </UiTableColumn>

              <UiTableColumn>
                <UiTag
                  type="green"
                >
                  Expert
                </UiTag>
              </UiTableColumn>

              <UiTableColumn>
                <div class="procedures-page-table__edit">
                  Открыть
                </div>
              </UiTableColumn>
            </template>
          </UiTable>
        </div>
      </UiPanel>
    </UiContainer>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { getDurationName } from '@/logics/procedure'

import UiTag from '@/ui/Tag/Tag.vue'
import UiTable from '@/ui/Table/Table.vue'
import UiTableColumn from '@/ui/Table/TableColumn.vue'

import Layout from '@/Layout/base.vue'
import UiIcon from '@/components/Icon.vue'
import UiPanel from '@/components/Panel.vue'
import UiContainer from '@/components/Container.vue'

@Component({
  components: {
    UiTag,
    UiIcon,
    UiTable,
    UiTableColumn,
    Layout,
    UiPanel,
    UiContainer
  }
})
export default class Procedures extends Vue {
  readonly tableLabels = [
    {
      name: 'Название'
    },
    {
      name: 'Описание'
    },
    {
      name: 'Цена'
    },
    {
      name: 'Длительность'
    },
    {
      name: 'Теги'
    },
    {
      name: 'Управление',
      style: {
        width: '140px',
        textAlign: 'right'
      }
    }
  ]

  get procedures () {
    return this.$store.state.procedures.procedures
  }

  getDurationName (time) {
    return getDurationName(time)
  }

  onShowServicePopup () {
    this.$modal.show('add-procedure')
  }
}
</script>

<style lang="scss" src="./Procedures.scss"></style>
