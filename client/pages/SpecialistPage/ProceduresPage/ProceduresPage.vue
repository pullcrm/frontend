<template>
  <SpecialistLayout
    class="specialist-procedures-page"
  >
    <UiPlaceholder
      v-if="isEmpty"
      title="Список услуг пуст"
      text="Добавьте услугу, чтобы специалист начал работу"
      class="specialist-procedures-page__placeholder"
    />

    <ProceduresGroup
      v-for="(procedures, categoryId) in proceduresByCategory"
      :key="categoryId"
      :procedures="procedures"
      :category-id="Number(categoryId)"
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

import { groupByCategoryId } from '~/logics/procedures'

import SpecialistLayout from '../components/SpecialistLayout.vue'

import ProceduresGroup from './components/ProceduresGroup.vue'

@Component({
  components: {
    ProceduresGroup,
    SpecialistLayout
  },

  head () {
    return {
      title: 'Список услуг сотрудника - pullcrm'
    }
  }
})
export default class SpecialistProceduresPage extends Vue {
  get specialistId () {
    return Number(this.$route.params.slug)
  }

  get specialist () {
    return this.$typedStore.getters['specialists/byId'](this.specialistId)
  }

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
    return this.procedures.length === 0
  }

  get proceduresByCategory () {
    return groupByCategoryId(this.procedures)
  }

  get procedures () {
    return this.specialist.procedures
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
