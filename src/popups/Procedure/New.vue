<template>
  <UiPopup
    class="procedures-new"
    @close="$emit('close')"
  >
    <UiBack
      @back="$emit('close')"
    />

    <UiTitle
      class="procedures-new__title"
      size="s"
    >
      Добавить услугу
    </UiTitle>

    <form @submit.prevent="submit">
      <UiFormValidator
        v-slot="{ resetFieldError }"
        ref="formValidator"
        :validations="validations"
      >
        <UiField
          label="Название услуги"
        >
          <UiInput
            v-model="form.name"
            required
            left-icon="edit/edit-1"
            placeholder="Введите название"
            @input="resetFieldError('name')"
          />
        </UiField>

        <UiField
          label="Цена"
        >
          <UiInput
            v-model="form.price"
            type="number"
            required
            left-icon="edit/edit-1"
            placeholder="Укажите цену"
            @input="resetFieldError('price')"
          />
        </UiField>

        <UiField
          label="Длительность"
        >
          <UiSelect
            v-model="form.duration"
            label="name"
            required
            :options="durationList"
            left-icon="edit/edit-1"
            placeholder="Выбрать время"
            @input="resetFieldError('duration')"
          />
        </UiField>

        <UiField
          label="Описание"
        >
          <UiInput
            v-model="form.description"
            tag="textarea"
            name="description"
            placeholder="Добавьте описание"
          />
        </UiField>

        <div class="procedures-new__actions">
          <UiButton
            type="submit"
            size="l"
            theme="yellow"
          >
            Добавить услугу
          </UiButton>
        </div>
      </UiFormValidator>
    </form>
  </UiPopup>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { durations } from '@/logics/hours'

@Component({})
export default class ProcedureNew extends Vue {
  form = {}

  get durationList () {
    return durations
  }

  get validations () {
    return {}
  }

  async submit () {
    await this.$api.procedures.create({
      // @ts-ignore
      name: this.form.name,
      // @ts-ignore
      price: Number(this.form.price),
      // @ts-ignore
      duration: this.form.duration.value,
      // @ts-ignore
      description: this.form.description
    })

    await this.onBack()
  }

  async onBack () {
    await this.$store.dispatch('procedures/fetch')

    this.$emit('close')
  }
}
</script>

<style lang="scss">
  .procedures-new {
    &__title {
      margin-top: 8px;
      margin-bottom: 24px;
    }

    &__actions {
      margin-top: 24px;

      .ui-button {
        width: 100%;
      }
    }
  }
</style>
