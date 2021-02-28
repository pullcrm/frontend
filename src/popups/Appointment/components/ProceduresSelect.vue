<template>
  <div class="appointment-popup-procedures-select">
    <UiTitle
      class="appointment-popup-procedures-select__title"
      size="s"
      responsive
    >
      Услуги
    </UiTitle>

    <UiText
      class="appointment-popup-procedures-select__sub-title"
      size="m"
      responsive
    >
      Выбрано:

      <strong>
        {{ count }}
      </strong>

      / Сумма:

      <UiPopover
        class="appointment-popup-procedures-select__price-popover"
        size="s"
        placement="bottom"
      >
        <template #default="{ toggle }">
          <div
            class="appointment-popup-procedures-select__price"
            @click.prevent="toggle"
          >
            {{ total | price }}
          </div>
        </template>

        <template #body>
          <UiField>
            <UiInput
              :value="customTotal || total"
              type="number"
              placeholder="Цена"
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
        placeholder="Выбрать услуги"
        @input="
          $emit('resetFieldError', 'procedures')
          onInput($event)
        "
      >
        <template #badge="{ item, title, remove }">
          <UiPopover
            class="appointment-popup-procedures-select__procedure"
            size="s"
            theme="dark"
            placement="top"
            @click.native.prevent
          >
            <template #default="{ toggle }">
              <UiBadge
                :key="title"
                class="ui-multi-select__badge"
                size="m"
                clickable
                @click.native.prevent="toggle"
              >
                {{ title }}

                <template #append>
                  <UiIcon
                    name="outlined/x"
                    size="xs"
                    @click.native.prevent.stop="remove"
                  />
                </template>
              </UiBadge>
            </template>

            <template #body>
              <UiText
                class="appointment-popup-procedures-select__procedure-text"
              >
                {{ item.duration | minutesToTime }} - {{ item.price | price }}
              </UiText>
            </template>
          </UiPopover>
        </template>
      </UiMultiSelect>
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
