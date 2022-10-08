<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },

  render() {
    // if (props.tag !== 'RouterLink') {
    //   data.on = { ...data.on, ...data.nativeOn }
    //   data.nativeOn = undefined
    // }

    return h(this.tag, {
      // attrs: {
      // ...data.attrs,
      'data-test': 'ui-carousel-item',
      // },
      'class': [
        'ui-carousel-item',
        // data.class
      ],
    }, this.$slots.default())
  },
})
</script>

<style lang="scss" src="./CarouselItem.scss"></style>
