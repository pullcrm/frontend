<template>
  <Error
    :error="error"
  />
</template>

<script>
import Error from '~/pages/ErrorPage/ErrorPage.vue'

export default {
  components: {
    Error
  },

  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>
