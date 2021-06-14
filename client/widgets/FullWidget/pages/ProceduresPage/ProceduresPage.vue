<template>
  <Layout class="full-widget-procedures-page">
    <UiTitle
      size="m"
      responsive
      class="full-widget-procedures-page__title"
    >
      Выберите услуги
    </UiTitle>

    <ProceduresGroup
      v-for="category in normalizeCategories"
      :key="`category-${category.id}`"
      :title="category.name"
      class="full-widget-procedures-page__procedures-group"
    >
      <ProcedurePanel
        v-for="procedure in category.procedures"
        :key="`procedure-${procedure.id}`"
        :procedure="procedure"
        class="full-widget-procedures-page__procedure-panel"
      />
    </ProceduresGroup>

    <template #fixed-panel>
      <UiButton
        size="m"
        theme="blue"
        class="full-widget-procedures-page__button"
        @click.native="onSubmit"
      >
        Продолжить
      </UiButton>
    </template>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { normalizeCategories } from '~/logics/procedures'

import Layout from '../../components/Layout.vue'
import ProcedurePanel from '../../components/ProcedurePanel.vue'
import ProceduresGroup from '../../components/ProceduresGroup.vue'

@Component({
  components: {
    Layout,
    ProcedurePanel,
    ProceduresGroup
  },

  async asyncData ({ route, api }) {
    const companyId = Number(route.query.companyId || 0)
    // const specialistId = Number(route.query.specialistId || 0)

    await api.public.companyById(companyId)

    const [procedures, categories] = await Promise.all([
      api.procedures.all(),
      api.categories.all()
    ])

    // const [procedures, specialists] = await Promise.all([
    //   [] || api.public.proceduresByCompanyId({ companyId }),
    //   // TODO: Fetch current specialist
    //   api.public.specialistsByCompanyId({
    //     sort: 'order',
    //     order: 'asc',
    //     companyId
    //   })
    // ])

    return {
      procedures,
      categories
    }
  }
})
export default class ProceduresPage extends Vue {
  readonly procedures
  readonly categories

  get normalizeCategories () {
    return normalizeCategories(this.categories, this.procedures)
  }

  async onSubmit () {
    await this.$router.push({
      name: 'FullWidgetPickDatePage',
      query: this.$route.query
    })
  }
}
</script>

<style lang="scss" src="./ProceduresPage.scss"></style>
