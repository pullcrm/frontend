<template>
  <div class="bs-london-widget-procedure">
    <UiTitle
      size="s"
    >
      {{ procedure.name }} - {{ procedure.price | price }}
    </UiTitle>

    <UiText
      v-if="procedure.description"
    >
      {{ procedure.description }}
    </UiText>

    <UiButton
      theme="yellow"
      size="l"
      @click.native="$emit('select')"
    >
      Вибрати
    </UiButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    procedure: {
      type: Object,
      required: true
    }
  }
})
export default class Procedure extends Vue {

}
</script>

<style lang="scss">
  .bs-london-widget-procedure {
    color: $ui-white;

    .ui-button {
      margin-top: 16px;
    }

    .ui-text {
      margin-top: 8px;
    }

    &:not(:last-child) {
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid $ui-black-90;
    }
  }
</style>
