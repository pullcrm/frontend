<template>
  <SpecialistLayout
    :specialist="specialist"
    class="specialist-procedures-page"
  >
    <UiPlaceholder
      v-if="isEmpty"
      title="Список услуг пуст"
      text="Добавьте услугу, чтобы специалист начал работу"
      class="specialist-procedures-page__placeholder"
    />

    <ProceduresGroup
      v-for="(item, index) in items"
      :key="index"
      :group="item"
      class="specialist-procedures-page__procedures-group"
    />

    <UiButton
      v-if="isEditableList"
      size="m"
      theme="blue"
      responsive
      right-icon="outlined/pencil-simple"
      class="specialist-procedures-page__button"
      @click.native="openPopup"
    >
      Изменить список услуг
    </UiButton>
  </SpecialistLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { SPECIALIST } from '~/constants/roles'

import { groupByCategory } from '~/logics/procedures'

import SpecialistLayout from '../components/SpecialistLayout.vue'

import ProceduresGroup from './components/ProceduresGroup.vue'

@Component({
  components: {
    ProceduresGroup,
    SpecialistLayout
  },

  async asyncData ({ route, api }) {
    const slug = Number(route.params.slug)

    const specialist = await api.specialist.get(slug)

    return {
      specialist
    }
  },

  head () {
    return {
      title: 'Список услуг сотрудника - pullcrm'
    }
  }
})
export default class SpecialistProceduresPage extends Vue {
  readonly specialist

  get user () {
    return this.specialist.user
  }

  get role () {
    return this.$typedStore.getters['position/role']
  }

  get isEditableList () {
    return this.role.name !== SPECIALIST
  }

  get isEmpty () {
    return this.items.length === 0
  }

  get procedures () {
    return this.specialist.procedures
  }

  get categories () {
    return this.$typedStore.state.procedures.categories
  }

  get groupByCategory () {
    return groupByCategory(this.procedures, this.categories)
  }

  get items () {
    return this.groupByCategory
      .filter(({ procedures }) => procedures.length > 0)
  }

  openPopup () {
    this.$typedStore.dispatch('popup/show', {
      name: 'specialist-procedures',
      props: {
        specialist: this.specialist
      }
    })
  }
}
</script>

<style lang="scss" src="./ProceduresPage.scss"></style>
