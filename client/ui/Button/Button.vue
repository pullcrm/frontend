<script lang="ts">
import Vue from 'vue'

import UiIcon from '../Icon/Icon.vue'
import UiIconLoader from '../IconLoader.vue'

export default Vue.extend({
  // @ts-ignore
  functional: true,

  /*
    This line will fix the vue template compiler bug that prevents correct normalization of vnodes

    Bug case: the text of `createElement('div', 'some text')` will not be converted to the text vnode because the vnode normalization doesn't work

    https://github.com/vuejs/vue/blob/8a800867fe61e5aa642e1e3da91bb890d07312f7/src/core/vdom/create-functional-component.js#L44
  */
  _compiled: false,

  props: {
    tag: {
      type: String,
      default: 'button'
    },

    type: {
      type: String,
      default: 'button'
    },

    theme: {
      type: String,
      default: 'primary'
    },

    leftIcon: {
      type: String,
      default: undefined
    },

    rightIcon: {
      type: String,
      default: undefined
    },

    size: {
      type: String,
      default: 'l'
    },

    loading: {
      type: Boolean,
      default: false
    },

    disabled: {
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
      return createElement('span', { class: 'ui-button__append' }, children)
    }

    function createPrepend (children) {
      return createElement('span', { class: 'ui-button__prepend' }, children)
    }

    function createContent (children) {
      return createElement('span', { class: 'ui-button__content' }, children)
    }

    function createLoader () {
      return createElement('span', { class: 'ui-button__loader' }, [
        createElement(UiIconLoader, {
          props: {
            size: 's'
          }
        })
      ])
    }

    /* Prepend */
    let prepend = null
    if (props.leftIcon) {
      prepend = createPrepend([
        createElement(UiIcon, {
          props: {
            name: props.leftIcon,
            size: 's'
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
            size: 's'
          }
        })
      ])
    } else if (slots().append) {
      append = createAppend(
        slots().append
      )
    }

    /* Loader */
    let loader = null
    if (props.loading) {
      loader = createLoader()
    }

    /* Content */
    let content
    if (
      !loader &&
      !append &&
      !prepend &&
      slots().default?.every((node) => node.text)
    ) {
      // OPTIMIZATION:
      // Simplify `content` if there are only text nodes to decrease a number of DOM elements
      content = slots().default
    } else if (slots().default) {
      content = createContent(
        slots().default
      )
    }

    const tag = data.attrs?.to
      ? 'RouterLink'
      : props.tag

    if (tag !== 'RouterLink') {
      data.on = data.nativeOn
      data.nativeOn = undefined
    }

    return createElement(tag, {
      ...data,
      attrs: {
        ...data.attrs,
        type: tag === 'button' ? props.type : undefined
      },
      class: [
        'ui-button',
        `ui-button_size_${props.size}`,
        `ui-button_theme_${props.theme}`,
        {
          'ui-button_loading': props.loading,
          'ui-button_disabled': props.disabled,
          'ui-button_responsive': props.responsive
        },
        data.class
      ]
    }, [
      content,
      prepend,
      append,
      loader
    ].filter(Boolean))
  }
})
</script>

<style lang="scss" src="./Button.scss" />
