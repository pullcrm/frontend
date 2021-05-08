<template>
  <BaseWidgetLayout
    ref="baseWidgetLayout"
    class="base-widget-specialists"
  >
    <UiTitle
      class="base-widget-specialists__title"
      size="m"
    >
      Майстри
    </UiTitle>

    <Specialist
      v-for="specialist in specialists"
      :key="specialist.id"
      :specialist="specialist"
      @select="onSelect(specialist)"
    />
  </BaseWidgetLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Specialist from '../../components/Specialist.vue'
import BaseWidgetLayout from '../../components/Layout.vue'

@Component({
  components: {
    Specialist,
    BaseWidgetLayout
  },

  async asyncData ({ route, typedStore }) {
    const companyId = route.params.companyId

    await typedStore.dispatch('widget/fetch', companyId)
  }
})
export default class BarbershopLondon extends Vue {
  $refs: {
    baseWidgetLayout: BaseWidgetLayout
  }

  get specialists () {
    return this.$typedStore.state.widget.specialists
  }

  async mounted () {
    const specialistId = Number(this.$route.query.specialistId)

    const specialist = this.$typedStore.getters['widget/specialistsById'](specialistId)

    if (specialist) {
      await this.$router.replace({
        query: {
          ...this.$route.query,
          specialistId: null
        }
      })

      this.onSelect(specialist)
    }

    this.$refs.baseWidgetLayout.onUpdateHeight()
  }

  onSelect (specialist) {
    this.$typedStore.commit('widget/SET_ORDER_BY_KEY', ['specialist', specialist])

    this.$router.push({
      ...this.$route,
      name: 'BaseWidgetServices'
    })
  }
}
</script>

<style lang="scss">
.base-widget-specialists {
  &__title {
    margin-bottom: 24px;
    color: $ui-white;
  }
}
</style>
