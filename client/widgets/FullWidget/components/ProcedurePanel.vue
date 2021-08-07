<template>
  <UiPanel
    size="s"
    class="base-widget-procedure-panel"
    @click.native.prevent="onSelect"
  >
    <UiText
      size="l"
      responsive
      class="base-widget-procedure-panel__left"
    >
      <template #prepend>
        <UiCheckbox
          size="m"
          :value="isActive"
        />
      </template>

      <a href="#">
        {{ procedure.name }}
      </a>
    </UiText>

    <UiText
      size="m"
      responsive
      class="base-widget-procedure-panel__center"
    >
      {{ procedure.duration | minutesToTime }}
    </UiText>

    <UiPrice
      size="s"
      responsive
      class="base-widget-procedure-panel__right"
    >
      {{ procedure.price | price }}
    </UiPrice>
  </UiPanel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import xor from 'lodash/xor'

@Component({
  props: {
    procedure: {
      type: Object,
      required: true
    }
  }
})
export default class ProcedurePanel extends Vue {
  readonly procedure

  get isActive () {
    return this.activeProcedureIds.includes(this.procedure.id)
  }

  get activeProcedureIds () {
    // eslint-disable-next-line unicorn/prefer-spread
    return [].concat(this.$route.query.procedureIds ?? []).map(Number)
  }

  async onSelect () {
    const procedureIds = xor(this.activeProcedureIds, [this.procedure.id])

    await this.$router.replace({
      query: {
        ...this.$route.query,
        procedureIds: procedureIds.map(String)
      }
    })
  }
}
</script>

<style lang="scss" src="./ProcedurePanel.scss"></style>
