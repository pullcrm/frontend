<script>
import { h } from 'vue'

import UiIcon from '../Icon/Icon.vue'

export default {
  props: {
    size: {
      type: String,
      default: 'm',
    },

    tag: {
      type: String,
      default: 'div',
    },

    text: {
      type: String,
      default: '',
    },

    responsive: {
      type: Boolean,
      default: false,
    },

    leftIcon: {
      type: String,
      default: undefined,
    },

    rightIcon: {
      type: String,
      default: undefined,
    },
  },

  render() {
    /* Prepend */
    let prepend = null
    if (this.leftIcon) {
      prepend = h('div', { class: 'ui-micro-text__prepend' }, [
        h(UiIcon, {
          name: this.leftIcon,
          size: 'inherit',
        }),
      ])
    }
    else if (this.$slots.prepend) {
      prepend = h('div', { class: 'ui-micro-text__prepend' },
        this.$slots.prepend(),
      )
    }

    /* Append */
    let append = null
    if (this.rightIcon) {
      append = h('div', { class: 'ui-micro-text__append' }, [
        h(UiIcon, {
          name: this.rightIcon,
          size: 'inherit',
        }),
      ])
    }
    else if (this.$slots.append) {
      append = h('div', { class: 'ui-micro-text__append' },
        this.$slots.append,
      )
    }

    /* Content */
    let content = this.$slots.default
      ? this.$slots.default()
      : this.text
    if (append || prepend)
      content = h('div', { class: 'ui-text__content' }, content)

    // if (this.tag !== 'RouterLink') {
    //   data.on = data.nativeOn
    //   data.nativeOn = undefined
    // }

    return h(this.tag, {
      // ...data,
      // attrs: data.attrs,
      class: [
        'ui-micro-text',
        `ui-micro-text_size_${this.size}`,
        { 'ui-micro-text_has-append': Boolean(append) },
        { 'ui-micro-text_has-prepend': Boolean(prepend) },
        { 'ui-micro-text_responsive': this.responsive },
        // data.class
      ],
    }, [
      prepend,
      content,
      append,
    ])
  },
}
</script>

<style lang="scss" src="./MicroText.scss"></style>
