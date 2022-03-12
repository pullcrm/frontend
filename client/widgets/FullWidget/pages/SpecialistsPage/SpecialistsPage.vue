<template>
  <Layout class="full-widget-specialists-page">
    <UiTitle
      size="m"
      responsive
      class="full-widget-specialists-page__title"
    >
      Виберіть спеціаліста
    </UiTitle>

    <SpecialistPanel
      v-for="specialist in specialists"
      :key="specialist.id"
      :specialist="specialist"
      class="full-widget-specialists-page__specialist-panel"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Layout from '../../components/Layout.vue'
import SpecialistPanel from '../../components/SpecialistPanel.vue'

@Component({
  components: {
    Layout,
    SpecialistPanel
  },

  async asyncData ({ route, api }) {
    const companyId = Number(route.query.companyId || 0)

    await api.public.companyById(companyId)

    const specialists = await api.public.specialistsByCompanyId({
      sort: 'order',
      order: 'asc',
      companyId
    })

    return {
      specialists
    }
  }
})
export default class SpecialistsPage extends Vue {
  readonly specialists
}
</script>

<style lang="scss" src="./SpecialistsPage.scss"></style>
