<template>
  <div class="ui-grid procedures-page-placeholder">
    <UiPanel
      tag="a"
      size="s"
      href="#"
      class="procedures-page-placeholder__panel"
      :class="[
        'ui-grid-item',
        'ui-grid-item_12',
        'ui-grid-item_tablet_6',
        'ui-grid-item_laptop_3'
      ]"
      @click.native.prevent="onAdd"
    >
      <UiText
        size="m"
        right-icon="outlined/plus"
        responsive
      >
        Добавити послугу
      </UiText>
    </UiPanel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    category: {
      type: Object,
      required: true
    }
  }
})
export default class Placeholder extends Vue {
  readonly category

  async onAdd () {
    await this.$typedStore.dispatch('popup/show', {
      name: 'new-procedure',
      props: {
        category: this.category
      }
    })
  }
}
</script>

<style lang="scss">
  .procedures-page-placeholder {
    &__panel {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 140px;
      color: $ui-blue-brand;
    }
  }
</style>
