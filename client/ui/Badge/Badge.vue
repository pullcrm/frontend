<script lang="ts">
import Vue from 'vue'

import UiIcon from '../Icon/Icon.vue'

export default Vue.extend({
  // @ts-ignore
  functional: true,

  /*
    This line will fix the vue template compiler bug that prevents correct normalization of vnodes

    Bug case: the text of `createElement('div', 'some text')` will not be converted to the text vnode because the vnode normalization doesn't work

    https://github.com/vuejs/vue/blob/8a800867fe61e5aa642e1e3da91bb890d07312f7/src/core/vdom/create-functional-component.js#L44
  */
  _compiled: false,

  components: {
    UiIcon
  },

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    theme: {
      type: String,
      default: 'primary'
    },

    size: {
      type: String,
      default: 'm'
    },

    icon: {
      type: String,
      default: undefined
    },

    leftIcon: {
      type: String,
      default: undefined
    },

    rightIcon: {
      type: String,
      default: undefined
    },

    clickable: {
      type: Boolean,
      default: false
    },

    responsive: {
      type: Boolean,
      default: false
    }
  },

  render (createElement, { props, data, slots }) {
    function createAppend (children) {
      return createElement('div', { class: 'ui-badge__append' }, children)
    }

    function createPrepend (children) {
      return createElement('div', { class: 'ui-badge__prepend' }, children)
    }

    function createContent (children) {
      return createElement('div', { class: 'ui-badge__content' }, children)
    }

    /* Prepend */
    let prepend = null
    if (props.leftIcon) {
      prepend = createPrepend([
        createElement(UiIcon, {
          props: {
            name: props.leftIcon,
            size: 'inherit'
          }
        })
      ])
    } else if (slots().prepend) {
      prepend = createPrepend(
        slots().prepend
      )
    }

    /* Append */
    let append = null
    if (props.rightIcon) {
      append = createAppend([
        createElement(UiIcon, {
          props: {
            name: props.rightIcon,
            size: 'inherit'
          }
        })
      ])
    } else if (slots().append) {
      append = createAppend(
        slots().append
      )
    }

    /* Content */
    let content
    if (props.icon) {
      content = createContent([
        createElement(UiIcon, {
          props: {
            name: props.icon,
            size: 'inherit'
          }
        })
      ])
    } else if (slots().default) {
      content = createContent(
        slots().default
      )
    }

    if (
      !append &&
      !prepend &&
      !props.icon &&
      slots().default?.every((node) => node.text)
    ) {
      // OPTIMIZATION:
      // Simplify `content` if there are only text nodes to decrease a number of DOM elements
      content = slots().default
    }

    if (props.tag !== 'RouterLink') {
      data.on = data.nativeOn
      data.nativeOn = undefined
    }

    return createElement(props.tag, {
      ...data,
      class: [
        'ui-badge',
        `ui-badge_size_${props.size}`,
        `ui-badge_theme_${props.theme}`,
        { 'ui-badge_clickable': props.clickable },
        { 'ui-badge_responsive': props.responsive },
        data.class
      ]
    }, [
      prepend,
      content,
      append
    ].filter(Boolean))
  }
})
</script>

<style lang="scss" src="./Badge.scss"></style>
