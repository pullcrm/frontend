<template>
  <div
    class="ui-select"
  >
    <span
      v-if="leftIcon"
      class="ui-select__prepend"
    >
      <UiIcon
        class="ui-select__icon"
        :name="leftIcon"
        size="s"
      />
    </span>

    <span
      v-if="loading"
      class="ui-select__append"
    >
      <UiIconLoader
        class="ui-select__loader"
        size="s"
      />
    </span>
    <span
      v-else
      class="ui-select__append"
      :class="{'_drop-arrow': !hasClear}"
      @click.prevent="hasClear && onClear()"
    >
      <UiIcon
        class="ui-select__clear"
        :name="hasClear ? 'x-fill' : 'caret-down-fill'"
        size="s"
      />
    </span>

    <span class="ui-select__content">
      <VSelect
        class="ui-select__select"
        :options="options"
        :value="value"
        :clearable="clearable"
        v-bind="$attrs"
        @input="$emit('input', $event)"
      >
        <template #search="{attributes, events}">
          <input
            class="ui-select__input"
            :required="required && !value"
            v-bind="attributes"
            v-on="events"
          >
        </template>

        <template #selected-option-container="{ option, deselect, multiple }">
          <div
            v-if="multiple"
            class="ui-select__multiple"
          >
            {{ option[$attrs.label] }}

            <UiIcon
              size="custom"
              name="x-fill"
              @click.native="deselect(option)"
            />
          </div>
          <div
            v-else
            class="ui-select__option"
          >
            {{ option[$attrs.label] }}
          </div>
        </template>
      </VSelect>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// https://vue-select.org/guide/install.html
import VSelect from 'vue-select'

@Component({
  inheritAttrs: false,

  components: {
    VSelect
  },

  props: {
    value: {
      required: true,
      validator: () => true
    },

    options: {
      type: Array,
      default: () => {
        return []
      }
    },

    clearable: {
      type: Boolean,
      default: true
    },

    loading: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    },

    leftIcon: {
      type: String,
      default: undefined
    }
  }
})
export default class UiSelect extends Vue {
  readonly value: string
  readonly loading: boolean
  readonly clearable: boolean
  readonly leftIcon?: string

  get hasClear () {
    return this.clearable && this.value && !this.$attrs.disabled
  }

  onClear () {
    this.$emit('input', '')
    this.$emit('change', '')
    this.$emit('clear')
  }
}
</script>

<style lang="scss" src="./Select.scss" />
