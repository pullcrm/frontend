<template>
  <UiPopup
    class="new-procedures-category"
    @close="$emit('close')"
  >
    <UiTitle
      class="new-procedures-category__title"
      size="s"
    >
      Добавить категорию
    </UiTitle>

    <form @submit.prevent="submit">
      <UiField
        label="Название категории"
        required
      >
        <UiInput
          v-model="name"
          left-icon="outlined/pencil"
          placeholder="Введите название"
          required
        />
      </UiField>

      <UiButton
        type="submit"
        size="l"
        theme="blue"
      >
        Добавить
      </UiButton>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class ProcedureEdit extends Vue {
  name = ''

  async submit () {
    await this.$api.categories.create({
      name: this.name,
      type: 'PROCEDURE'
    })

    await this.$typedStore.dispatch('procedures/fetch')

    this.$emit('close')
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
