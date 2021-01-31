<template>
  <i
    class="ui-icon"
    :class="[
      `ui-icon_size_${size}`,
      `ui-icon_${name.replace('/', '-')}`,
      { 'ui-icon_responsive': responsive }
    ]"
    :style="{ backgroundImage: `url(${icon})` }"
  >
    <svg>
      <use
        :xlink:href="`${icon}#__THIS_ID_NEEDS_FOR_UI_ICON_COMPONENT__`"
      />
    </svg>
  </i>
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
    },

    responsive: {
      type: Boolean,
      default: false
    }
  }
})
export default class UiIcon extends Vue {
  readonly name: string
  readonly responsive: boolean
  readonly size:
    | 'xxs'
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

<style lang="scss" src="./Icon.scss"></style>
