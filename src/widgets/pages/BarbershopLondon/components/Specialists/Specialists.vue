<template>
  <div class="bs-london-widget-specialists">
    <UiTitle
      class="bs-london-widget-specialists__title"
      size="m"
    >
      Майстри
    </UiTitle>

    <Specialist
      v-for="specialist in specialists"
      :key="specialist.id"
      :specialist="specialist"
      @select="$emit('select', specialist)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Specialist from './Specialist.vue'

@Component({
  components: {
    Specialist
  },

  props: {
    specialists: {
      type: Array,
      required: true
    }
  }
})
export default class Specialists extends Vue {
  readonly specialists
}
</script>

<style lang="scss">
  .bs-london-widget-specialists {
    &__title {
      margin-bottom: 24px;
      color: $ui-white;
    }
  }
</style>
