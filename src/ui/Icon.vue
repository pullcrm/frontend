<template>
  <i
    class="ui-icon"
    :class="[
      `ui-icon_size_${size}`,
      `ui-icon_${name.replace('/', '-')}`
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
    }
  }
})
export default class UiIcon extends Vue {
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
    return require(`@/assets/icons/${this.name}.svg`)
  }
}
</script>

<style lang="scss">
  /*
    After copying icon from Figma you have to:
    1. Remove width and height attributes

    2. Add id attribute to root svg element:
      `id="__THIS_ID_NEEDS_FOR_UI_ICON_COMPONENT__"`

    3. Fill each of a path element via style attribute using css variables:
      `style="fill: --ui-icon-primary-color;"`
      `style="fill: --ui-icon-secondary-color;"` (if that is two colored icon)
  */

  .ui-icon {
    display: inline-flex;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    --ui-icon-primary-color: currentColor;
    --ui-icon-secondary-color: currentColor;

    svg {
      display: none;
      width: inherit;
      height: inherit;
      pointer-events: none;
    }

    // Disable background fallback for new browsers which support css variables and external resources in xlink:href
    @supports (display: var(--variable)) {
      background-image: none !important;

      svg {
        display: block;
      }
    }

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
