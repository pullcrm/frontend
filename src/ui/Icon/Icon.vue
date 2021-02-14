<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  functional: true,

  props: {
    name: {
      type: String,
      required: true
    },

    size: {
      type: String,
      default: 'm'
    }
  },

  render (createElement, { props, data }) {
    const icon = require(`@/assets/ui-icons/${props.name}.svg`)

    const svg = createElement('svg', [
      createElement('use', {
        attrs: {
          'xlink:href': `${icon}#__THIS_ID_NEEDS_FOR_UI_ICON_COMPONENT__`
        }
      })
    ])

    return createElement('i', {
      ...data,
      class: [
        'ui-icon',
        `ui-icon_size_${props.size}`,
        `ui-icon_${props.name.replace('/', '-')}`,
        data.class
      ],
      style: {
        backgroundImage: `url(${icon})`
      },
      on: {
        ...data.on,
        ...data.nativeOn
      },
      nativeOn: undefined
    }, [
      svg
    ])
  }
})
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
      width: 20px;
      height: 20px;
    }

    &_size_m {
      width: 24px;
      height: 24px;
    }

    &_size_l {
      width: 32px;
      height: 32px;
    }
  }
</style>
