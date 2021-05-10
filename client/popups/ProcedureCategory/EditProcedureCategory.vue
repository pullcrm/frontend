<template>
  <UiPopup
    class="new-procedures-category"
    @close="$emit('close')"
  >
    <UiTitle
      class="new-procedures-category__title"
      size="s"
    >
      Редактировать категорию
    </UiTitle>

    <form @submit.prevent="submit">
      <UiField
        label="Название категории"
        required
      >
        <UiInput
          v-model="category.name"
          left-icon="outlined/pencil"
          placeholder="Введите название"
          required
        />
      </UiField>

      <UiButton
        type="submit"
        size="l"
        theme="blue"
        :loading="isLoading"
      >
        Редактировать
      </UiButton>

      <UiButton
        size="m"
        theme="danger-outlined"
        :loading="isLoading"
        @click.native="remove"
      >
        Удалить категорию
      </UiButton>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { ICategory } from '~/services/api'

@Component({
  props: {
    category: {
      type: Object,
      required: true
    }
  }
})
export default class ProcedureEdit extends Vue {
  category!: ICategory

  isLoading = false

  async submit () {
    try {
      this.isLoading = true

      await this.$api.categories.update(this.category.id, {
        name: this.category.name,
        type: 'PROCEDURE'
      })

      await this.$typedStore.dispatch('procedures/fetch')

      this.$emit('close')
    } finally {
      this.isLoading = false
    }
  }

  async remove () {
    try {
      this.isLoading = true

      await this.$api.categories.remove(this.category.id)

      await this.$typedStore.dispatch('procedures/fetch')

      this.$emit('close')
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
  .new-procedures-category {
    &__title {
      margin-top: 8px;
      margin-bottom: 24px;
    }

    .ui-button {
      width: 100%;
      margin-top: 24px;
    }

    .ui-field + .ui-field {
      margin-top: 20px;
    }
  }
</style>
