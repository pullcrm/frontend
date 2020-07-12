<template>
  <UiForm
    title="Создание компании"
    sub-title="шаг 1 из 3"
    @on-submit="onSubmit"
  >
    <UiFormControl
      label="Название компании"
      placeholder="Ваша компания"
      v-model="company.name"
      required
    />

    <UiFormControl
      type="select"
      label="Город"
      placeholder="Выбрать город"
      :options="cities"
      select-label="name"
      v-model="company.city"
      required
    />

    <UiFormControl
      type="select"
      label="Какой у вас бизнес?"
      placeholder="Выбрать категорию"
      :options="categories"
      select-label="name"
      v-model="company.category"
      required
    />

    <template
      #actions
    >
      <UiButton
        tag="button"
        type="submit"
      >
        Продолжить
      </UiButton>
    </template>
  </UiForm>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiForm from '../../components/Form.vue'
import UiButton from '../../components/Button.vue'
import UiFormControl from '../../components/FormControl.vue'

@Component({
  components: {
    UiForm,
    UiButton,
    UiFormControl
  },

  props: {
    cities: {
      type: Array,
      required: true
    },

    categories: {
      type: Array,
      required: true
    }
  }
})
export default class StepOne extends Vue {
  company = {}

  onSubmit () {
    this.$emit('submit', {
      // @ts-ignore
      name: this.company.name,
      // @ts-ignore
      cityId: this.company.city.id,
      // @ts-ignore
      categoryId: this.company.category.id
    })
  }
}
</script>

<style lang="scss">
  //
</style>
