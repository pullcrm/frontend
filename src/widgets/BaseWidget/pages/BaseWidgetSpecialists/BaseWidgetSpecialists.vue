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
  }
})
export default class BarbershopLondon extends Vue {
  $refs: {
    baseWidgetLayout: BaseWidgetLayout
  }

  get companyId (): string {
    return this.$route.params.companyId
  }

  get specialists () {
    return this.$store.state.widget.specialists
  }

  async mounted () {
    await this.$store.dispatch('widget/fetch', this.companyId)

    this.$refs.baseWidgetLayout.onUpdateHeight()
  }

  onSelect (specialist) {
    this.$store.commit('widget/SET_ORDER_BY_KEY', ['specialist', specialist])

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
