
<template>
  <i
    class="ui-icon"
    :class="[
      `ui-icon_size_${size}`,
      `ui-icon_${name.replace('/', '-')}`
    ]"
    :style="{ backgroundImage: `url(${icon})` }"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    name: {
      type: String,
      required: true
    },

    size: {
      type: String,
      default: 'm'
    }
  }
})
export default class Icon extends Vue {
  readonly name: string
  readonly size:
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | 'xxl'
    | 'custom'
    | 'inherit'

  get icon () {
    return require(`@/assets/ui-icons/${this.name}.svg`)
  }
}
</script>

<style lang="scss">
  .ui-icon {
    display: inline-flex;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    &_size_xs {
      width: 16px;
      height: 16px;
    }

    &_size_s {
      width: 24px;
      height: 24px;
    }

    &_size_m {
      width: 32px;
      height: 32px;
    }

    &_size_xl {
      width: 48px;
      height: 48px;
    }

    &_size_xxl {
      width: 64px;
      height: 64px;
    }
  }
</style>
