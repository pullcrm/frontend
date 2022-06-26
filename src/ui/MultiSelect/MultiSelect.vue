<script lang="ts" setup>
import difference from 'lodash/difference'

import UiSelect from '../Select/Select.vue'

// inheritAttrs: false,

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },

  modelValue: {
    type: Array,
    default: () => [],
  },

  labelKey: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const select = ref<typeof UiSelect | null>(null)

const filteredOptions = computed(() => {
  return difference(props.options, props.modelValue)
})

function onInput(item: any) {
  if (!item || !select.value)
    return

  select.value.query = ''

  if (props.modelValue.some((val: any) => val[props.labelKey] === item[props.labelKey]))
    return

  emit('update:modelValue', [...props.modelValue, item])
}

function remove(index: number) {
  emit('update:modelValue', props.modelValue.filter((_, i) => index !== i))
}
</script>

<template>
  <div
    class="ui-multi-select"
  >
    <UiSelect
      ref="select"
      :model-value="null"
      :options="filteredOptions"
      :label-key="labelKey"
      v-bind="$attrs"
      @update:model-value="onInput"
    />

    <div class="ui-multi-select__badges">
      <template
        v-for="(badge, index) in (modelValue as any)"
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
                @click.prevent.stop="remove(index)"
              />
            </template>
          </UiBadge>
        </slot>
      </template>
    </div>
  </div>
</template>

<style lang="scss" src="./MultiSelect.scss" />
