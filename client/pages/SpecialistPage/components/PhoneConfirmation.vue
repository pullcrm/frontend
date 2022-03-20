<template>
  <UiAlert
    v-if="isVisible"
    theme="warning"
    class="specialist-page-phone-confirmation"
  >
    <strong>Реєстрація не завершена!</strong> Відправити СМС з посиланям для завершення реєстрації?

    <template #append>
      <UiButton
        size="s"
        theme="yellow"
        :loading="isLoading"
        @click.native="onSubmit"
      >
        Відправити
      </UiButton>
    </template>
  </UiAlert>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    specialist: {
      type: Object,
      required: true
    }
  }
})
export default class PhoneConfirmation extends Vue {
  readonly specialist

  isLoading = false

  get isVisible () {
    return this.specialist.user.active === false
  }

  async onSubmit () {
    try {
      this.isLoading = true

      await this.$api.specialist.sendFinishLink(
        this.specialist.id
      )

      this.$typedStore.dispatch('toasts/show', { title: 'Відправлено' })
    } catch (err) {
      if (err.status === 400) {
        this.$typedStore.dispatch('toasts/show', {
          title: 'Реєстрація вже завершена',
          type: 'error'
        })

        return
      }

      if (err.status === 403) {
        this.$typedStore.dispatch('toasts/show', {
          title: 'Такого спеціаліста не існує',
          type: 'error'
        })

        return
      }

      throw err
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
  .specialist-page-phone-confirmation {
    strong {
      font-weight: 600;
    }
  }
</style>
