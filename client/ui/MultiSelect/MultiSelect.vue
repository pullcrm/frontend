<template>
  <div
    class="ui-multi-select"
  >
    <UiSelect
      ref="select"
      :value="null"
      :options="filteredOptions"
      :label-key="labelKey"
      v-bind="$attrs"
      @input="onInput"
    />

    <div class="ui-multi-select__badges">
      <template
        v-for="(badge, index) in value"
      >
        <slot
          name="badge"
          :item="badge"
          :title="badge[labelKey]"
          :remove="() => remove(index)"
        >
          <UiBadge
            :key="badge[labelKey]"
            class="ui-multi-select__badge"
            size="m"
            clickable
          >
            {{ badge[labelKey] }}

            <template #append>
              <UiIcon
                name="outlined/x"
                size="xs"
                @click.native.prevent.stop="remove(index)"
              />
            </template>
          </UiBadge>
        </slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import difference from 'lodash/difference'

import UiSelect from '../Select/Select.vue'

@Component({
  inheritAttrs: false,

  props: {
    options: {
      type: Array,
      default: () => []
    },

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
  readonly options: any[]
  readonly labelKey: string

  $refs: {
    select: UiSelect
  }

  get filteredOptions () {
    return difference(this.options, this.value)
  }

  onInput (item) {
    if (!item) {
      return
    }

    this.$refs.select.query = ''

    if (this.value.some(val => val[this.labelKey] === item[this.labelKey])) {
      return
    }

    this.$emit('input', [...this.value, item])
  }

  remove (index) {
    this.$emit('input', this.value.filter((_, i) => index !== i))
  }
}
</script>

<style lang="scss" src="./MultiSelect.scss" />
