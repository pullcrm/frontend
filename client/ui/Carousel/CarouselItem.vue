<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  functional: true,

  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },

  render (createElement, { data, props, slots }) {
    if (props.tag !== 'RouterLink') {
      data.on = { ...data.on, ...data.nativeOn }
      data.nativeOn = undefined
    }

    return createElement(props.tag, {
      ...data,
      attrs: {
        ...data.attrs,
        'data-test': 'ui-carousel-item'
      },
      class: [
        'ui-carousel-item',
        data.class
      ]
    }, slots().default)
  }
})
</script>

<style lang="scss" src="./CarouselItem.scss"></style>
