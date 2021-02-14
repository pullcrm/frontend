<template>
  <div
    class="ui-multi-select"
  >
    <UiSelect
      :value="null"
      :label-key="labelKey"
      v-bind="$attrs"
      @input="onInput"
    />

    <div class="ui-multi-select__badges">
      <UiBadge
        v-for="(badge, index) in value"
        :key="badge[labelKey]"
        class="ui-multi-select__badge"
        size="m"
        clickable
        right-icon="outlined/x"
        @click.native="remove(index)"
      >
        {{ badge[labelKey] }}
      </UiBadge>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  inheritAttrs: false,

  props: {
    value: {
      type: Array,
      default: () => []
    },

    labelKey: {
      type: String,
      default: ''
    }
  }
})
export default class UiMultiSelect extends Vue {
  readonly value: any[]
  readonly labelKey: string

  onInput (item) {
    if (!item) {
      return
    }

    if (this.value.some(val => val[this.labelKey] === item[this.labelKey])) {
      return
    }

    this.$emit('input', [...this.value, item])
  }

  remove (index) {
    this.$emit('input', [...this.value.splice(index + 1, 1)])
  }
}
</script>

<style lang="scss" src="./MultiSelect.scss" />
