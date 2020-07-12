<template>
  <Layout>
    <UiContainer>
      <UiPanel
        class="employee-page"
      >
        <div class="employee-page__header">
          <div class="employee-page__header-title">
            Сотрудники
          </div>

          <div class="employee-page__header-inner">
            <div class="employee-page__search">
              <input type="text" placeholder="Поиск сотрудника по имени">

              <UiIcon
                name="search"
                size="xs"
              />
            </div>

            <div
              class="employee-page__add-button"
              @click="onShowEmployeePopup"
            >
              <p>Добавить сотрудника</p>
            </div>
          </div>
        </div>

        <div class="employee-page__tabs">
          <UiTabs
            :tabs="['Все', 'Доступные', 'Закрытые для записи', 'Скрытые']"
            v-model="tabActive"
          />
        </div>

        <div class="employee-page-table">
          <UiTable
            :data="employee"
            :labels="tableLabels"
          >
            <template slot-scope="{ row }">
              <UiTableColumn>
                <UiUser
                  :user="row"
                  :sub-name="row.phone"
                  extended
                />
              </UiTableColumn>

              <UiTableColumn>
                <div class="employee-page-table__status">
                  <UiTag
                    type="yellow"
                  >
                    {{ tabActive }}
                  </UiTag>

                  <p>Мастер короткой стрижки</p>
                </div>
              </UiTableColumn>

              <UiTableColumn>
                <div class="employee-page-table__edit">
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

import UiTag from '@/ui/Tag/Tag.vue'
import UiTabs from '@/ui/Tabs/Tabs.vue'
import UiTable from '@/ui/Table/Table.vue'
import UiTableColumn from '@/ui/Table/TableColumn.vue'

import Layout from '@/Layout/base.vue'
import UiIcon from '@/components/Icon.vue'
import UiUser from '@/components/Users/User.vue'
import UiPanel from '@/components/Panel.vue'
import UiContainer from '@/components/Container.vue'

@Component({
  components: {
    UiTag,
    UiUser,
    UiTable,
    UiTableColumn,
    UiTabs,
    Layout,
    UiIcon,
    UiPanel,
    UiContainer
  }
})
export default class Employee extends Vue {
  tabActive = 'Все'

  readonly tableLabels = [
    {
      name: 'Краткая информация'
    },
    {
      name: 'Статус',
      style: {
        width: '320px'
      }
    },
    {
      name: 'Управление',
      style: {
        width: '140px',
        textAlign: 'right'
      }
    }
  ]

  get employee () {
    return this.$store.state.employee.employee
  }

  onShowEmployeePopup () {
    this.$modal.show('add-employee')
  }
}
</script>

<style lang="scss" src="./Employee.scss"></style>
