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

  props: {
    text: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: 'm'
    },

    tag: {
      type: String,
      default: 'div'
    },

    strong: {
      type: Boolean,
      default: false
    },

    responsive: {
      type: Boolean,
      default: false
    },

    leftIcon: {
      type: String,
      default: undefined
    },

    rightIcon: {
      type: String,
      default: undefined
    }
  },

  render (createElement, { props, data, slots }) {
    /* Prepend */
    let prepend: Vue.VNode = null
    if (props.leftIcon) {
      prepend = createElement('div', { class: 'ui-text__prepend' }, [
        createElement(UiIcon, {
          props: {
            name: props.leftIcon,
            size: 'inherit'
          }
        })
      ])
    } else if (slots().prepend) {
      prepend = createElement('div', { class: 'ui-text__prepend' },
        slots().prepend
      )
    }

    /* Append */
    let append: Vue.VNode = null
    if (props.rightIcon) {
      append = createElement('div', { class: 'ui-text__append' }, [
        createElement(UiIcon, {
          props: {
            name: props.rightIcon,
            size: 'inherit'
          }
        })
      ])
    } else if (slots().append) {
      append = createElement('div', { class: 'ui-text__append' },
        slots().append
      )
    }

    /* Content */
    let content = slots().default ?? props.text
    if (append || prepend) {
      content = createElement('div', { class: 'ui-text__content' }, content)
    }

    if (props.tag !== 'RouterLink') {
      data.on = data.nativeOn
      data.nativeOn = undefined
    }

    return createElement(props.tag, {
      ...data,
      attrs: data.attrs,
      class: [
        'ui-text',
        `ui-text_size_${props.size}`,
        { 'ui-text_strong': props.strong },
        { 'ui-text_responsive': props.responsive },
        { 'ui-text_has-append': Boolean(append) },
        { 'ui-text_has-prepend': Boolean(prepend) },
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

<style lang="scss" src="./Text.scss"></style>
