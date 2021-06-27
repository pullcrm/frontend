<template>
  <Error
    :code="error.statusCode"
  />
</template>

<script>
import Error from '@/pages/ErrorPage/ErrorPage.vue'

export default {

  components: {
    Error
  },
  layout ({ route }) {
    if (route.meta.some((record) => record.widget)) {
      return 'widget'
    }

    return 'default'
  },

  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>
