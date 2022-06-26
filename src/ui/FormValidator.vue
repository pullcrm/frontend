<script lang="ts" setup>
const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },

  validate: {
    type: Object,
    required: true,
  },
})

function resetFieldError(field: string) {
  if (props.validate[field]?.$invalid === false)
    props.validate[field].$reset()

  props.validate.$clearExternalResults()
}

function getFieldError(field: string) {
  return props.validate[field]?.$errors[0]?.$message
}
</script>

<template>
  <Component
    :is="tag"
    class="ui-form-validator"
  >
    <slot v-bind="{ resetFieldError, getFieldError }" />
  </Component>
</template>
