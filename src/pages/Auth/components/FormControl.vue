<template>
  <div class="auth-form-control">
    <label v-if="label">
      {{ label }}
    </label>

    <div
      v-if="type === 'select'"
      class="auth-form-control__select"
    >
      <v-select
        @input="$emit('input', $event)"
        :options="options"
        :label="selectLabel"
        :value="value"
        :placeholder="placeholder"
        append-to-body
      >
        <template #search="{attributes, events}">
          <input
            class="vs__search"
            :required="required && !value"
            v-bind="attributes"
            v-on="events"
          />
        </template>
      </v-select>
    </div>

    <div
      v-else
      class="auth-form-control__input"
    >
      <input
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        @input="$emit('input', $event.target.value)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    label: {
      type: String,
      default: undefined
    },

    type: {
      type: String,
      default: 'text'
    },

    placeholder: {
      type: String,
      default: ''
    },

    value: {
      type: [String, Number, Object],
      default: ''
    },

    options: {
      type: Array,
      default: () => {
        return []
      }
    },

    selectLabel: {
      type: String,
      default: undefined
    },

    required: {
      type: Boolean,
      default: false
    }
  }
})
export default class FormControl extends Vue {

}
</script>

<style lang="scss">
  .auth-form-control {
    width: 100%;

    label {
      display: block;
      color: #202020;
      font-size: 14px;
      line-height: 24px;
    }

    &__input {
      border: 1px solid #bdbdbd;
      border-radius: 10px;
    }

    input {
      width: 100%;
      height: 48px;
      padding: 8px 16px;
      color: #464646;
      border-radius: 10px;

      &::placeholder {
        color: #d8d8d8;
      }
    }

    &__select {
      position: relative;

      .vs__dropdown-toggle {
        padding: 0;
        border: 1px solid #bdbdbd;
        border-radius: 10px;
      }

      .vs__selected {
        position: absolute;
        height: 100%;
        margin: 0;
        padding-left: 12px;
        pointer-events: none;
      }

      input {
        margin: 0 !important;
      }
    }

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
</style>
