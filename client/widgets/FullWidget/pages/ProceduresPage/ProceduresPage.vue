<template>
  <Layout
    back
    class="full-widget-procedures-page"
  >
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
        v-if="canNext"
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

import dayjs from '~/utils/dayjs'

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
    const specialistId = Number(route.query.specialistId || 0)

    await api.public.companyById(companyId)

    const [specialist, categories] = await Promise.all([
      api.public.specialistById(specialistId),
      api.public.categories({
        companyId
      })
    ])

    return {
      specialist,
      categories
    }
  }
})
export default class ProceduresPage extends Vue {
  readonly specialist
  readonly categories

  get canNext () {
    return Boolean(this.$route.query.procedureIds)
  }

  get procedures () {
    return this.specialist.procedures
  }

  get normalizeCategories () {
    return normalizeCategories(
      this.categories, this.procedures
    )
      .filter(category => category.procedures.length > 0)
  }

  async onSubmit () {
    await this.$router.push({
      name: 'fullWidgetPickDatePage',
      query: {
        ...this.$route.query,
        date: dayjs(new Date()).format('YYYY-MM-DD')
      }
    })
  }
}
</script>

<style lang="scss" src="./ProceduresPage.scss"></style>
