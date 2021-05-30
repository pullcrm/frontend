<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  functional: true,

  render (createElement, { data }) {
    return createElement('div', {
      ...data,
      class: [
        'ui-divider',
        data.class
      ],
      on: {
        ...data.on,
        ...data.nativeOn
      },
      nativeOn: undefined
    })
  }
})
</script>

<style lang="scss">
  .ui-divider {
    height: 1px;
    background: $ui-black-40;
  }
</style>
