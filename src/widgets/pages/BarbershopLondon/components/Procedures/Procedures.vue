<template>
  <div class="bs-london-widget-procedures">
    <UiMicroText
      class="bs-london-widget-procedures__back"
      @click.native="$emit('back')"
    >
      <template #prepend>
        <UiIcon
          size="s"
          name="arrow/ios/left"
        />
      </template>

      Назад
    </UiMicroText>

    <UiTitle
      class="bs-london-widget-procedures__title"
      size="l"
    >
      Послуги
    </UiTitle>

    <Procedure
      v-for="procedure in procedures"
      :key="procedure.id"
      :procedure="procedure"
      @select="$emit('select', procedure)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiMicroText from '@/ui/MicroText.vue'

import Procedure from './Procedure.vue'

@Component({
  components: {
    Procedure,
    UiMicroText
  },

  props: {
    procedures: {
      type: Array,
      required: true
    }
  }
})
export default class Procedures extends Vue {
  readonly procedures
}
</script>

<style lang="scss">
  .bs-london-widget-procedures {
    &__title {
      margin-bottom: 24px;
      color: $ui-white;
    }

    &__back {
      margin-bottom: 8px;
      color: $ui-black-80;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
