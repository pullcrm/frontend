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
    const icon = require(`~/assets/ui-icons/${props.name}.svg`)

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

<style lang="scss" src="./Icon.scss"></style>
