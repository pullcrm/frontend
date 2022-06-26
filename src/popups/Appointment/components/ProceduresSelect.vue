<script lang="ts" setup>
import { formatMoney } from '~/utils/money'

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },

  options: {
    type: Array,
    default: () => [],
  },

  procedures: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:procedures', 'update:total'])

const customTotal = ref<number | null>(null)

const count = computed(() => {
  return props.procedures.length
})

function onInput(procedures: any[]) {
  emit('update:procedures', procedures)

  if (customTotal.value)
    return

  const total = procedures.reduce((sum, { price }) => (sum + price), 0) ?? 0

  emit('update:total', total)
}

function onCustomPrice(price: number) {
  customTotal.value = Number(price)

  emit('update:total', Number(price))
}
</script>

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
          {{ formatMoney(total) }}
        </div>

        <template #body>
          <UiField>
            <UiInput
              :model-value="customTotal || total"
              type="number"
              placeholder="Ціна"
              @update:model-value="onCustomPrice"
            />
          </UiField>
        </template>
      </UiPopover>
    </UiText>

    <UiField>
      <UiMultiSelect
        :model-value="procedures"
        :options="options"
        label-key="name"
        placeholder="Вибрати послуги"
        @update:model-value="
          onInput($event)
        "
      />
    </UiField>
  </div>
</template>

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
