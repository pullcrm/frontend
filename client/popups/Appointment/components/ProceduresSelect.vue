<template>
  <div class="appointment-popup-procedures-select">
    <UiTitle
      class="appointment-popup-procedures-select__title"
      size="s"
      responsive
    >
      Послуги
    </UiTitle>

    <UiText
      class="appointment-popup-procedures-select__sub-title"
      size="m"
      responsive
    >
      Вибрано:

      <strong>
        {{ count }}
      </strong>

      / Сума:

      <UiPopover
        class="appointment-popup-procedures-select__price-popover"
        size="s"
        placement="bottom"
      >
        <div class="appointment-popup-procedures-select__price">
          {{ total | price }}
        </div>

        <template #body>
          <UiField>
            <UiInput
              :value="customTotal || total"
              type="number"
              placeholder="Ціна"
              @input="onCustomPrice"
            />
          </UiField>
        </template>
      </UiPopover>
    </UiText>

    <UiField>
      <UiMultiSelect
        :value="procedures"
        :options="options"
        label-key="name"
        placeholder="Вибрати послуги"
        @input="
          $emit('resetFieldError', 'procedures')
          onInput($event)
        "
      />
    </UiField>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    total: {
      type: Number,
      required: true
    },

    options: {
      type: Array,
      default: () => []
    },

    procedures: {
      type: Array,
      default: () => []
    }
  }
})
export default class ProceduresSelect extends Vue {
  readonly total!: number
  readonly options
  readonly procedures

  customTotal = null

  get count () {
    return this.procedures.length
  }

  onInput (procedures) {
    this.$emit('update:procedures', procedures)

    if (this.customTotal) return

    const total = procedures.reduce((sum, { price }) => (sum + price), 0) ?? 0

    this.$emit('update:total', total)
  }

  onCustomPrice (price) {
    this.customTotal = Number(price)

    this.$emit('update:total', Number(price))
  }
}
</script>

<style lang="scss">
  .appointment-popup-procedures-select {
    padding: 16px;
    background: $ui-black-10;
    border-radius: 10px;

    &__title {
      margin-bottom: 12px;
    }

    &__sub-title {
      margin-bottom: 12px;
      color: $ui-black-80;

      strong {
        color: $ui-black-100;
        font-weight: 600;
      }
    }

    &__price {
      display: inline-block;
      color: $ui-black-100;
      font-weight: 600;
      cursor: pointer;

      @include ui-hover {
        &:hover {
          text-decoration: underline;
        }
      }
    }

    &__procedure {
      display: inline-flex;
    }

    &__procedure-text {
      white-space: nowrap;
    }

    &__price-popover {
      display: inline-block;

      .ui-field {
        width: 80px;
      }
    }
  }
</style>
