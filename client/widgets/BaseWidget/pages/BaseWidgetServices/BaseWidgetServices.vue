<template>
  <BaseWidgetLayout
    ref="baseWidgetLayout"
    class="base-widget-services"
    has-back
  >
    <UiTitle
      class="base-widget-services__title"
      size="l"
    >
      Послуги
    </UiTitle>

    <Procedure
      v-for="procedure in procedures"
      :key="procedure.id"
      :procedure="procedure"
      @select="onSelect(procedure)"
    />
  </BaseWidgetLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Procedure from '../../components/Service.vue'
import BaseWidgetLayout from '../../components/Layout.vue'

@Component({
  components: {
    Procedure,
    BaseWidgetLayout
  }
})
export default class BaseWidgetServices extends Vue {
  $refs: {
    baseWidgetLayout: BaseWidgetLayout
  }

  get procedures () {
    return this.$typedStore.state.widget.procedures
  }

  async mounted () {
    this.$refs.baseWidgetLayout.onUpdateHeight()
  }

  onSelect (procedure) {
    this.$typedStore.commit('widget/SET_ORDER_BY_KEY', ['procedure', procedure])

    this.$router.push({
      ...this.$route,
      name: 'BaseWidgetCheckout'
    })
  }
}
</script>

<style lang="scss">
.base-widget-services {
  &__title {
    margin-bottom: 24px;
    color: $ui-white;
  }
}
</style>
